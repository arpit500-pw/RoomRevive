import { BudgetTier } from '../types';

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const BUDGET_TIERS: {
  id: BudgetTier;
  label: string;
  range: string;
  description: string;
  popularFor: string;
}[] = [
  {
    id: 'under-500',
    label: 'Under ₹500',
    range: '₹150 - ₹500',
    description: 'Micro reset: fairy lights, thrifted plant, and xerox art wall.',
    popularFor: 'Quick Friday night mood shift',
  },
  {
    id: '500-1500',
    label: '₹500 – ₹1,500',
    range: '₹500 - ₹1,500',
    description: 'The sweet spot: cozy throw blanket, ambient lamp, and desk blotter.',
    popularFor: 'Most popular student choice',
  },
  {
    id: '1500-3000',
    label: '₹1,500 – ₹3,000',
    range: '₹1,500 - ₹3,000',
    description: 'Full room warmth: layered lighting, premium linen duvet, organizer risers.',
    popularFor: 'Semester start transformation',
  },
  {
    id: '3000-5000',
    label: '₹3,000 – ₹5,000',
    range: '₹3,000 - ₹5,000',
    description: 'Studio grade: jute rug, ergonomic stands, ceramic decor, storage bins.',
    popularFor: 'Rented flat / PG makeover',
  },
  {
    id: '5000-plus',
    label: '₹5,000+',
    range: '₹5,000 & up',
    description: 'Comprehensive overhaul with accent lighting, rugs, and custom shelves.',
    popularFor: 'Final year thesis sanctuary',
  },
];

