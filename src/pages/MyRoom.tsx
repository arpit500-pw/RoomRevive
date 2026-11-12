import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Trash2,
  ExternalLink,
  Layers,
  Calendar,
  CheckCircle,
  IndianRupee,
  Home as HomeIcon,
} from 'lucide-react';
import { useRoomStore } from '../store/roomStore';
import { formatINR } from '../utils/formatters';

export const MyRoom: React.FC = () => {
  const navigate = useNavigate();
  const { savedTransformations, deleteTransformation, setSelectedStyle } = useRoomStore();

  const handleOpenStudioWithStyle = (style: any) => {
    setSelectedStyle(style);
    navigate('/studio');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-beige">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest tracking-tight">
            My Room Projects
          </h1>
          <p className="text-sm text-charcoal-muted mt-1">
            Revisit, compare, and implement your saved room transformations.
          </p>
        </div>

        <Link
          to="/studio"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors shadow-soft self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-terracotta-light" />
          <span>New Room Makeover</span>
        </Link>
      </div>

      {/* Grid of Saved Transformations */}
      {savedTransformations.length === 0 ? (
        <div className="text-center py-20 px-4 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-sage/50 flex items-center justify-center text-forest mx-auto">
            <HomeIcon className="w-8 h-8 text-forest" />
          </div>
          <h3 className="font-display font-bold text-2xl text-forest">
            No transformations yet
          </h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Ready to give your hostel room a reset? Head to the studio to upload a photo and imagine your new space.
          </p>
          <div className="pt-2">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
            >
              <span>Launch Revive Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTransformations.map((trans) => (
            <div
              key={trans.id}
              className="group rounded-3xl bg-white border border-beige hover:border-forest/40 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Dual Before / After Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal/5">
                <img
                  src={trans.transformedImage}
                  alt={trans.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Corner inset for before photo */}
                <div className="absolute bottom-3 left-3 w-20 h-14 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={trans.originalImage}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-charcoal/80 text-[8px] font-bold text-center text-white py-0.5">
                    Before
                  </span>
                </div>

                {/* Style badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-ivory/90 text-forest backdrop-blur-md border border-beige shadow-sm">
                  {trans.styleName}
                </span>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTransformation(trans.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-charcoal/60 hover:bg-terracotta text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  title="Delete design"
                  aria-label="Delete transformation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{trans.createdAt}</span>
                    </span>
                    <span className="capitalize font-medium text-charcoal">
                      {trans.roomType} • {trans.roomSize}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-forest group-hover:text-forest-800 transition-colors">
                    {trans.title}
                  </h3>

                  <p className="text-xs text-charcoal-muted line-clamp-2 mt-1 leading-relaxed">
                    {trans.summary}
                  </p>
                </div>

                {/* Budget & highlights */}
                <div className="pt-3 border-t border-beige/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-charcoal-muted">Estimated Spend:</span>
                    <span className="font-display font-bold text-forest text-base">
                      {formatINR(trans.totalEstimatedCost)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      to={`/results/${trans.id}`}
                      className="flex-1 py-2 px-4 rounded-full bg-forest text-ivory text-xs font-semibold text-center hover:bg-forest-800 transition-colors shadow-sm"
                    >
                      View Specs & Breakdown
                    </Link>
                    <button
                      onClick={() => handleOpenStudioWithStyle(trans.style)}
                      className="p-2 rounded-full border border-beige hover:border-forest/40 text-charcoal hover:text-forest transition-colors"
                      title="Tweak in Studio"
                    >
                      <Sparkles className="w-4 h-4 text-terracotta" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

