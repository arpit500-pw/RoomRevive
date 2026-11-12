import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  Edit3,
  Check,
  Plus,
  ArrowRight,
  Filter,
  Sparkles,
  ExternalLink,
  StickyNote,
} from 'lucide-react';
import { useRoomStore } from '../store/roomStore';
import { MoodboardItem } from '../types';
import { formatINR } from '../utils/formatters';

export const Moodboard: React.FC = () => {
  const { moodboard, removeFromMoodboard, updateMoodboardNote } = useRoomStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'inspiration' | 'decor' | 'transformation'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const filteredItems = moodboard.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleStartEditing = (item: MoodboardItem) => {
    setEditingNoteId(item.id);
    setNoteDraft(item.notes || '');
  };

  const handleSaveNote = (id: string) => {
    updateMoodboardNote(id, noteDraft);
    setEditingNoteId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-beige">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest tracking-tight">
              Personal Moodboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-terracotta text-white">
              {moodboard.length} saved
            </span>
          </div>
          <p className="text-sm text-charcoal-muted mt-1">
            Your personal visual corkboard for bedroom inspiration, budget decor finds, and room makeovers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto bg-ivory-200 p-1.5 rounded-full border border-beige">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'inspiration', label: 'Spaces' },
            { id: 'decor', label: 'Decor Picks' },
            { id: 'transformation', label: 'Makeovers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-forest text-ivory shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Moodboard Content */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 px-4 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-sage/50 flex items-center justify-center text-forest mx-auto shadow-subtle">
            <Bookmark className="w-8 h-8 text-forest" />
          </div>
          <h3 className="font-display font-bold text-2xl text-forest">
            Your ideas deserve a space of their own.
          </h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Start pinning room concepts, ₹280 fairy lights, and aesthetic color palettes to curate your personal hostel transformation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors shadow-soft"
            >
              <span>Explore inspiration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/decor"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-forest text-xs font-semibold border border-beige hover:bg-ivory-200 transition-colors"
            >
              <span>Browse budget decor</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Pinterest-inspired rich Masonry column layout */
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group rounded-2xl bg-white border border-beige shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col relative"
            >
              {/* Image container */}
              <div className="relative overflow-hidden bg-charcoal/5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Type Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-ivory/95 text-forest backdrop-blur-md border border-beige shadow-sm">
                  {item.type}
                </span>

                {/* Delete button */}
                <button
                  onClick={() => removeFromMoodboard(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-charcoal/70 text-white/90 hover:bg-terracotta hover:text-white backdrop-blur-md transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  title="Remove from moodboard"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Price tag if present */}
                {item.price && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-forest text-ivory text-xs font-bold shadow-md">
                    {formatINR(item.price)}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <h4 className="font-display font-semibold text-base text-forest leading-snug">
                  {item.title}
                </h4>

                {/* Student Note */}
                <div className="pt-2 border-t border-beige/60">
                  {editingNoteId === item.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add a shopping reminder, roommate note, or DIY idea..."
                        rows={2}
                        className="w-full p-2 text-xs rounded-xl border border-forest bg-ivory/50 focus:outline-none"
                      />
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-charcoal-muted hover:bg-beige"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(item.id)}
                          className="px-3 py-1 rounded-lg text-[10px] font-semibold bg-forest text-white"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleStartEditing(item)}
                      className="group/note p-2 rounded-xl bg-ivory/70 hover:bg-sage/20 border border-beige/60 cursor-pointer transition-colors text-xs text-charcoal flex items-start justify-between gap-2"
                    >
                      <div className="flex items-start gap-1.5">
                        <StickyNote className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                        <span className={item.notes ? 'text-charcoal' : 'text-charcoal-muted italic'}>
                          {item.notes || 'Click to write a personal note...'}
                        </span>
                      </div>
                      <Edit3 className="w-3 h-3 text-charcoal-muted opacity-0 group-hover/note:opacity-100 shrink-0" />
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-charcoal-muted flex items-center justify-between pt-1">
                  <span>Pinned {item.addedAt}</span>
                  {item.style && <span className="capitalize">{item.style.replace('-', ' ')}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

