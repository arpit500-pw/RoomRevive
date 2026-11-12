import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useRoomStore } from '../store/roomStore';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { BudgetBreakdown } from '../components/room/BudgetBreakdown';
import { ColorPalette } from '../components/room/ColorPalette';
import { DecorCard } from '../components/decor/DecorCard';
import { Modal } from '../components/ui/Modal';
import { BUDGET_DECOR_ITEMS } from '../data/decor';
import { formatINR } from '../utils/formatters';

export const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTransformationById, savedTransformations, moodboard, addToMoodboard, removeFromMoodboard } = useRoomStore();

  const transformation = getTransformationById(id || '');

  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // If transformation not found, fallback to first saved
  const data = transformation || savedTransformations[0];

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-display font-bold text-2xl text-forest">Transformation Not Found</h2>
        <p className="text-sm text-charcoal-muted">
          We couldn't locate this specific room design. Try starting a new design in the studio.
        </p>
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory text-sm font-semibold"
        >
          <span>Open Revive Studio</span>
        </Link>
      </div>
    );
  }

  const isSavedInMoodboard = moodboard.some((m) => m.itemId === data.id);

  const handleToggleSaveToMoodboard = () => {
    if (isSavedInMoodboard) {
      removeFromMoodboard(data.id);
    } else {
      addToMoodboard({
        itemId: data.id,
        type: 'transformation',
        title: data.title,
        imageUrl: data.transformedImage,
        style: data.style,
        price: data.totalEstimatedCost,
        notes: `Makeover with est. cost ${formatINR(data.totalEstimatedCost)} (${data.styleName})`,
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadSummary = () => {
    // Generate text/json export for the student
    const summaryText = `ROOMREVIVE TRANSFORMATION
Design: ${data.title}
Style: ${data.styleName}
Estimated Cost: ${formatINR(data.totalEstimatedCost)}
Layout: ${data.keepLayout ? 'Preserved existing layout' : 'Reconfigured'}

Summary:
${data.summary}

Highlights:
${data.highlights.map((h) => `• ${h}`).join('\n')}

Budget Breakdown:
${data.budgetBreakdown.map((b) => `• ${b.name} (${b.category}): ₹${b.estimatedPrice} | Tip: ${b.diyTip || 'N/A'}`).join('\n')}

Generated at RoomRevive — Small spaces. Big transformations.`;

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RoomRevive-${data.styleName.replace(/\s+/g, '-')}-Makeover.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Matched recommended decor items
  const matchedDecor = BUDGET_DECOR_ITEMS.filter((item) =>
    item.compatibleStyles.includes(data.style)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Banner / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-beige">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sage/60 text-forest border border-forest/10">
              {data.styleName} Aesthetic
            </span>
            <span className="text-xs text-charcoal-muted">• Created {data.createdAt}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest tracking-tight">
            Look what your room could become.
          </h1>
          <p className="text-sm text-charcoal-muted">
            Your space, reimagined with zero-drill fixtures and realistic campus budgeting.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleToggleSaveToMoodboard}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              isSavedInMoodboard
                ? 'bg-forest text-ivory border-forest'
                : 'bg-white text-forest border-beige hover:border-forest/40 shadow-subtle'
            }`}
          >
            {isSavedInMoodboard ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Saved to Moodboard</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Moodboard</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadSummary}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-charcoal text-xs font-semibold border border-beige hover:border-forest/40 shadow-subtle transition-all"
            title="Download makeover specs & shopping list"
          >
            <Download className="w-3.5 h-3.5 text-forest" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Download Plan'}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-charcoal text-xs font-semibold border border-beige hover:border-forest/40 shadow-subtle transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-forest" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Design'}</span>
          </button>

          <Link
            to="/studio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Create Another</span>
          </Link>
        </div>
      </div>

      {/* ================= HERO TRANSFORMATION: INTERACTIVE SLIDER ================= */}
      <div className="space-y-3">
        <BeforeAfterSlider
          beforeImage={data.originalImage}
          afterImage={data.transformedImage}
          beforeLabel="YOUR CURRENT ROOM"
          afterLabel={`${data.styleName.toUpperCase()} MAKEUNDER`}
          aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
          onFullscreen={() => setIsFullscreenOpen(true)}
        />
        <div className="flex items-center justify-between text-xs text-charcoal-muted px-2">
          <span>* Drag the vertical slider to compare before and after.</span>
          <button
            onClick={() => setIsFullscreenOpen(true)}
            className="text-forest hover:underline flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Open fullscreen view</span>
          </button>
        </div>
      </div>

      {/* ================= RESULTS INFORMATION / KEY HIGHLIGHTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary & Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-white border border-beige p-6 shadow-subtle space-y-4">
            <h3 className="font-display font-semibold text-xl text-forest">
              Design Architecture & Transformation Summary
            </h3>
            <p className="text-sm text-charcoal leading-relaxed">
              {data.summary}
            </p>

            <div className="pt-2 border-t border-beige space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta block">
                Key Design Highlights
              </span>
              <ul className="space-y-2">
                {data.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Color Palette component */}
          <ColorPalette palette={data.colorPalette} />
        </div>

        {/* Right Column: Key Metrics & Constraints (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-forest text-ivory p-6 shadow-elevated space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-light">
                Budget Overview
              </span>
              <span className="text-xs bg-forest-800 px-2.5 py-1 rounded-full text-sage border border-forest-700">
                Target Cap: {formatINR(data.targetBudget)}
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-ivory">
                {formatINR(data.totalEstimatedCost)}
              </div>
              <p className="text-xs text-ivory/70 mt-1">
                Estimated total for all decor, lighting, and textiles combined.
              </p>
            </div>

            <div className="pt-3 border-t border-forest-700 text-xs text-ivory/80 space-y-2">
              <div className="flex items-center justify-between">
                <span>Room Classification:</span>
                <span className="font-semibold text-ivory capitalize">{data.roomType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Layout Preservation:</span>
                <span className="font-semibold text-sage">
                  {data.keepLayout ? '100% Structural Match' : 'Flexible'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Wall Drilling:</span>
                <span className="font-semibold text-terracotta-light">0 Nails • 100% Deposit Safe</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ivory-200 border border-beige text-xs text-charcoal space-y-2">
            <div className="flex items-center gap-2 font-semibold text-forest">
              <Info className="w-4 h-4 text-forest" />
              <span>Hostel Life Guarantee</span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              Every item in this concept can be packed into a single laundry bag or standard suitcase when
              shifting rooms at the end of the semester.
            </p>
          </div>
        </div>
      </div>

      {/* ================= ITEMISED BUDGET BREAKDOWN ================= */}
      <BudgetBreakdown
        items={data.budgetBreakdown}
        totalEstimatedCost={data.totalEstimatedCost}
        targetBudget={data.targetBudget}
      />

      {/* ================= RECOMMENDED DECOR COMPATIBLE WITH THIS STYLE ================= */}
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Affordable Catalog
            </span>
            <h3 className="font-display font-bold text-2xl text-forest">
              Matching Budget Decor Picks
            </h3>
            <p className="text-xs text-charcoal-muted">
              Add individual pieces directly to your moodboard or shopping list.
            </p>
          </div>

          <Link
            to={`/decor?style=${data.style}`}
            className="text-xs font-semibold text-forest hover:text-forest-800 underline"
          >
            View all {data.styleName} decor →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchedDecor.map((item) => (
            <DecorCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Fullscreen Comparison Modal */}
      <Modal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        title={`${data.title} • Fullscreen Comparison`}
        maxWidth="max-w-6xl"
      >
        <div className="space-y-4">
          <BeforeAfterSlider
            beforeImage={data.originalImage}
            afterImage={data.transformedImage}
            beforeLabel="ORIGINAL ROOM"
            afterLabel="REVIVED ROOM"
            aspectRatio="aspect-[16/9]"
          />
          <div className="text-center text-xs text-charcoal-muted">
            Drag the slider across to inspect subtle ambient lighting layers and spatial textures.
          </div>
        </div>
      </Modal>
    </div>
  );
};

