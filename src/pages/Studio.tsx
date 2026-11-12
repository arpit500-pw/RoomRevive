import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  X,
  Check,
  RefreshCw,
  Sliders,
  DollarSign,
  Shield,
  Layers,
  ArrowRight,
  Info,
  Lightbulb,
} from 'lucide-react';
import { useRoomStore } from '../store/roomStore';
import { ROOM_STYLES } from '../data/styles';
import { SAMPLE_ROOMS } from '../data/sampleRooms';
import { BUDGET_TIERS, formatINR } from '../utils/formatters';
import { DemoBadge } from '../components/layout/DemoBadge';
import { RoomStyle, BudgetTier, RoomType, RoomSize, SampleRoom } from '../types';

export const Studio: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    studio,
    setUploadedImage,
    setSelectedStyle,
    setBudgetTier,
    setCustomBudget,
    updatePreferences,
    generateMakeover,
  } = useRoomStore();

  const [activeTab, setActiveTab] = useState<'upload' | 'style' | 'budget' | 'preferences'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  // File handling
  const handleFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 15MB. Please upload a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleRoom) => {
    setUploadedImage(sample.originalImage, `${sample.name}.jpg`);
    setSelectedStyle(sample.recommendedStyle);
    setCustomBudget(sample.presetTargetBudget);
    setSampleModalOpen(false);
  };

  // Submission handler
  const handleGenerate = async () => {
    try {
      const generatedId = await generateMakeover();
      navigate(`/results/${generatedId}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong during generation. Please try again.');
    }
  };

  const currentStyleObj = ROOM_STYLES.find((s) => s.id === studio.selectedStyle) || ROOM_STYLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-beige">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest tracking-tight">
              Revive Studio
            </h1>
            <DemoBadge />
          </div>
          <p className="text-sm text-charcoal-muted mt-1">
            Reimagine your student space with architectural sensitivity & budget discipline.
          </p>
        </div>

        {/* Quick Stepper Bar */}
        <div className="flex items-center gap-2 bg-ivory-200 p-1.5 rounded-full border border-beige overflow-x-auto">
          {(['upload', 'style', 'budget', 'preferences'] as const).map((step, idx) => (
            <button
              key={step}
              onClick={() => setActiveTab(step)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                activeTab === step
                  ? 'bg-forest text-ivory shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <span className="opacity-70 mr-1.5">{idx + 1}.</span>
              {step}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas/Preview & Right Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: ROOM PREVIEW / UPLOAD (5 cols) ================= */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-beige p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-lg text-forest">
                Your Room Canvas
              </h3>
              {studio.uploadedImage && (
                <button
                  onClick={() => setUploadedImage(null)}
                  className="text-xs text-terracotta hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove photo</span>
                </button>
              )}
            </div>

            {/* Upload Area / Image Preview */}
            {studio.uploadedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-beige shadow-inner bg-charcoal/5 aspect-[4/3] group">
                <img
                  src={studio.uploadedImage}
                  alt="Uploaded Room Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-full bg-white text-forest text-xs font-semibold shadow-md hover:bg-ivory"
                  >
                    Replace Photo
                  </button>
                  <button
                    onClick={() => setSampleModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-forest text-white text-xs font-semibold shadow-md hover:bg-forest-800"
                  >
                    Change Sample
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-charcoal/80 text-white text-[11px] font-medium backdrop-blur-md">
                  {studio.uploadedFileName || 'Ready for makeover'}
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[300px] ${
                  dragOver
                    ? 'border-forest bg-sage/20'
                    : 'border-beige-dark hover:border-forest/50 bg-ivory/50 hover:bg-ivory'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                <div className="w-14 h-14 rounded-2xl bg-sage/60 flex items-center justify-center text-forest mb-4 shadow-subtle">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <h4 className="font-display font-semibold text-lg text-forest mb-1">
                  Upload your room photo
                </h4>
                <p className="text-xs text-charcoal-muted max-w-xs mb-4">
                  Drag and drop JPG, PNG, or WebP up to 15MB. Best results from doorway or corner angle.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span className="px-4 py-2 rounded-full bg-forest text-ivory text-xs font-semibold">
                    Browse Files
                  </span>
                  <span className="text-xs text-charcoal-muted">or</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSampleModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-full bg-white text-terracotta border border-terracotta/30 text-xs font-semibold hover:bg-terracotta/5"
                  >
                    Try a sample room
                  </button>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/20 text-xs text-terracotta font-medium">
                {errorMsg}
              </div>
            )}

            {/* Quick Summary Pill Bar */}
            <div className="pt-2 border-t border-beige text-xs text-charcoal-muted space-y-2">
              <div className="flex items-center justify-between">
                <span>Selected Aesthetic:</span>
                <span className="font-semibold text-forest">{currentStyleObj.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Target Budget Cap:</span>
                <span className="font-semibold text-forest">{formatINR(studio.customBudget)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Room Type:</span>
                <span className="font-semibold text-forest capitalize">{studio.preferences.roomType}</span>
              </div>
            </div>
          </div>

          {/* Tips card */}
          <div className="p-5 rounded-2xl bg-sage/30 border border-sage-dark text-xs text-charcoal space-y-2">
            <div className="flex items-center gap-2 font-semibold text-forest">
              <Lightbulb className="w-4 h-4 text-terracotta" />
              <span>Hostel Photography Tip</span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              Stand in the doorway or corner of your room during daylight. Keep your bed and study desk in the same frame for the most accurate spatial layout.
            </p>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE SETTINGS (7 cols) ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: UPLOAD & SAMPLE ROOMS (shown in tab or quick view) */}
          {activeTab === 'upload' && (
            <div className="rounded-3xl bg-white border border-beige p-6 shadow-subtle space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  Step 1 of 4
                </span>
                <h3 className="font-display font-semibold text-2xl text-forest">
                  Let's start with your space.
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Show us your room. We'll help you imagine what it could become without violating hostel rules.
                </p>
              </div>

              {/* Sample Room Cards */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-charcoal block">
                  Or select a common college room layout to experiment:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SAMPLE_ROOMS.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className="group p-3 rounded-2xl border border-beige hover:border-forest cursor-pointer transition-all bg-ivory/40 hover:bg-white text-left space-y-2"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-charcoal/5">
                        <img
                          src={sample.originalImage}
                          alt={sample.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h5 className="font-semibold text-xs text-forest truncate">{sample.name}</h5>
                        <p className="text-[10px] text-charcoal-muted line-clamp-1">{sample.roomType}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('style')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
                >
                  <span>Continue to Aesthetic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE A STYLE */}
          {activeTab === 'style' && (
            <div className="rounded-3xl bg-white border border-beige p-6 shadow-subtle space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  Step 2 of 4
                </span>
                <h3 className="font-display font-semibold text-2xl text-forest">
                  Choose your room aesthetic
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Every aesthetic is tuned specifically for college rooms using accessible fabrics and warm ambient lights.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROOM_STYLES.map((style) => {
                  const isSelected = studio.selectedStyle === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`group p-2 rounded-2xl border cursor-pointer transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'border-forest ring-2 ring-forest/30 bg-sage/20 shadow-sm'
                          : 'border-beige hover:border-forest/40 bg-white'
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal/5 mb-2">
                        <img
                          src={style.imageUrl}
                          alt={style.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-display font-semibold text-xs text-forest block truncate">
                          {style.name}
                        </span>
                        <span className="text-[10px] text-charcoal-muted line-clamp-1">
                          {style.vibe.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-beige">
                <button
                  onClick={() => setActiveTab('upload')}
                  className="text-xs font-medium text-charcoal-muted hover:text-charcoal"
                >
                  ← Back to Photo
                </button>
                <button
                  onClick={() => setActiveTab('budget')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
                >
                  <span>Continue to Budget</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET */}
          {activeTab === 'budget' && (
            <div className="rounded-3xl bg-white border border-beige p-6 shadow-subtle space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  Step 3 of 4
                </span>
                <h3 className="font-display font-semibold text-2xl text-forest">
                  What's your makeover budget?
                </h3>
                <p className="text-xs text-charcoal-muted">
                  We calculate itemized estimates in Indian Rupees (₹) so you don't overspend a single rupee.
                </p>
              </div>

              {/* Preset Budget Tier Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = studio.budgetTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-forest bg-sage/20 ring-2 ring-forest/30 shadow-sm'
                          : 'border-beige hover:border-forest/40 bg-ivory/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-forest">
                          {tier.label}
                        </span>
                        <span className="text-[10px] font-mono text-charcoal-muted">
                          {tier.range}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal-muted leading-snug">
                        {tier.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Custom Budget Input */}
              <div className="pt-4 border-t border-beige space-y-2">
                <label className="text-xs font-semibold text-charcoal flex items-center justify-between">
                  <span>Or enter custom maximum budget cap:</span>
                  <span className="font-bold text-forest">{formatINR(studio.customBudget)}</span>
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-charcoal-muted">₹</span>
                  <input
                    type="range"
                    min={400}
                    max={10000}
                    step={100}
                    value={studio.customBudget}
                    onChange={(e) => setCustomBudget(Number(e.target.value))}
                    className="w-full accent-forest cursor-pointer"
                  />
                  <input
                    type="number"
                    min={300}
                    max={25000}
                    value={studio.customBudget}
                    onChange={(e) => setCustomBudget(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 rounded-xl border border-beige text-xs font-bold text-forest focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-beige">
                <button
                  onClick={() => setActiveTab('style')}
                  className="text-xs font-medium text-charcoal-muted hover:text-charcoal"
                >
                  ← Back to Aesthetic
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
                >
                  <span>Continue to Preferences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ROOM PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="rounded-3xl bg-white border border-beige p-6 shadow-subtle space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  Step 4 of 4
                </span>
                <h3 className="font-display font-semibold text-2xl text-forest">
                  Room constraints & preferences
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Ensure the redesign respects fixed hostel beds, landlord rules, and personal storage needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Room Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal">Living Arrangement</label>
                  <select
                    value={studio.preferences.roomType}
                    onChange={(e) => updatePreferences({ roomType: e.target.value as RoomType })}
                    className="w-full px-3 py-2 rounded-xl border border-beige text-xs text-charcoal bg-ivory/50 focus:outline-none focus:border-forest"
                  >
                    <option value="hostel">College Hostel (Single / Shared)</option>
                    <option value="pg">Paying Guest (PG Accommodation)</option>
                    <option value="dorm">University Campus Dormitory</option>
                    <option value="rented">Small Rented Studio / 1RK</option>
                  </select>
                </div>

                {/* Room Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal">Room Footprint</label>
                  <select
                    value={studio.preferences.roomSize}
                    onChange={(e) => updatePreferences({ roomSize: e.target.value as RoomSize })}
                    className="w-full px-3 py-2 rounded-xl border border-beige text-xs text-charcoal bg-ivory/50 focus:outline-none focus:border-forest"
                  >
                    <option value="small">Compact (under 100 sq ft)</option>
                    <option value="medium">Standard (100–160 sq ft)</option>
                    <option value="large">Spacious (160+ sq ft)</option>
                  </select>
                </div>
              </div>

              {/* Color preference */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal">Color Preference / Palette Mood</label>
                <input
                  type="text"
                  value={studio.preferences.colorPreference}
                  onChange={(e) => updatePreferences({ colorPreference: e.target.value })}
                  placeholder="e.g. Warm amber glow, earthy terracotta & sage"
                  className="w-full px-3.5 py-2 rounded-xl border border-beige text-xs text-charcoal bg-ivory/50 focus:outline-none focus:border-forest"
                />
              </div>

              {/* Mandatory checkbox requirement: Keep layout */}
              <div className="p-3.5 rounded-2xl bg-sage/40 border border-sage-dark flex items-start gap-3">
                <input
                  type="checkbox"
                  id="keepLayout"
                  checked={studio.preferences.keepLayout}
                  onChange={(e) => updatePreferences({ keepLayout: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-forest accent-forest"
                />
                <label htmlFor="keepLayout" className="text-xs text-charcoal cursor-pointer">
                  <strong>Keep the existing room layout as much as possible.</strong>
                  <span className="block text-charcoal-muted mt-0.5">
                    Preserves original bed orientation, window position, doors, and fixed study desks.
                  </span>
                </label>
              </div>

              {/* Landlord Restrictions */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal">
                  Landlord / Hostel Strict Rules
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Zero wall nails / drilling',
                    'Fixed metal bed cannot move',
                    'Regular warden inspection',
                    'No open candle flames',
                    'Must fit in suitcase at year-end',
                  ].map((rule) => {
                    const isChecked = studio.preferences.permanentRestrictions.includes(rule);
                    return (
                      <button
                        key={rule}
                        type="button"
                        onClick={() => {
                          const updated = isChecked
                            ? studio.preferences.permanentRestrictions.filter((r) => r !== rule)
                            : [...studio.preferences.permanentRestrictions, rule];
                          updatePreferences({ permanentRestrictions: updated });
                        }}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                          isChecked
                            ? 'bg-forest text-ivory border border-forest'
                            : 'bg-ivory border border-beige text-charcoal-muted hover:border-forest/40'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 inline mr-1" />}
                        {rule}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-beige">
                <button
                  onClick={() => setActiveTab('budget')}
                  className="text-xs font-medium text-charcoal-muted hover:text-charcoal"
                >
                  ← Back to Budget
                </button>
                <span className="text-xs text-forest font-semibold">Ready to generate!</span>
              </div>
            </div>
          )}

          {/* ================= PRIMARY GENERATE ACTION ================= */}
          <div className="rounded-3xl bg-forest text-ivory p-6 shadow-elevated space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-semibold text-lg text-ivory">
                  Ready to Revive Your Space
                </h4>
                <p className="text-xs text-ivory/80">
                  Target budget cap: {formatINR(studio.customBudget)} • {currentStyleObj.name}
                </p>
              </div>
              <Sparkles className="w-6 h-6 text-terracotta-light" />
            </div>

            {studio.isGenerating ? (
              <div className="space-y-3 py-2">
                <div className="w-full bg-forest-900 rounded-full h-2 overflow-hidden border border-white/20">
                  <div
                    className="bg-terracotta h-full transition-all duration-300"
                    style={{ width: `${studio.generationProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-ivory/80 font-mono">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-terracotta-light" />
                    {studio.generationStepMessage}
                  </span>
                  <span>{studio.generationProgress}%</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm tracking-wide shadow-soft transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Generate my makeover</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            <p className="text-[11px] text-ivory/60 text-center">
              Runs in local instant mode • Preserves spatial layout • Zero subscription or API keys
            </p>
          </div>
        </div>
      </div>

      {/* Sample Rooms Selector Modal */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-ivory rounded-3xl max-w-2xl w-full p-6 shadow-elevated border border-beige-dark space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-forest">
                  Choose a Sample Room
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Experiment immediately without taking a photo right now.
                </p>
              </div>
              <button
                onClick={() => setSampleModalOpen(false)}
                className="p-1 rounded-full text-charcoal hover:bg-beige"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SAMPLE_ROOMS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="rounded-2xl border border-beige bg-white p-3 hover:border-forest cursor-pointer transition-all hover:shadow-soft text-left space-y-2 group"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-charcoal/5">
                    <img
                      src={sample.originalImage}
                      alt={sample.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-semibold text-xs text-forest">{sample.name}</h4>
                  <p className="text-[11px] text-charcoal-muted leading-tight">
                    {sample.description}
                  </p>
                  <div className="pt-1 text-[10px] font-bold text-terracotta">
                    Target: ₹{sample.presetTargetBudget}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

