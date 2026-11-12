import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Bookmark, Compass, Lamp, Menu, X, ArrowUpRight, Home } from 'lucide-react';
import { useRoomStore } from '../../store/roomStore';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const moodboard = useRoomStore((state) => state.moodboard);
  const savedTransformations = useRoomStore((state) => state.savedTransformations);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Budget Decor', path: '/decor', icon: Lamp },
    { label: 'Moodboard', path: '/moodboard', icon: Bookmark, badge: moodboard.length },
    { label: 'My Room', path: '/my-room', icon: Home, badge: savedTransformations.length },
    { label: 'About', path: '/about', icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/95 backdrop-blur-md border-b border-beige transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest">
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-ivory shadow-subtle group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-terracotta-light" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-2xl tracking-tight text-forest">
                RoomRevive
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-sage/60 text-forest border border-forest/10 hidden sm:inline-block">
                Hostel Edition
              </span>
            </div>
            <p className="text-[11px] text-charcoal-muted tracking-tight -mt-0.5 hidden sm:block">
              Small spaces. Big transformations.
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors flex items-center gap-1.5 py-2 ${
                  active ? 'text-forest font-semibold' : 'text-charcoal hover:text-forest'
                }`}
              >
                {link.label}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-terracotta text-white">
                    {link.badge}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/studio"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forest text-ivory text-sm font-semibold tracking-wide shadow-soft hover:bg-forest-800 hover:shadow-elevated transition-all active:scale-[0.98] border border-forest-700"
          >
            <span>Revive my room</span>
            <ArrowUpRight className="w-4 h-4 text-terracotta-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/studio"
            className="px-3 py-1.5 rounded-full bg-forest text-ivory text-xs font-semibold"
          >
            Revive Room
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-charcoal hover:text-forest hover:bg-beige/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-beige bg-ivory px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-sage/40 text-forest font-semibold'
                    : 'text-charcoal hover:bg-beige/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon && <link.icon className="w-5 h-5 text-forest/70" />}
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-terracotta text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-beige">
            <Link
              to="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-forest text-ivory text-sm font-semibold tracking-wide shadow-md"
            >
              <span>Revive my room</span>
              <ArrowUpRight className="w-4 h-4 text-terracotta-light" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

