
import React from 'react';
import type { PricingPlan } from './types';

const CalendarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const LIFETIME_PLANS: PricingPlan[] = [
  {
    id: 'lifetime-1',
    title: '1 Member',
    price: '$289',
    totalPriceSubtitle: 'One-time payment',
    badge: 'BEST VALUE',
  },
  {
    id: 'lifetime-2',
    title: '2 Members',
    price: '$416',
    totalPriceSubtitle: 'One-time payment',
  },
  {
    id: 'lifetime-3',
    title: '3 Members',
    price: '$543',
    totalPriceSubtitle: 'One-time payment',
  },
  {
    id: 'lifetime-4',
    title: '4 Members',
    price: '$670',
    totalPriceSubtitle: 'One-time payment',
  },
  {
    id: 'lifetime-5',
    title: '5 Members',
    price: '$797',
    totalPriceSubtitle: 'One-time payment',
    badge: 'FAMILY PLAN',
  },
];

export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: 'sub-1',
    title: '1 Month',
    price: '$10.99',
    priceSubtitle: '/month',
    totalPriceSubtitle: 'per month',
    icon: <CalendarIcon />,
  },
  {
    id: 'sub-3',
    title: '3 Months',
    price: '$25.99',
    totalPriceSubtitle: '$8.66/month',
    icon: <CalendarIcon />,
  },
  {
    id: 'sub-6',
    title: '6 Months',
    price: '$39.99',
    totalPriceSubtitle: '$6.67/month',
    icon: <CalendarIcon />,
  },
  {
    id: 'sub-12',
    title: '12 Months',
    price: '$59.99',
    totalPriceSubtitle: '$5.00/month',
    badge: 'MOST POPULAR',
    icon: <CalendarIcon />,
  },
  {
    id: 'sub-24',
    title: '24 Months',
    price: '$99.99',
    totalPriceSubtitle: '$4.17/month',
    badge: 'BEST DEAL',
    icon: <CalendarIcon />,
  },
];
