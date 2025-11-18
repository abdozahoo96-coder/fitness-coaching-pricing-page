// myPOS Payment Links Service

export interface PaymentData {
  planId: string;
  planTitle: string;
  amount: string;
}

/**
 * myPOS Payment Links Configuration
 * 
 * Replace these URLs with your actual myPOS payment links
 * To create payment links:
 * 1. Log into myPOS dashboard
 * 2. Go to Payment Links or Virtual POS
 * 3. Create a link for each product
 * 4. Copy the URLs here
 */

const PAYMENT_LINKS: Record<string, string> = {
  // Lifetime Plans - Contact via WhatsApp
  'lifetime-1': 'https://wa.me/message/RQAP2VWXTUEPG1', // ✅ WhatsApp - $289
  'lifetime-2': 'https://wa.me/message/RQAP2VWXTUEPG1', // ✅ WhatsApp - $416
  'lifetime-3': 'https://wa.me/message/RQAP2VWXTUEPG1', // ✅ WhatsApp - $543
  'lifetime-4': 'https://wa.me/message/RQAP2VWXTUEPG1', // ✅ WhatsApp - $670
  'lifetime-5': 'https://wa.me/message/RQAP2VWXTUEPG1', // ✅ WhatsApp - $797
  
  // Subscription Plans
  'sub-1': 'https://mypos.com/vmp/btn/BVLCDHBU31M23', // ✅ 1 Month - $10.99
  'sub-3': 'https://mypos.com/vmp/btn/BBJM3DG47YP30', // ✅ 3 Months - $25.99
  'sub-6': 'https://mypos.com/vmp/btn/BRA45PRY4JF14', // ✅ 6 Months - $39.99
  'sub-12': 'https://mypos.com/vmp/btn/BXH96M57XNW94', // ✅ 12 Months - $59.99
  'sub-24': 'https://mypos.com/vmp/btn/B8SMUUDWODN58', // ✅ 24 Months - $99.99
};

class MyPOSService {
  /**
   * Initiate payment using myPOS payment link
   */
  initiatePayment(paymentData: PaymentData): void {
    const paymentLink = PAYMENT_LINKS[paymentData.planId];

    if (!paymentLink) {
      console.error('❌ Payment link not found for plan:', paymentData.planId);
      alert(
        `Payment link not configured for ${paymentData.planTitle}.\n\n` +
        'Please contact support or choose another plan.'
      );
      return;
    }

    if (paymentLink.includes('YOUR_LINK')) {
      console.error('❌ Payment link not configured');
      alert(
        `Payment links need to be configured.\n\n` +
        'Please update the payment links in services/mypos.ts'
      );
      return;
    }

    console.log('🔗 Redirecting to myPOS payment link:', {
      planId: paymentData.planId,
      planTitle: paymentData.planTitle,
      amount: paymentData.amount,
      link: paymentLink,
    });

    // Redirect to myPOS payment link
    window.location.href = paymentLink;
  }

  /**
   * Handle payment callback from myPOS
   */
  handlePaymentCallback(params: URLSearchParams): {
    status: 'success' | 'cancel' | 'error';
    orderId?: string;
    message: string;
  } {
    // myPOS returns different parameters
    const status = params.get('Status');
    const orderId = params.get('OrderID');
    const statusCode = params.get('StatusCode');

    console.log('Payment callback received:', {
      status,
      statusCode,
      orderId,
    });

    // Status codes from myPOS:
    // 0 = Success
    // -1 = Cancelled by user
    // Other = Error

    if (status === '0' || statusCode === '0') {
      return {
        status: 'success',
        orderId: orderId || undefined,
        message: 'Payment completed successfully!',
      };
    } else if (status === '-1' || statusCode === '-1') {
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
