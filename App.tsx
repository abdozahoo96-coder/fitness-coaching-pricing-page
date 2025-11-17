
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PricingCard } from './components/PricingCard';
import { PaymentPage } from './components/PaymentPage';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentCancel } from './components/PaymentCancel';
import { LIFETIME_PLANS, SUBSCRIPTION_PLANS } from './constants';
import './config'; // Initialize product mapping

const HomePage: React.FC = () => {
  const [selectedLifetimePlan, setSelectedLifetimePlan] = useState<string>('lifetime-1');
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState<string>('sub-12');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-navy text-white text-center p-4 shadow-md sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-bold tracking-wider">👑 ✨ EXCLUSIVE LIFETIME OFFERS ✨</h1>
      </header>

      <div 
        className="relative bg-cover bg-center text-white py-20 px-4 text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Find The Perfect Plan</h2>
            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Choose a plan that fits your goals and budget. Start your fitness journey with us today!
            </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 md:py-16">
        
        {/* Subscription Plans Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Subscription Plans</h2>
            <p className="text-gray-500 mt-2">Flexible monthly billing options.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isSelected={selectedSubscriptionPlan === plan.id}
                onSelect={setSelectedSubscriptionPlan}
              />
            ))}
          </div>
        </section>

        {/* Lifetime Membership Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Lifetime Membership</h2>
            <p className="text-gray-500 mt-2">One-time payment, lifetime access.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {LIFETIME_PLANS.map((plan) => (
              <PricingCard 
                key={plan.id}
                plan={plan}
                isSelected={selectedLifetimePlan === plan.id}
                onSelect={setSelectedLifetimePlan}
              />
            ))}
          </div>
        </section>

      </main>
      <footer className="text-center py-8 text-gray-400">
        <p>&copy; 2024 FitLife Coaching. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-cancel" element={<PaymentCancel />} />
    </Routes>
  );
};

export default App;
