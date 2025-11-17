// myPOS IPC Direct Integration Service

export interface PaymentData {
  orderId: string;
  amount: string;
  currency: string;
  planTitle: string;
  planId: string;
}

class MyPOSService {
  private backendUrl: string;

  constructor() {
    this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';
  }

  /**
   * Generate a unique order ID
   */
  generateOrderId(): string {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initiate payment using myPOS IPC
   */
  async initiatePayment(paymentData: PaymentData): Promise<void> {
    try {
      console.log('🔄 Creating myPOS IPC payment...', {
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        planTitle: paymentData.planTitle,
      });

      // Extract numeric amount
      const numericAmount = paymentData.amount.replace('$', '');

      // Call backend to generate signed payment form
      const response = await fetch(`${this.backendUrl}/api/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: paymentData.orderId,
          amount: numericAmount,
          currency: paymentData.currency,
          planTitle: paymentData.planTitle,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to create payment');
      }

      console.log('✅ Payment form data received');
      console.log('🔗 IPC URL:', result.ipcUrl);

      // Create and submit form to myPOS
      this.submitPaymentForm(result.ipcUrl, result.formData);

    } catch (error: any) {
      console.error('❌ Error initiating payment:', error);
      alert(
        `Failed to initiate payment: ${error.message}\n\n` +
        'Please check:\n' +
        '1. Backend server is running (npm run server)\n' +
        '2. myPOS credentials are configured\n' +
        '3. Browser console for more details'
      );
    }
  }

  /**
   * Create and submit HTML form to myPOS
   */
  private submitPaymentForm(ipcUrl: string, formData: Record<string, string>): void {
    // Create form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = ipcUrl;
    form.style.display = 'none';

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    // Add form to page and submit
    document.body.appendChild(form);
    
    console.log('🚀 Submitting payment form to myPOS...');
    form.submit();
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
