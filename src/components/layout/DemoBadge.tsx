import React from 'react';
import { Info } from 'lucide-react';

export const DemoBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-medium ${className}`}
      title="RoomRevive is operating in local instant demo mode with high-fidelity student room transformations."
    >
      <Info className="w-3.5 h-3.5 text-forest" />
      <span>Local Demo Mode • Instant Transformations</span>
    </div>
  );
};

