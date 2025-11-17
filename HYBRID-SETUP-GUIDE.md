# Hybrid React + WooCommerce Setup Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend App                        │
│              (Your Fitness Coaching Site)                    │
│                  localhost:3015                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ WooCommerce REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│              WordPress + WooCommerce                         │
│                  localhost:8000                              │
│           (Handles orders & payments only)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ myPOS Plugin
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   myPOS Payment Gateway                      │
│                https://mypos.com/vmp/checkout                │
└──────────────────────────────────────────────────────────────┘
```

---

## Part 1: WordPress Setup (Backend)

### Option A: Local Installation (Recommended for Testing)

#### Using Local by Flywheel (Easiest):
1. Download: https://localwp.com/
2. Install and create new site
3. Site name: `fitness-payments`
4. PHP 8.0+, MySQL, WordPress latest

#### Using MAMP/XAMPP (Alternative):
1. Download MAMP: https://www.mamp.info/
2. Start Apache and MySQL
3. Download WordPress: https://wordpress.org/download/
4. Extract to `/Applications/MAMP/htdocs/fitness-payments`
5. Visit: http://localhost:8888/fitness-payments
6. Complete WordPress installation

#### Using Docker (For developers):
```bash
# Create docker-compose.yml
docker-compose up -d
# WordPress will be at http://localhost:8000
```

---

### Step 1: Install WooCommerce

1. Log into WordPress Admin
2. Go to **Plugins** → **Add New**
3. Search for "WooCommerce"
4. Click **Install Now** → **Activate**
5. Follow the setup wizard:
   - Skip store details (not needed)
   - Industry: Health/Wellness
   - Products: Digital/Services
   - Skip extensions
   - Skip theme selection

### Step 2: Install myPOS Plugin

1. **Plugins** → **Add New**
2. Search for "myPOS Virtual for WooCommerce"
3. Install and Activate
4. Or download: https://wordpress.org/plugins/mypos-virtual-for-woocommerce/

### Step 3: Configure myPOS

1. **WooCommerce** → **Settings** → **Payments**
2. Find "myPOS Checkout"
3. Click **Manage** or **Set up**
4. Enable the payment method
5. Click **Connect with myPOS** (OAuth flow)
6. Login to your myPOS account
7. Grant permissions
8. Settings will auto-populate

**Manual Configuration** (if OAuth doesn't work):
- Enter your IPC credentials manually:
  - SID
  - Wallet Number
  - Private Key
  - Public Certificate
  - Key Index

### Step 4: Enable WooCommerce REST API

1. **WooCommerce** → **Settings** → **Advanced** → **REST API**
2. Click **Add key**
3. Description: `React Frontend`
4. User: Select your admin user
5. Permissions: **Read/Write**
6. Click **Generate API key**
7. **SAVE THESE CREDENTIALS:**
   ```
   Consumer Key: ck_xxxxxxxxxxxx
   Consumer Secret: cs_xxxxxxxxxxxx
   ```

---

## Part 2: Create Products in WooCommerce

### Create Your Pricing Plans:

1. **Products** → **Add New**

#### Product 1: 12 Months Subscription
- Product name: `12 Months Fitness Coaching`
- Regular price: `59.99`
- Product type: Simple product
- Virtual: ✅ (no shipping needed)
- Downloadable: ❌
- Short description: `Most Popular - $5/month`
- Publish

#### Product 2: 18 Months Subscription
- Product name: `18 Months Fitness Coaching`
- Regular price: `79.99`
- Product type: Simple product
- Virtual: ✅
- Short description: `Best Value - $4.44/month`
- Publish

#### Product 3: Lifetime Access
- Product name: `Lifetime Fitness Coaching`
- Regular price: `199.99`
- Product type: Simple product
- Virtual: ✅
- Short description: `One-time payment, lifetime access`
- Publish

### Note the Product IDs:
After creating products, note their IDs (visible in URL or products list):
- 12 Months: ID `123`
- 18 Months: ID `124`
- Lifetime: ID `125`

---

## Part 3: Update React Frontend

### Install WooCommerce REST API Client

```bash
cd /Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page
npm install @woocommerce/woocommerce-rest-api
```

### Create WooCommerce Service

Create new file: `services/woocommerce.ts`

```typescript
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: "http://localhost:8000", // Your WordPress URL
  consumerKey: "ck_xxxxxxxxxxxx", // From Step 4
  consumerSecret: "cs_xxxxxxxxxxxx", // From Step 4
  version: "wc/v3"
});

export interface CreateOrderData {
  productId: number;
  planTitle: string;
  amount: string;
  customerEmail?: string;
}

export async function createOrder(data: CreateOrderData) {
  try {
    const orderData = {
      payment_method: "mypos_virtual",
      payment_method_title: "myPOS Checkout",
      set_paid: false,
      billing: {
        email: data.customerEmail || "customer@example.com"
      },
      line_items: [
        {
          product_id: data.productId,
          quantity: 1
        }
      ]
    };

    const response = await WooCommerce.post("orders", orderData);
    
    return {
      success: true,
      orderId: response.data.id,
      checkoutUrl: response.data.payment_url || `http://localhost:8000/checkout/order-pay/${response.data.id}/?pay_for_order=true&key=${response.data.order_key}`
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

### Update myPOS Service

Replace `services/mypos.ts` content:

```typescript
import { createOrder } from './woocommerce';

export interface PaymentData {
  orderId: string;
  amount: string;
  currency: string;
  planTitle: string;
  planId: string;
}

class MyPOSService {
  // Map plan IDs to WooCommerce product IDs
  private productMapping = {
    'sub-12': 123,  // Replace with actual product ID
    'sub-18': 124,  // Replace with actual product ID
    'lifetime': 125 // Replace with actual product ID
  };

  generateOrderId(): string {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async initiatePayment(paymentData: PaymentData): Promise<void> {
    try {
      const productId = this.productMapping[paymentData.planId];
      
      if (!productId) {
        alert('Invalid plan selected');
        return;
      }

      console.log('🔄 Creating WooCommerce order...');

      const result = await createOrder({
        productId,
        planTitle: paymentData.planTitle,
        amount: paymentData.amount,
      });

      if (result.success && result.checkoutUrl) {
        console.log('✅ Order created, redirecting to checkout...');
        // Redirect to WooCommerce checkout with myPOS
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error(result.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('❌ Error initiating payment:', error);
      alert(`Failed to initiate payment: ${error.message}`);
    }
  }

  handlePaymentCallback(params: URLSearchParams): {
    status: 'success' | 'cancel' | 'error';
    orderId?: string;
    message: string;
  } {
    const status = params.get('status');
    const orderId = params.get('order_id');

    if (status === 'success' || status === 'completed') {
      return {
        status: 'success',
        orderId: orderId || undefined,
        message: 'Payment completed successfully!',
      };
    } else if (status === 'cancelled' || status === 'canceled') {
      return {
        status: 'cancel',
        orderId: orderId || undefined,
        message: 'Payment was cancelled.',
      };
    } else {
      return {
        status: 'error',
        message: 'Payment failed. Please try again.',
      };
    }
  }
}

export const myPOSService = new MyPOSService();
```

### Update Environment Variables

Update `.env`:

```env
# WooCommerce API
VITE_WOOCOMMERCE_URL=http://localhost:8000
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxx
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxx

# Success/Cancel URLs (your React app)
VITE_SUCCESS_URL=http://localhost:3015/payment-success
VITE_CANCEL_URL=http://localhost:3015/payment-cancel
```

---

## Part 4: Configure Return URLs in WordPress

### Set Success/Cancel URLs:

1. **WooCommerce** → **Settings** → **Payments** → **myPOS Checkout**
2. Look for redirect URL settings
3. Set:
   - **Success URL**: `http://localhost:3015/payment-success?status=success&order_id={order_id}`
   - **Cancel URL**: `http://localhost:3015/payment-cancel?status=cancelled&order_id={order_id}`

Or these might be set automatically by the plugin to go back to WooCommerce, then we redirect from there.

---

## Part 5: Testing the Flow

### Test Payment Flow:

1. **Start WordPress**: http://localhost:8000
2. **Start React app**: `npm run dev` → http://localhost:3015
3. **Click "Choose Plan"** on React app
4. **Should redirect** to WooCommerce checkout
5. **myPOS payment page** appears
6. **Complete test payment**
7. **Redirects back** to React success page

### Test Credentials (if using test mode):
- Test card: `5555 5555 5555 4444`
- CVV: Any 3 digits
- Expiry: Any future date

---

## Part 6: Production Deployment

### Deploy WordPress:
- Use your Ubuntu server
- Or use managed WordPress hosting (recommended):
  - Cloudways
  - WP Engine  
  - Kinsta
  - SiteGround

### Deploy React App:
- Keep on Vercel or your current host
- Update environment variables with production URLs

### Update URLs:
```env
VITE_WOOCOMMERCE_URL=https://payments.yoursite.com
VITE_SUCCESS_URL=https://yoursite.com/payment-success
VITE_CANCEL_URL=https://yoursite.com/payment-cancel
```

---

## Troubleshooting

### CORS Issues:
Add to WordPress `wp-config.php`:
```php
header('Access-Control-Allow-Origin: http://localhost:3015');
header('Access-Control-Allow-Credentials: true');
```

Or install plugin: "WP REST API Controller"

### Order not creating:
- Check WooCommerce REST API key permissions
- Verify product IDs are correct
- Check browser console for errors

### Payment not redirecting:
- Verify myPOS plugin is properly configured
- Check return URLs in myPOS settings
- Test in WooCommerce directly first

---

## Next Steps

1. ✅ Set up WordPress locally
2. ✅ Install WooCommerce + myPOS plugin
3. ✅ Connect myPOS account
4. ✅ Create products
5. ✅ Generate REST API keys
6. ✅ Update React app code
7. ✅ Test payment flow
8. ✅ Deploy to production

---

**Let me know which step you're on and if you need help with any part!**
