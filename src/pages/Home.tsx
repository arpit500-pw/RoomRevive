import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  Palette,
  CheckCircle2,
  Bookmark,
  Layers,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { StyleCard } from '../components/ui/StyleCard';
import { InspirationCard } from '../components/inspiration/InspirationCard';
import { DemoBadge } from '../components/layout/DemoBadge';
import { ROOM_STYLES } from '../data/styles';
import { INSPIRATIONS } from '../data/inspirations';
import { SAMPLE_TRANSFORMATIONS } from '../data/transformations';
import { BUDGET_TIERS } from '../utils/formatters';
import { useRoomStore } from '../store/roomStore';
import { StyleOption } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedStyle = useRoomStore((state) => state.setSelectedStyle);
  const setBudgetTier = useRoomStore((state) => state.setBudgetTier);

  // Active before/after sample in Section A
  const [activeTransformationIdx, setActiveTransformationIdx] = useState(0);
  const activeTransformation = SAMPLE_TRANSFORMATIONS[activeTransformationIdx];

  const handleSelectStyle = (style: StyleOption) => {
    setSelectedStyle(style.id);
    navigate('/studio');
  };

  const handleSelectBudget = (tierId: any) => {
    setBudgetTier(tierId);
    navigate('/studio');
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-24 overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-sage/60 text-forest border border-forest/15">
                YOUR ROOM. YOUR RESET.
              </span>
              <DemoBadge />
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-forest tracking-tight leading-[1.08]">
              Your room deserves <br className="hidden sm:inline" />
              a little more{' '}
              <span className="italic font-normal text-terracotta underline decoration-terracotta/30 decoration-wavy underline-offset-8">
                you.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed">
              Transform your hostel room into a space you actually love — without spending a fortune.
              Designed specifically for college dorms, PGs, and compact rented rooms.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/studio"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-forest text-ivory font-semibold text-sm tracking-wide shadow-soft hover:bg-forest-800 hover:shadow-elevated transition-all active:scale-[0.98]"
              >
                <span>Revive my room</span>
                <Sparkles className="w-4 h-4 text-terracotta-light group-hover:rotate-12 transition-transform" />
              </Link>

              <a
                href="#styles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-forest font-semibold text-sm border border-beige-dark hover:bg-ivory-200 transition-colors shadow-subtle"
              >
                <span>Explore room styles</span>
                <ArrowRight className="w-4 h-4 text-forest/70" />
              </a>
            </div>

            {/* Micro trust pills */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-charcoal-muted border-t border-beige">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Zero wall drilling required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Designed for budgets ₹500–₹5,000</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Preserves existing layout</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Backing aesthetic shape */}
              <div className="absolute -top-6 -left-6 w-72 h-72 rounded-full bg-sage/40 blur-3xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-72 h-72 rounded-full bg-beige/60 blur-3xl -z-10" />

              {/* Main Editorial Image */}
              <div className="relative rounded-3xl overflow-hidden border border-beige shadow-elevated bg-white">
                <img
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
                  alt="Cozy aesthetic student hostel bedroom with warm lighting"
                  className="w-full aspect-[4/3] object-cover"
                />

                {/* Floating Transformation Badge (Top Left) */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-beige shadow-lg max-w-[210px] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-forest">
                    <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                    <span>Hostel Makeover</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted leading-tight">
                    Double-sharing room turned warm hygge sanctuary
                  </p>
                </div>

                {/* Floating Budget Pill (Bottom Right) */}
                <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-forest text-ivory text-xs font-semibold shadow-elevated flex items-center gap-2 border border-forest-700">
                  <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                  <span>Total Makeover: ₹2,240</span>
                </div>
              </div>

              {/* Overlapping small accent card */}
              <div className="hidden sm:flex absolute -bottom-8 -left-6 p-4 rounded-2xl bg-ivory border border-beige shadow-soft items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-terracotta/20 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-5 h-5 text-terracotta" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-charcoal block">Under ₹1,500 Tier</span>
                  <span className="text-charcoal-muted">Fairy lights + waffle throw + zero-drill art</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION A — BEFORE AND AFTER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
            The Transformation Proof
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
            Same room. Different reality.
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base">
            Drag the slider to reveal how lighting, student-friendly textiles, and thoughtful decor
            completely reshape ordinary hostel architecture without touching a single brick.
          </p>

          {/* Sample Switcher Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_TRANSFORMATIONS.map((sample, idx) => (
              <button
                key={sample.id}
                onClick={() => setActiveTransformationIdx(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTransformationIdx === idx
                    ? 'bg-forest text-ivory shadow-sm'
                    : 'bg-white text-charcoal-muted hover:text-forest border border-beige hover:border-forest/30'
                }`}
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Working Draggable Slider */}
        <div className="max-w-5xl mx-auto">
          <BeforeAfterSlider
            beforeImage={activeTransformation.originalImage}
            afterImage={activeTransformation.transformedImage}
            beforeLabel="ORIGINAL HOSTEL ROOM"
            afterLabel={`${activeTransformation.styleName.toUpperCase()} REVIVAL`}
            aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
          />

          {/* Transformation Meta Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-white border border-beige shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-semibold text-base text-forest">
                {activeTransformation.title}
              </h4>
              <p className="text-xs text-charcoal-muted max-w-xl mt-0.5">
                {activeTransformation.summary}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[11px] text-charcoal-muted block">Estimated Spend</span>
                <span className="font-display font-bold text-lg text-forest">
                  ₹{activeTransformation.totalEstimatedCost.toLocaleString('en-IN')}
                </span>
              </div>
              <Link
                to={`/results/${activeTransformation.id}`}
                className="px-4 py-2 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                View Breakdown
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION B — START WITH YOUR VIBE ================= */}
      <section id="styles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Find Your Aesthetic
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
              What does your room feel like?
            </h2>
            <p className="text-charcoal-muted text-sm max-w-lg">
              Select an interior style below to jump into Revive Studio with that vibe pre-loaded.
            </p>
          </div>

          <Link
            to="/studio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-800 transition-colors group"
          >
            <span>Open Studio with custom settings</span>
            <ArrowRight className="w-4 h-4 text-forest group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Style Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOM_STYLES.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              onSelect={handleSelectStyle}
            />
          ))}
        </div>
      </section>

      {/* ================= SECTION C — THE STUDENT BUDGET ADVANTAGE ================= */}
      <section className="bg-ivory-200 py-16 border-y border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Realistic Campus Budgets
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
              Good taste. Small budget.
            </h2>
            <p className="text-charcoal-muted text-sm sm:text-base">
              You don’t need an architect’s fee or expensive mahogany. Every design is engineered
              around zero-drill hacks and thrifted decor accessible across Indian college towns.
            </p>
          </div>

          {/* Budget Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUDGET_TIERS.slice(0, 4).map((tier) => (
              <div
                key={tier.id}
                onClick={() => handleSelectBudget(tier.id)}
                className="group rounded-2xl bg-white border border-beige p-6 shadow-subtle hover:shadow-elevated hover:border-forest/40 transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sage/50 text-forest">
                      {tier.label}
                    </span>
                    <span className="text-[11px] font-mono text-charcoal-muted">
                      {tier.range}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-xl text-forest group-hover:text-forest-800 transition-colors">
                    {tier.popularFor}
                  </h3>

                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-beige flex items-center justify-between text-xs font-semibold text-forest">
                  <span>Revive in this budget</span>
                  <ArrowRight className="w-4 h-4 text-forest group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION D — STUDENT ROOM GALLERY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Real Campus Spaces
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
              Real rooms. Real inspiration.
            </h2>
            <p className="text-charcoal-muted text-sm max-w-lg">
              Curated student transformations from IIT Bombay, Delhi University, Christ, Manipal, and beyond.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-800 transition-colors group"
          >
            <span>Browse all student spaces</span>
            <ArrowRight className="w-4 h-4 text-forest group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSPIRATIONS.slice(0, 6).map((item) => (
            <InspirationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ================= SECTION E — HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-forest text-ivory p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-elevated">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-forest-800/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-light">
                The 3-Step Journey
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory">
                How RoomRevive Works
              </h2>
              <p className="text-ivory/80 text-sm">
                No complex CAD software or technical jargon. Three simple steps to imagine what your space could become.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-terracotta flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <h3 className="font-display font-semibold text-xl text-ivory">
                  Upload your room
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Snap a quick photo of your hostel, PG, or dorm room from the doorway. Or try one of our pre-loaded sample rooms.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-forest-200 text-forest font-bold text-lg">
                  2
                </div>
                <h3 className="font-display font-semibold text-xl text-ivory">
                  Choose your vibe & budget
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Pick from 8 student-tested aesthetics and specify your budget cap from ₹500 to ₹5,000+.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-sage text-forest font-bold text-lg">
                  3
                </div>
                <h3 className="font-display font-semibold text-xl text-ivory">
                  Revive your space
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Get a complete transformation with interactive before/after comparison, color palette, and itemized budget checklist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION F — FINAL CTA ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
          Ready for your reset?
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-forest tracking-tight">
          Your next favourite place is your room.
        </h2>
        <p className="text-charcoal-muted text-base max-w-xl mx-auto leading-relaxed">
          Stop staring at boring concrete walls. Spend 60 seconds with RoomRevive and see what your space
          is capable of holding.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/studio"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-forest text-ivory font-semibold text-base shadow-soft hover:bg-forest-800 hover:shadow-elevated transition-all"
          >
            <span>Let's revive it</span>
            <Sparkles className="w-5 h-5 text-terracotta-light group-hover:rotate-12 transition-transform" />
          </Link>
          <Link
            to="/decor"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-charcoal font-semibold text-base border border-beige-dark hover:bg-ivory-200 transition-colors shadow-subtle"
          >
            <span>Browse ₹500 Decor Hacks</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

