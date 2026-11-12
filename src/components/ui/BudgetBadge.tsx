import React from 'react';

interface BudgetBadgeProps {
  amount: string | number;
  className?: string;
  prefix?: string;
}

export const BudgetBadge: React.FC<BudgetBadgeProps> = ({
  amount,
  className = '',
  prefix = 'Est. ',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-ivory text-forest border border-beige-dark shadow-subtle ${className}`}
    >
      <span className="text-charcoal-muted mr-1 font-normal">{prefix}</span>
      <span>{typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount}</span>
    </span>
  );
};

