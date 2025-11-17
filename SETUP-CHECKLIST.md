# ✅ Hybrid Setup Checklist

## Status: In Progress

Follow this checklist to complete your hybrid React + WooCommerce + myPOS setup.

---

## Part 1: WordPress Backend Setup

### 1. ✅ WordPress Installed
- [x] WordPress running at: https://payments.iamurtrainer.site/
- [x] Can access admin: https://payments.iamurtrainer.site/wp-admin

### 2. ⏳ Install WooCommerce
- [ ] Go to **Plugins** → **Add New**
- [ ] Search "WooCommerce"
- [ ] Install and Activate
- [ ] Complete setup wizard

### 3. ⏳ Install myPOS Plugin
- [ ] Go to **Plugins** → **Add New**
- [ ] Search "myPOS Virtual for WooCommerce"
- [ ] Install and Activate

### 4. ⏳ Configure myPOS
- [ ] Go to **WooCommerce** → **Settings** → **Payments**
- [ ] Find "myPOS Checkout"
- [ ] Click **Manage**
- [ ] Enable the payment method
- [ ] Click "Connect with myPOS" (OAuth)
- [ ] OR enter credentials manually (SID, Wallet, Keys)

### 5. ⏳ Create Products
Create these 3 products:

**Product 1: 12 Months**
- [ ] **Products** → **Add New**
- [ ] Title: `12 Months Fitness Coaching`
- [ ] Price: `59.99`
- [ ] Type: Simple product
- [ ] Virtual: ✅
- [ ] SKU: `sub-12`
- [ ] Publish
- [ ] **Note Product ID**: _____ (from URL after saving)

**Product 2: 18 Months**
- [ ] Title: `18 Months Fitness Coaching`
- [ ] Price: `79.99`
- [ ] Type: Simple product
- [ ] Virtual: ✅
- [ ] SKU: `sub-18`
- [ ] Publish
- [ ] **Note Product ID**: _____ (from URL)

**Product 3: Lifetime**
- [ ] Title: `Lifetime Fitness Coaching`
- [ ] Price: `199.99`
- [ ] Type: Simple product
- [ ] Virtual: ✅
- [ ] SKU: `lifetime`
- [ ] Publish
- [ ] **Note Product ID**: _____ (from URL)

### 6. ⏳ Generate REST API Keys
- [ ] Go to **WooCommerce** → **Settings** → **Advanced** → **REST API**
- [ ] Click **Add key**
- [ ] Description: `React Frontend App`
- [ ] User: Your admin user
- [ ] Permissions: **Read/Write**
- [ ] Click **Generate API key**
- [ ] **Copy and save these:**
  ```
  Consumer key: ck_________________________________
  Consumer secret: cs_________________________________
  ```

---

## Part 2: React Frontend Setup

### 7. ✅ Install Dependencies
- [x] WooCommerce REST API package installed

### 8. ✅ Files Created
- [x] `services/woocommerce.ts` - WooCommerce API integration
- [x] `services/mypos.ts` - Updated to use WooCommerce
- [x] `config.ts` - Product ID mapping
- [x] `.env` - Environment variables template

### 9. ⏳ Configure Environment Variables
Edit `.env` file and add:

```env
VITE_WOOCOMMERCE_URL=https://payments.iamurtrainer.site
VITE_WOOCOMMERCE_KEY=ck_your_consumer_key_here
VITE_WOOCOMMERCE_SECRET=cs_your_consumer_secret_here
```

- [ ] Replace `ck_your_consumer_key_here` with actual key
- [ ] Replace `cs_your_consumer_secret_here` with actual secret

### 10. ⏳ Update Product IDs
Edit `config.ts` file:

```typescript
const PRODUCT_IDS = {
  '12_MONTHS': 123,  // Replace 123 with actual ID
  '18_MONTHS': 124,  // Replace 124 with actual ID
  'LIFETIME': 125,   // Replace 125 with actual ID
};
```

- [ ] Replace `123` with actual 12 Months product ID
- [ ] Replace `124` with actual 18 Months product ID
- [ ] Replace `125` with actual Lifetime product ID

### 11. ⏳ Restart Development Server
```bash
cd /Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page
npm run dev
```

- [ ] Server running at http://localhost:3015

---

## Part 3: Configure Return URLs

### 12. ⏳ Set Return URLs in WooCommerce

You may need to configure where myPOS redirects after payment:

**Option A: Configure in myPOS Plugin Settings**
- [ ] **WooCommerce** → **Settings** → **Payments** → **myPOS Checkout**
- [ ] Look for "Return URL" or "Success URL" settings
- [ ] Set Success URL: `http://localhost:3015/payment-success`
- [ ] Set Cancel URL: `http://localhost:3015/payment-cancel`

**Option B: Configure in myPOS Dashboard**
- [ ] Log into myPOS merchant account
- [ ] Go to Developer/IPC settings
- [ ] Set return URLs there

---

## Part 4: Testing

### 13. ⏳ Test the Complete Flow

1. **Start both servers:**
   - [ ] WordPress: https://payments.iamurtrainer.site/
   - [ ] React app: http://localhost:3015

2. **Test payment flow:**
   - [ ] Open React app: http://localhost:3015
   - [ ] Click "Choose Plan" on any pricing card
   - [ ] Should redirect to WooCommerce checkout
   - [ ] Should see myPOS payment form
   - [ ] Complete test payment (use test card if in test mode)
   - [ ] Should redirect back to React success page

3. **Check order in WooCommerce:**
   - [ ] Go to **WooCommerce** → **Orders**
   - [ ] Verify order was created
   - [ ] Check payment status

### 14. ⏳ Test Error Handling

- [ ] Test with invalid product ID (should show error)
- [ ] Test canceling payment (should go to cancel page)
- [ ] Check browser console for errors

---

## Part 5: Troubleshooting

### Common Issues:

**CORS Errors:**
If you see CORS errors in browser console:
- [ ] Install WordPress plugin: "WP REST API Controller"
- [ ] Or add to `wp-config.php`:
  ```php
  header('Access-Control-Allow-Origin: http://localhost:3015');
  header('Access-Control-Allow-Credentials: true');
  ```

**401 Unauthorized:**
- [ ] Verify API keys are correct in `.env`
- [ ] Check API key permissions are "Read/Write"
- [ ] Try regenerating API keys

**Product Not Found:**
- [ ] Verify product IDs in `config.ts` match WooCommerce
- [ ] Check products are published in WooCommerce

**myPOS Not Showing:**
- [ ] Verify myPOS plugin is activated
- [ ] Check myPOS is enabled in payment settings
- [ ] Confirm myPOS account is properly connected

---

## Part 6: Production Deployment

### 15. ⏳ Update for Production

**Update `.env` for production:**
```env
VITE_WOOCOMMERCE_URL=https://payments.iamurtrainer.site
VITE_SUCCESS_URL=https://iamurtrainer.site/payment-success
VITE_CANCEL_URL=https://iamurtrainer.site/payment-cancel
```

**In myPOS settings:**
- [ ] Switch from Test Mode to Production Mode
- [ ] Update return URLs to production domains

**Deploy React app:**
- [ ] Build: `npm run build`
- [ ] Deploy to your hosting (Vercel, Netlify, etc.)

---

## Quick Reference

**WordPress Admin:** https://payments.iamurtrainer.site/wp-admin  
**React App:** http://localhost:3015  
**WooCommerce Orders:** https://payments.iamurtrainer.site/wp-admin/edit.php?post_type=shop_order

**Test Card (if in test mode):**
- Card: 5555 5555 5555 4444
- CVV: 123
- Expiry: Any future date

---

## Current Status Summary

✅ = Completed  
⏳ = In Progress  
❌ = Not Started

- [x] WordPress installed
- [x] React app updated with WooCommerce integration
- [ ] WooCommerce installed
- [ ] myPOS plugin installed
- [ ] Products created
- [ ] API keys generated
- [ ] Environment configured
- [ ] Testing completed

---

**Next Step:** Install WooCommerce plugin in WordPress

Need help with any step? Just let me know!
