import React, { useEffect, useState } from 'react';
import { myPOSService } from '../services/mypos';

export const PaymentSuccess: React.FC = () => {
  const [paymentInfo, setPaymentInfo] = useState<{
    status: string;
    orderId?: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = myPOSService.handlePaymentCallback(params);
    setPaymentInfo(result);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {paymentInfo?.status === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">{paymentInfo.message}</p>
            {paymentInfo.orderId && (
              <p className="text-sm text-gray-500 mb-6">Order ID: {paymentInfo.orderId}</p>
            )}
            <a
              href="/"
              className="inline-block bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment...</h1>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </>
        )}
      </div>
    </div>
  );
};
