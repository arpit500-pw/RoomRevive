import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ivory-200 border-t border-beige pt-16 pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-beige-dark">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest flex items-center justify-center text-ivory">
                <Sparkles className="w-5 h-5 text-terracotta-light" />
              </div>
              <span className="font-display font-bold text-2xl text-forest tracking-tight">
                RoomRevive
              </span>
            </Link>
            <p className="text-sm text-charcoal-muted max-w-sm leading-relaxed">
              Designed specifically for students navigating hostels, PGs, dorms, and compact rented rooms.
              Transforming utilitarian concrete into warm, personal sanctuaries on a student budget.
            </p>
            <div className="flex items-center gap-2 text-xs text-charcoal-faint pt-2">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>100% Private • Local Browser Storage • Zero Cloud Image Leakage</span>
            </div>
          </div>

          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Discover
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore" className="hover:text-forest transition-colors">
                  Student Room Gallery
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=under-1500" className="hover:text-forest transition-colors">
                  Under ₹1,500 Makeovers
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=tiny-room" className="hover:text-forest transition-colors">
                  Tiny Room, Big Energy
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=dark-academia" className="hover:text-forest transition-colors">
                  Dark Academia Dreams
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio & Decor */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Tools & Shopping
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/studio" className="hover:text-forest transition-colors">
                  Revive Studio Workspace
                </Link>
              </li>
              <li>
                <Link to="/decor" className="hover:text-forest transition-colors">
                  Budget Decor Guide
                </Link>
              </li>
              <li>
                <Link to="/moodboard" className="hover:text-forest transition-colors">
                  Personal Moodboard
                </Link>
              </li>
              <li>
                <Link to="/my-room" className="hover:text-forest transition-colors">
                  Saved Transformations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Ethos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Hostel Life
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-forest transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <span className="text-charcoal-muted flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-terracotta" />
                  Landlord-Proof DIY
                </span>
              </li>
              <li className="pt-2">
                <div className="p-3 rounded-xl bg-sage/50 border border-sage-dark text-xs text-forest-800 leading-snug">
                  <strong>Student Rule:</strong> Never drill holes. Use 3M command hooks, Blu-Tack, and tension rods to safeguard your security deposit!
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted gap-4">
          <p>© {new Date().getFullYear()} RoomRevive. “Same room. Different reality.”</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta inline" />
            <span>for hostelers across campuses everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

