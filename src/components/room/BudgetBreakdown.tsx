import React from 'react';
import { BudgetItem } from '../../types';
import { formatINR } from '../../utils/formatters';
import { Receipt, Info, BookmarkPlus, Check, Sparkles } from 'lucide-react';
import { useRoomStore } from '../../store/roomStore';

interface BudgetBreakdownProps {
  items: BudgetItem[];
  totalEstimatedCost: number;
  targetBudget?: number;
}

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  items,
  totalEstimatedCost,
  targetBudget,
}) => {
  const { moodboard, addToMoodboard } = useRoomStore();

  const handleAddAllToMoodboard = () => {
    items.forEach((item) => {
      const already = moodboard.some((m) => m.itemId === item.id);
      if (!already) {
        addToMoodboard({
          itemId: item.id,
          type: 'decor',
          title: item.name,
          imageUrl:
            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80',
          price: item.estimatedPrice,
          notes: `${item.category} • ${item.diyTip || 'Hostel decor idea'}`,
        });
      }
    });
  };

  return (
    <div className="rounded-2xl bg-white border border-beige shadow-subtle p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-forest" />
            <h3 className="font-display font-bold text-xl text-forest">
              Estimated Budget Breakdown
            </h3>
          </div>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Realist student market estimates • DIY alternatives included for every item
          </p>
        </div>

        <button
          onClick={handleAddAllToMoodboard}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage/40 hover:bg-sage/70 text-forest text-xs font-semibold transition-colors border border-forest/15 self-start sm:self-auto"
        >
          <BookmarkPlus className="w-4 h-4 text-forest" />
          <span>Save all items to Moodboard</span>
        </button>
      </div>

      {/* Item List */}
      <div className="divide-y divide-beige/70">
        {items.map((item) => (
          <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-sm">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-medium text-charcoal">{item.name}</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-ivory text-charcoal-muted border border-beige">
                  {item.category}
                </span>
                {item.quantity > 1 && (
                  <span className="text-xs text-charcoal-muted">× {item.quantity}</span>
                )}
              </div>

              {item.diyTip && (
                <p className="text-xs text-forest flex items-start gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                  <span>
                    <strong>Student Hack:</strong> {item.diyTip}
                  </span>
                </p>
              )}

              {item.whereToFind && (
                <p className="text-[11px] text-charcoal-muted">
                  Where to source: {item.whereToFind}
                </p>
              )}
            </div>

            <div className="text-right sm:shrink-0">
              <span className="font-semibold text-charcoal font-sans text-base">
                {formatINR(item.estimatedPrice * item.quantity)}
              </span>
              <div className="text-[10px] text-charcoal-muted">est. market price</div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="pt-4 border-t-2 border-dashed border-beige flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-ivory/60 p-4 rounded-xl">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-charcoal-muted shrink-0 mt-0.5" />
          <p className="text-xs text-charcoal-muted max-w-md">
            Prices are realistic estimates based on local Indian markets, thrift stalls, and online student retailers.
            No live retailer pricing or affiliate partnerships.
          </p>
        </div>

        <div className="text-right w-full sm:w-auto">
          <div className="text-xs text-charcoal-muted">Total Estimated Expenditure</div>
          <div className="text-2xl font-display font-bold text-forest">
            {formatINR(totalEstimatedCost)}
          </div>
          {targetBudget && (
            <div className="text-xs text-terracotta mt-0.5">
              {totalEstimatedCost <= targetBudget
                ? `✓ Well within target cap of ${formatINR(targetBudget)}`
                : `Target was ${formatINR(targetBudget)}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

