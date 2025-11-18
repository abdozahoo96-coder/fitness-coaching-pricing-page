import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SUBSCRIPTION_PLANS, LIFETIME_PLANS } from '../constants';
import { myPOSService } from '../services/mypos';

export const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const planId = searchParams.get('plan');
  const planType = searchParams.get('type'); // 'subscription' or 'lifetime'

  // Find the plan
  const allPlans = [...SUBSCRIPTION_PLANS, ...LIFETIME_PLANS];
  const selectedPlan = allPlans.find(p => p.id === planId);

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/');
    }
  }, [selectedPlan, navigate]);

  const handlePayment = () => {
    if (!selectedPlan) return;

    setLoading(true);

    // Redirect to myPOS payment link
    myPOSService.initiatePayment({
      planId: selectedPlan.id,
      planTitle: selectedPlan.title,
      amount: selectedPlan.price,
    });
  };

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy text-white text-center p-4 shadow-md">
        <h1 className="text-xl md:text-2xl font-bold tracking-wider">Checkout</h1>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Order Summary */}
          <h2 className="text-2xl font-bold text-navy mb-6">Order Summary</h2>
          
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{selectedPlan.title}</h3>
                <p className="text-gray-500 mt-1">
                  {planType === 'subscription' ? 'Subscription Plan' : 'Lifetime Membership'}
                </p>
              </div>
              {selectedPlan.badge && (
                <span className="bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  {selectedPlan.badge}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Price:</span>
                <span className="font-semibold text-navy text-xl">{selectedPlan.price}</span>
              </div>
              {selectedPlan.totalPriceSubtitle && (
                <div className="text-sm text-gray-500">
                  {selectedPlan.totalPriceSubtitle}
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Information</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">
                You will be redirected to myPOS secure checkout page to complete your payment.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Secure SSL encrypted payment</li>
                <li>Multiple payment methods supported</li>
                <li>Instant confirmation</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-blue hover:bg-blue-600'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Redirecting...
                </span>
              ) : (
                `Pay ${selectedPlan.price}`
              )}
            </button>

            <button
              onClick={() => navigate('/')}
              disabled={loading}
              className="w-full py-4 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secured by myPOS Payment Gateway
          </div>
        </div>
      </div>
    </div>
  );
};
