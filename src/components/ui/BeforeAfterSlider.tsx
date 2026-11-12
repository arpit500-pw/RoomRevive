import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MoveHorizontal, Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
  initialSliderPos?: number;
  onFullscreen?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'ORIGINAL ROOM',
  afterLabel = 'ROOMREVIVE TRANSFORMATION',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  initialSliderPos = 50,
  onFullscreen,
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialSliderPos);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      let pos = (x / width) * 100;
      if (pos < 2) pos = 2;
      if (pos > 98) pos = 98;
      setSliderPosition(pos);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(95, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl bg-charcoal/5 border border-beige shadow-elevated ${aspectRatio} ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after makeover image comparison"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* "After" Image (Background, full width) */}
      <img
        src={afterImage}
        alt="Redesigned room makeover"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80';
        }}
      />

      {/* "Before" Image (Clipped layer on top) */}
      <div
        className="absolute inset-0 h-full overflow-hidden pointer-events-none transition-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Original hostel room"
          className="absolute inset-0 h-full object-cover max-w-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
          }}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        {/* Subtle dark gradient overlay on before to emphasize hostel mood */}
        <div className="absolute inset-0 bg-charcoal/10" />
      </div>

      {/* Divider Line and Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 cursor-ew-resize transition-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-forest text-ivory border-2 border-white shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
          <MoveHorizontal className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-charcoal/80 text-ivory backdrop-blur-md shadow-sm border border-white/10">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-forest text-ivory backdrop-blur-md shadow-sm border border-forest-200/30">
          {afterLabel}
        </span>
      </div>

      {/* Hint helper at bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-80 transition-opacity hover:opacity-100 hidden sm:block">
        <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-charcoal/70 text-white/90 backdrop-blur-md shadow-sm">
          Drag slider or use arrow keys
        </span>
      </div>

      {/* Fullscreen button if provided */}
      {onFullscreen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFullscreen();
          }}
          className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-charcoal/70 hover:bg-charcoal text-white backdrop-blur-md transition-all shadow-md"
          title="Fullscreen preview"
          aria-label="Open fullscreen"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

