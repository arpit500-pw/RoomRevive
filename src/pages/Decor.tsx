import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Lightbulb, Info } from 'lucide-react';
import { BUDGET_DECOR_ITEMS } from '../data/decor';
import { ROOM_STYLES } from '../data/styles';
import { DecorCard } from '../components/decor/DecorCard';
import { RoomStyle } from '../types';
import { DemoBadge } from '../components/layout/DemoBadge';

const CATEGORIES = [
  'All',
  'Lighting',
  'Bedding',
  'Wall Decor',
  'Desk Setup',
  'Storage',
  'Plants',
  'Organization',
] as const;

type Category = (typeof CATEGORIES)[number];

const MAX_BUDGETS = [
  { label: 'Any Price', value: 999999 },
  { label: 'Under ₹300', value: 300 },
  { label: 'Under ₹500', value: 500 },
  { label: 'Under ₹600', value: 600 },
  { label: 'Under ₹1,000', value: 1000 },
];

export const Decor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initStyle = (searchParams.get('style') as RoomStyle | null) || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [styleFilter, setStyleFilter] = useState<RoomStyle | 'all'>(initStyle as any);
  const [maxBudget, setMaxBudget] = useState(999999);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let items = [...BUDGET_DECOR_ITEMS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.studentHack.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      items = items.filter((i) => i.category === activeCategory);
    }

    if (styleFilter !== 'all') {
      items = items.filter((i) => i.compatibleStyles.includes(styleFilter));
    }

    items = items.filter((i) => i.estimatedPrice <= maxBudget);

    return items;
  }, [searchQuery, activeCategory, styleFilter, maxBudget]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-beige">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Editorial Decor Shopping Guide
            </span>
            <DemoBadge />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest tracking-tight">
            Budget Decor Finds
          </h1>
          <p className="text-sm text-charcoal-muted max-w-xl">
            Handpicked lighting, bedding, plants, and desk accessories curated for college rooms with real student hacks and zero-drill installation.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-terracotta/10 border border-terracotta/20 text-xs text-charcoal space-y-1 max-w-xs">
          <div className="flex items-center gap-1.5 font-semibold text-terracotta">
            <Info className="w-3.5 h-3.5" />
            <span>Content Transparency</span>
          </div>
          <p className="text-charcoal-muted leading-relaxed">
            All prices shown are realistic estimates based on local Indian markets. No sponsored listings, affiliate links, or verified retailer pricing.
          </p>
        </div>
      </div>

      {/* Search + Filters Row */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lighting, bedding, plants, desk accessories..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-beige bg-white text-sm text-charcoal focus:outline-none focus:border-forest shadow-subtle"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all shadow-subtle ${
            showFilters || styleFilter !== 'all' || maxBudget !== 999999
              ? 'bg-forest text-ivory border-forest'
              : 'bg-white text-charcoal border-beige hover:border-forest/40'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="p-5 rounded-2xl bg-white border border-beige shadow-subtle space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Compatible style filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Room Aesthetic Match</label>
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

            {/* Max budget filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Maximum Item Price</label>
              <div className="flex flex-wrap gap-1.5">
                {MAX_BUDGETS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMaxBudget(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      maxBudget === opt.value ? 'bg-forest text-ivory' : 'bg-ivory border border-beige text-charcoal-muted hover:border-forest/40'
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
              onClick={() => { setStyleFilter('all'); setMaxBudget(999999); }}
              className="text-xs text-terracotta hover:underline font-medium"
            >
              Clear filters
            </button>
            <span className="text-xs text-charcoal-muted font-medium">
              {filtered.length} items match
            </span>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-forest text-ivory border-forest shadow-sm'
                : 'bg-white text-charcoal-muted border-beige hover:border-forest/40 hover:text-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Student Hack Banner */}
      <div className="p-4 rounded-2xl bg-sage/40 border border-sage-dark flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
        <div className="text-xs text-charcoal">
          <strong className="text-forest">Every item includes a zero-drill installation tip and a free DIY alternative.</strong>
          {' '}Click the "Hostel Hack" accordion on any card for a pocket-friendly workaround costing ₹0.
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-2xl font-display font-semibold text-charcoal-muted">No items found</p>
          <p className="text-sm text-charcoal-muted">Try adjusting your category, style filter, or budget range.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); setStyleFilter('all'); setMaxBudget(999999); }}
            className="px-5 py-2 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="text-xs text-charcoal-muted font-medium">
            {filtered.length} decor item{filtered.length !== 1 ? 's' : ''} in this guide
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <DecorCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

