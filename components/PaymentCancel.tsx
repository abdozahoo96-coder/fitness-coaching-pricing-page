import React, { useEffect, useState } from 'react';
import { myPOSService } from '../services/mypos';

export const PaymentCancel: React.FC = () => {
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
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          {paymentInfo?.message || 'Your payment was cancelled. No charges were made.'}
        </p>
        {paymentInfo?.orderId && (
          <p className="text-sm text-gray-500 mb-6">Order ID: {paymentInfo.orderId}</p>
        )}
        <div className="space-y-3">
          <a
            href="/"
            className="block bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </a>
          <a
            href="/"
            className="block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};
