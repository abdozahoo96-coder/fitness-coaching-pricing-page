
import type React from 'react';

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  priceSubtitle?: string;
  totalPriceSubtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
}
