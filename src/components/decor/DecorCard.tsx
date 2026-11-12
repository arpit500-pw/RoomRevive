import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Sparkles, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { DecorItem } from '../../types';
import { useRoomStore } from '../../store/roomStore';
import { formatINR } from '../../utils/formatters';

interface DecorCardProps {
  item: DecorItem;
}

export const DecorCard: React.FC<DecorCardProps> = ({ item }) => {
  const [showHack, setShowHack] = useState(false);
  const { moodboard, addToMoodboard, removeFromMoodboard } = useRoomStore();

  const isSaved = moodboard.some((m) => m.itemId === item.id);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeFromMoodboard(item.id);
    } else {
      addToMoodboard({
        itemId: item.id,
        type: 'decor',
        title: item.name,
        imageUrl: item.imageUrl,
        price: item.estimatedPrice,
        notes: `Estimated ${item.priceFormatted} • Hack: ${item.studentHack}`,
      });
    }
  };

  return (
    <div className="group rounded-2xl bg-white border border-beige hover:border-forest/30 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/5">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-ivory/90 text-forest backdrop-blur-md border border-white/50 shadow-sm">
          {item.category}
        </span>

        {/* Save button */}
        <button
          onClick={handleToggleSave}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-forest text-white scale-105 shadow-md'
              : 'bg-charcoal/50 text-white/90 hover:bg-charcoal/80'
          }`}
          title={isSaved ? 'In Moodboard' : 'Add to Moodboard'}
          aria-label="Save decor item"
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {/* Price tag */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-forest text-ivory text-xs font-bold shadow-md">
          {item.priceFormatted}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-display font-semibold text-base text-forest group-hover:text-forest-800 transition-colors leading-snug">
            {item.name}
          </h3>
          <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Compatible styles */}
        <div className="flex flex-wrap gap-1">
          {item.compatibleStyles.map((style) => (
            <span
              key={style}
              className="text-[10px] capitalize px-2 py-0.5 rounded-full bg-beige/60 text-charcoal-muted"
            >
              {style.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Student Hack accordion toggle */}
        <div className="pt-2 border-t border-beige/60">
          <button
            onClick={() => setShowHack(!showHack)}
            className="w-full flex items-center justify-between text-xs font-semibold text-terracotta hover:text-terracotta-dark py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hostel Hack & Zero-Drill Tip</span>
            </span>
            {showHack ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showHack && (
            <div className="mt-2 p-2.5 rounded-xl bg-ivory text-[11px] text-charcoal space-y-1.5 border border-beige animate-in fade-in-50 duration-200">
              <p>
                <strong>Student Tip:</strong> {item.studentHack}
              </p>
              {item.diyAlternative && (
                <p className="text-charcoal-muted border-t border-beige/80 pt-1">
                  <strong>Zero-₹ DIY:</strong> {item.diyAlternative}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

