import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark, BookmarkCheck, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { InspirationItem } from '../../types';
import { useRoomStore } from '../../store/roomStore';
import { BudgetBadge } from '../ui/BudgetBadge';

interface InspirationCardProps {
  item: InspirationItem;
  onOpenDetails?: (item: InspirationItem) => void;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({ item, onOpenDetails }) => {
  const navigate = useNavigate();
  const { moodboard, addToMoodboard, removeFromMoodboard, likedInspirations, toggleLikeInspiration, setSelectedStyle } =
    useRoomStore();

  const isSaved = moodboard.some((m) => m.itemId === item.id);
  const isLiked = likedInspirations.includes(item.id);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeFromMoodboard(item.id);
    } else {
      addToMoodboard({
        itemId: item.id,
        type: 'inspiration',
        title: item.title,
        imageUrl: item.imageUrl,
        style: item.style,
        notes: `Inspired by ${item.author} (${item.campusCity}) with est. budget ${item.budgetEstimate}`,
      });
    }
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeInspiration(item.id);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReviveWithThisStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStyle(item.style);
    navigate('/studio');
  };

  return (
    <div
      onClick={() => (onOpenDetails ? onOpenDetails(item) : handleReviveWithThisStyle({} as any))}
      className="group relative rounded-2xl overflow-hidden bg-white border border-beige shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/5">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-ivory/90 text-forest backdrop-blur-md border border-white/40 shadow-sm">
            {item.styleName}
          </span>
          {item.isFeatured && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-terracotta text-white shadow-sm">
              Staff Pick
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={handleToggleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isLiked
                ? 'bg-terracotta text-white scale-110 shadow-md'
                : 'bg-charcoal/50 text-white/90 hover:bg-charcoal/80'
            }`}
            title={isLiked ? 'Liked' : 'Like inspiration'}
            aria-label="Like this room design"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={handleToggleSave}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-forest text-white scale-110 shadow-md'
                : 'bg-charcoal/50 text-white/90 hover:bg-charcoal/80'
            }`}
            title={isSaved ? 'Saved in moodboard' : 'Save to moodboard'}
            aria-label="Save to moodboard"
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom Floating Info inside Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="text-white">
            <h4 className="font-display font-semibold text-lg text-white leading-tight drop-shadow-sm">
              {item.title}
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-white/80 mt-0.5">
              <MapPin className="w-3 h-3 text-terracotta-light shrink-0" />
              <span className="truncate max-w-[180px]">{item.campusCity}</span>
            </div>
          </div>
          <BudgetBadge amount={item.budgetEstimate} className="bg-white/90 text-forest text-[11px]" />
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="p-3 bg-white flex items-center justify-between border-t border-beige/60">
        <div className="text-xs text-charcoal-muted">
          By <span className="font-medium text-charcoal">{item.author}</span>
          <span className="mx-1.5">•</span>
          <span>{likeCount} likes</span>
        </div>
        <button
          onClick={handleReviveWithThisStyle}
          className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-800 transition-colors py-1 px-2 rounded-lg hover:bg-sage/30"
        >
          <span>Revive in Studio</span>
          <Sparkles className="w-3 h-3 text-terracotta" />
        </button>
      </div>
    </div>
  );
};

