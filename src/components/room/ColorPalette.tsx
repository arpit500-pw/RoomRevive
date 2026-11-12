import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorPaletteProps {
  palette: {
    hex: string;
    name: string;
    role: string;
  }[];
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ palette }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="rounded-2xl bg-white border border-beige p-6 shadow-subtle space-y-4">
      <div>
        <h4 className="font-display font-semibold text-lg text-forest">
          Suggested Room Palette
        </h4>
        <p className="text-xs text-charcoal-muted">
          Harmonized hues to balance cold concrete walls with cozy warmth. Click any shade to copy hex code.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {palette.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleCopy(color.hex)}
            className="group flex flex-col rounded-xl overflow-hidden border border-beige hover:border-forest/40 transition-all text-left focus:outline-none focus:ring-2 focus:ring-forest"
          >
            {/* Color preview block */}
            <div
              className="h-16 w-full relative flex items-center justify-center"
              style={{ backgroundColor: color.hex }}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-charcoal/60 text-white backdrop-blur-sm">
                {copiedHex === color.hex ? (
                  <Check className="w-3.5 h-3.5 text-sage" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </div>

            {/* Details */}
            <div className="p-2.5 bg-ivory/50 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-charcoal block truncate">
                  {color.name}
                </span>
                <span className="text-[10px] text-charcoal-muted block truncate">
                  {color.role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-charcoal-faint uppercase mt-1">
                {copiedHex === color.hex ? 'Copied!' : color.hex}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

