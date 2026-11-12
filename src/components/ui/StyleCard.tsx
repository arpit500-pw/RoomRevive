import React from 'react';
import { StyleOption } from '../../types';
import { Check, Sparkles } from 'lucide-react';

interface StyleCardProps {
  style: StyleOption;
  isSelected?: boolean;
  onSelect?: (style: StyleOption) => void;
  showDetails?: boolean;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  style,
  isSelected = false,
  onSelect,
  showDetails = true,
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(style)}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col ${
        isSelected
          ? 'border-forest ring-2 ring-forest/20 shadow-elevated bg-white'
          : 'border-beige hover:border-forest/40 hover:shadow-soft bg-white/70'
      }`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/5">
        <img
          src={style.imageUrl}
          alt={style.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-80" />

        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}

        {/* Palette preview dots */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md">
          {style.palette.map((color, idx) => (
            <span
              key={idx}
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-inner"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-lg text-forest group-hover:text-forest-800 transition-colors">
              {style.name}
            </h3>
            <span className="text-[11px] font-medium text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
              {style.vibe.split(',')[0]}
            </span>
          </div>
          <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
            {style.tagline}
          </p>
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-beige/60">
            <div className="flex flex-wrap gap-1">
              {style.keyElements.slice(0, 3).map((elem, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-ivory text-charcoal-muted border border-beige"
                >
                  {elem}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

