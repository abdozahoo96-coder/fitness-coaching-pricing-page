import { createOrder } from './woocommerce';

export interface PaymentData {
  orderId: string;
  amount: string;
  currency: string;
  planTitle: string;
  planId: string;
}

class MyPOSService {
  // Map your plan IDs to WooCommerce product IDs
  // TODO: Update these with your actual WooCommerce product IDs after creating products
  private productMapping: Record<string, number> = {
    'sub-12': 0,    // Replace with actual product ID for 12 months
    'sub-18': 0,    // Replace with actual product ID for 18 months
    'lifetime': 0   // Replace with actual product ID for lifetime
  };

  /**
   * Update product mapping with actual WooCommerce product IDs
   */
  setProductMapping(planId: string, productId: number) {
    this.productMapping[planId] = productId;
  }

  /**
   * Generate a unique order ID
   */
  generateOrderId(): string {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initiate payment through WooCommerce + myPOS
   */
  async initiatePayment(paymentData: PaymentData): Promise<void> {
    try {
      const productId = this.productMapping[paymentData.planId];
      
      if (!productId || productId === 0) {
        console.error('⚠️ Product ID not configured for plan:', paymentData.planId);
        alert(
          'Product mapping not configured. Please update the product IDs in services/mypos.ts\n\n' +
          `Plan: ${paymentData.planId}\n` +
          'Check HYBRID-SETUP-GUIDE.md for instructions.'
        );
        return;
      }

      console.log('🔄 Creating order via WooCommerce API...', {
        planId: paymentData.planId,
        productId: productId,
        planTitle: paymentData.planTitle,
        amount: paymentData.amount
      });

      const result = await createOrder({
        productId,
        planTitle: paymentData.planTitle,
        amount: paymentData.amount,
      });

      if (result.success && result.checkoutUrl) {
        console.log('✅ Order created successfully!');
        console.log('🔗 Redirecting to WooCommerce checkout with myPOS...');
        console.log('Order ID:', result.orderId);
        console.log('Checkout URL:', result.checkoutUrl);
        
        // Redirect to WooCommerce checkout (which will show myPOS payment)
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error(result.error || 'Failed to create order');
      }
    } catch (error: any) {
      console.error('❌ Error initiating payment:', error);
      alert(
        `Failed to initiate payment: ${error.message}\n\n` +
        'Please check:\n' +
        '1. WooCommerce API credentials are correct\n' +
        '2. Product IDs are configured\n' +
        '3. WordPress site is accessible'
      );
    }
  }

  /**
   * Handle payment callback from myPOS
   */
  handlePaymentCallback(params: URLSearchParams): {
    status: 'success' | 'cancel' | 'error';
    orderId?: string;
    message: string;
  } {
    const status = params.get('status');
    const orderId = params.get('order_id') || params.get('order-received');

    if (status === 'success' || status === 'completed' || params.has('order-received')) {
      return {
        status: 'success',
        orderId: orderId || undefined,
        message: 'Payment completed successfully!',
      };
    } else if (status === 'cancelled' || status === 'canceled' || status === 'failed') {
      return {
        status: 'cancel',
        orderId: orderId || undefined,
        message: 'Payment was cancelled.',
      };
    } else {
      return {
        status: 'error',
        message: 'Payment status unknown. Please check your order confirmation email.',
      };
    }
  }
}

export const myPOSService = new MyPOSService();
