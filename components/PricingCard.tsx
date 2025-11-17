
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { PricingPlan } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    onSelect(plan.id);
    
    // Determine plan type
    const planType = plan.id.startsWith('sub-') ? 'subscription' : 'lifetime';
    
    // Navigate to payment page with plan details
    navigate(`/payment?plan=${plan.id}&type=${planType}`);
  };

  const cardClasses = `
    bg-white rounded-xl shadow-lg border-2 p-6 text-center cursor-pointer
    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl
    relative overflow-hidden
    ${isSelected ? 'border-primary-blue ring-2 ring-primary-blue/50' : 'border-transparent'}
  `;

  const badgeClasses = `
    absolute top-0 -right-12 transform rotate-45 bg-primary-blue text-white
    text-xs font-bold px-12 py-1.5 shadow-md
  `;
    
  const popularBadgeClasses = `
    absolute top-4 -left-0.5 transform -translate-x-1/3 -rotate-45 bg-yellow-400 text-gray-900
    text-xs font-bold px-12 py-1 shadow-md
  `;

  let badgeElement = null;
  if (plan.badge) {
    if (plan.badge === 'MOST POPULAR' || plan.badge === 'BEST DEAL') {
        badgeElement = <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden">
            <div className="absolute top-8 -left-8 w-40 text-center bg-yellow-400 text-gray-900 py-1.5 transform -rotate-45 font-semibold text-sm shadow-lg">{plan.badge}</div>
        </div>
    } else {
        badgeElement = <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
            <div className="absolute top-8 -right-8 w-40 text-center bg-primary-blue text-white py-1.5 transform rotate-45 font-semibold text-sm shadow-lg">{plan.badge}</div>
        </div>
    }
  }

  return (
    <div className={cardClasses} onClick={() => onSelect(plan.id)}>
      {badgeElement}
      <div className="mt-8 mb-4">
        {plan.icon && <div className="mb-4 text-primary-blue">{plan.icon}</div>}
        <h3 className="text-xl font-bold text-navy">{plan.title}</h3>
      </div>
      <div className="my-5">
        <span className="text-4xl font-extrabold text-navy">{plan.price}</span>
        {plan.priceSubtitle && <span className="text-gray-500 font-medium">/month</span>}
      </div>
      <p className="text-sm text-gray-500 h-10">
        {plan.totalPriceSubtitle && <span>{plan.totalPriceSubtitle}</span>}
      </p>
      <button 
        onClick={handleChoosePlan}
        className={`w-full py-3 mt-4 rounded-lg font-semibold transition-colors duration-300
        ${isSelected ? 'bg-primary-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-primary-blue/80 hover:text-white'}`}>
        Choose Plan
      </button>
    </div>
  );
};
