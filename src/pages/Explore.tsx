import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Bookmark,
  Heart,
  MapPin,
  X,
} from 'lucide-react';
import { useRoomStore } from '../store/roomStore';
import { INSPIRATIONS, CURATED_COLLECTIONS } from '../data/inspirations';
import { ROOM_STYLES } from '../data/styles';
import { InspirationCard } from '../components/inspiration/InspirationCard';
import { InspirationItem, RoomStyle } from '../types';

const BUDGET_FILTER_OPTIONS = [
  { id: 'all', label: 'Any Budget' },
  { id: 'under-500', label: 'Under ₹500' },
  { id: 'under-1500', label: 'Under ₹1,500' },
  { id: 'under-3000', label: 'Under ₹3,000' },
  { id: 'under-5000', label: 'Under ₹5,000' },
];

const ROOM_TYPE_FILTER_OPTIONS = [
  { id: 'all', label: 'All Rooms' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'pg', label: 'PG' },
  { id: 'dorm', label: 'Dormitory' },
  { id: 'rented', label: 'Rented' },
];

function parseBudgetFromStr(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initFilter = searchParams.get('filter') || 'all';

  const { setSelectedStyle } = useRoomStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState(initFilter);
  const [styleFilter, setStyleFilter] = useState<RoomStyle | 'all'>('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [detailItem, setDetailItem] = useState<InspirationItem | null>(null);

  const filtered = useMemo(() => {
    let items = [...INSPIRATIONS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.styleName.toLowerCase().includes(q) ||
          i.author.toLowerCase().includes(q) ||
          i.campusCity.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeCollection !== 'all') {
      const collectionTagMap: Record<string, string> = {
        'tiny-room': 'Tiny Room, Big Energy',
        'under-1500': 'Under ₹1,500 Makeovers',
        'cozy-study': 'Cozy Study Corners',
        'glow-ups': 'Hostel Room Glow-Ups',
        'minimal-spaces': 'Minimal Spaces',
        'dark-academia': 'Dark Academia Dreams',
      };
      const tag = collectionTagMap[activeCollection];
      if (tag) items = items.filter((i) => i.tags.includes(tag));
    }

    if (styleFilter !== 'all') {
      items = items.filter((i) => i.style === styleFilter);
    }

    if (roomTypeFilter !== 'all') {
      items = items.filter((i) => i.roomType === roomTypeFilter);
    }

    if (budgetFilter !== 'all') {
      const cap = parseInt(budgetFilter.replace('under-', ''), 10);
      items = items.filter((i) => parseBudgetFromStr(i.budgetEstimate) <= cap);
    }

    return items;
  }, [searchQuery, activeCollection, styleFilter, budgetFilter, roomTypeFilter]);

  const handleReviveWithStyle = (style: RoomStyle) => {
    setSelectedStyle(style);
    navigate('/studio');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
          Student Room Discovery
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest tracking-tight">
          Explore real student spaces
        </h1>
        <p className="text-sm text-charcoal-muted max-w-xl">
          Real hostel, PG, and dorm makeovers submitted by students across Indian campuses. Filter by aesthetic, budget, and room type.
        </p>
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by style, campus, author, or vibe..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-beige bg-white text-sm text-charcoal focus:outline-none focus:border-forest shadow-subtle"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all shadow-subtle ${
            showFilters || styleFilter !== 'all' || budgetFilter !== 'all' || roomTypeFilter !== 'all'
              ? 'bg-forest text-ivory border-forest'
              : 'bg-white text-charcoal border-beige hover:border-forest/40'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {(styleFilter !== 'all' || budgetFilter !== 'all' || roomTypeFilter !== 'all') && (
            <span className="w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center">
              {[styleFilter !== 'all', budgetFilter !== 'all', roomTypeFilter !== 'all'].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="p-5 rounded-2xl bg-white border border-beige shadow-subtle space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Style Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Aesthetic Style</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setStyleFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    styleFilter === 'all' ? 'bg-forest text-ivory' : 'bg-ivory border border-beige text-charcoal-muted hover:border-forest/40'
                  }`}
                >
                  All Styles
                </button>
                {ROOM_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyleFilter(s.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      styleFilter === s.id ? 'bg-forest text-ivory' : 'bg-ivory border border-beige text-charcoal-muted hover:border-forest/40'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Max Budget</label>
              <div className="flex flex-wrap gap-1.5">
                {BUDGET_FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBudgetFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      budgetFilter === opt.id ? 'bg-forest text-ivory' : 'bg-ivory border border-beige text-charcoal-muted hover:border-forest/40'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Room Type</label>
              <div className="flex flex-wrap gap-1.5">
                {ROOM_TYPE_FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setRoomTypeFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      roomTypeFilter === opt.id ? 'bg-forest text-ivory' : 'bg-ivory border border-beige text-charcoal-muted hover:border-forest/40'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-beige">
            <button
              onClick={() => {
                setStyleFilter('all');
                setBudgetFilter('all');
                setRoomTypeFilter('all');
              }}
              className="text-xs text-terracotta hover:underline font-medium"
            >
              Clear all filters
            </button>
            <span className="text-xs text-charcoal-muted font-medium">
              {filtered.length} space{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      )}

      {/* Curated Collections Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {CURATED_COLLECTIONS.map((coll) => (
          <button
            key={coll.id}
            onClick={() => setActiveCollection(coll.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCollection === coll.id
                ? 'bg-forest text-ivory border-forest shadow-sm'
                : 'bg-white text-charcoal-muted border-beige hover:border-forest/40 hover:text-charcoal'
            }`}
          >
            {coll.title}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-2xl font-display font-semibold text-charcoal-muted">No spaces found</p>
          <p className="text-sm text-charcoal-muted">Try adjusting your search or filters to discover more rooms.</p>
          <button
            onClick={() => { setSearchQuery(''); setStyleFilter('all'); setBudgetFilter('all'); setRoomTypeFilter('all'); setActiveCollection('all'); }}
            className="px-5 py-2 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="text-xs text-charcoal-muted font-medium">
            Showing {filtered.length} student space{filtered.length !== 1 ? 's' : ''}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <InspirationCard key={item.id} item={item} onOpenDetails={setDetailItem} />
            ))}
          </div>
        </>
      )}

      {/* Detail Modal */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-ivory rounded-3xl max-w-3xl w-full shadow-elevated border border-beige-dark overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative aspect-[16/9] bg-charcoal/10 flex-shrink-0">
              <img
                src={detailItem.imageUrl}
                alt={detailItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setDetailItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-charcoal/70 text-white hover:bg-charcoal backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-ivory/90 text-forest shadow-sm backdrop-blur-md">
                  {detailItem.styleName}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-forest text-ivory shadow-sm backdrop-blur-md">
                  {detailItem.budgetEstimate}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-forest">{detailItem.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  <span>{detailItem.author} • {detailItem.campusCity}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {detailItem.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-sage/50 text-forest border border-sage-dark">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => { handleReviveWithStyle(detailItem.style); setDetailItem(null); }}
                className="w-full py-3 rounded-full bg-forest text-ivory font-semibold text-sm hover:bg-forest-800 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-terracotta-light" />
                <span>Revive my room in {detailItem.styleName} style</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

