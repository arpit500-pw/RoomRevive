import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  IndianRupee,
  Layers,
  Shield,
  Users,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { label: 'Design Aesthetics', value: '8' },
    { label: 'Budget Range', value: '₹500–₹5,000' },
    { label: 'Campuses Represented', value: '100+' },
    { label: 'Deposit-Safe Rule', value: '100%' },
  ];

  const values = [
    {
      icon: IndianRupee,
      title: 'Budget-First Philosophy',
      description:
        'Every design decision starts with the question: "Can a first-year student on a scholarship afford this?" We set hard budget caps and reject any suggestion that cannot survive campus life.',
    },
    {
      icon: Shield,
      title: 'Landlord-Proof by Default',
      description:
        'Zero nail-holes. Zero paint damage. 100% security deposit protection. Every transformation uses only adhesive strips, tension rods, and removable fixtures that pack into a single suitcase.',
    },
    {
      icon: Layers,
      title: 'Architecturally Sensitive',
      description:
        'Your hostel bed cannot move. The window is fixed. The door swings the same way. We preserve structural reality while reimagining how lighting, textiles, and decor make the space feel entirely new.',
    },
    {
      icon: Users,
      title: 'Student-First, Always',
      description:
        'Built by and for people who understand what it means to live for 11 months in a 100 sq ft concrete room. Every recommendation passes the "can I carry this home at year-end?" test.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
      {/* Hero Statement */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-terracotta-light" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
            Our Story & Philosophy
          </span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-forest tracking-tight leading-[1.1]">
          Small spaces can hold{' '}
          <span className="italic font-normal text-terracotta">big personalities.</span>
        </h1>

        <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
          Students spend a significant part of their most formative years in hostel rooms — yet these spaces often feel generic, temporary, and entirely impersonal. RoomRevive was created to change that.
        </p>
      </section>

      {/* Stats Banner */}
      <section className="rounded-3xl bg-forest text-ivory p-8 sm:p-12 shadow-elevated">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="font-display font-bold text-3xl sm:text-4xl text-ivory">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-ivory/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
            Our Mission
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest leading-tight">
            Making your room feel like home — without breaking the deposit.
          </h2>
          <div className="space-y-4 text-sm text-charcoal leading-relaxed">
            <p>
              When you move into a hostel, you're handed a room designed for maximum institutional durability, not human comfort. White walls, fluorescent tubes, an iron bed, and a laminate desk. That's it.
            </p>
            <p>
              But we believe the spaces we inhabit shape how we think, rest, and create. A well-considered room isn't a luxury — it's a tool for becoming more you.
            </p>
            <p>
              RoomRevive is a free, entirely local tool that helps you visualize what your hostel room could look like with thoughtful, affordable changes. No architect required. No rental agreement violated.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              'No API keys required — works completely offline',
              'No backend — your room photos never leave your browser',
              'No pretending — we don\'t fake AI-generated images',
              'No overpriced products — everything works under ₹5,000',
            ].map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-sm text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Photo */}
        <div className="relative">
          <div className="absolute -top-6 -right-6 w-64 h-64 rounded-full bg-sage/50 blur-3xl -z-10" />
          <div className="rounded-3xl overflow-hidden border border-beige shadow-elevated aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
              alt="Beautifully designed minimal student room"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white border border-beige shadow-elevated max-w-xs space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
              Before → After
            </div>
            <p className="text-xs text-charcoal">
              Manipal PG single room transformed into Japandi sanctuary for under ₹3,200.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
            Design Philosophy
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
            The four student-first principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="p-6 rounded-2xl bg-white border border-beige shadow-subtle hover:shadow-elevated hover:border-forest/30 transition-all space-y-4">
                <div className="w-11 h-11 rounded-xl bg-sage/50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-display font-semibold text-lg text-forest">{val.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works — Detailed */}
      <section className="space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
            Technical Transparency
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
            How RoomRevive actually works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'You upload a photo (or use a sample)',
              body: 'Your image is loaded into browser memory only. It is never sent to a cloud server, never stored, and permanently deleted when you close the tab. Full privacy by design.',
            },
            {
              step: '02',
              title: 'You choose an aesthetic and budget cap',
              body: 'RoomRevive matches your selected aesthetic with a curated set of affordable, landlord-approved elements that together cost no more than your budget cap.',
            },
            {
              step: '03',
              title: 'We generate a visual concept and budget plan',
              body: 'We show you a carefully selected "after" image representing your chosen style alongside a fully itemized shopping list with student hacks, DIY alternatives, and market price estimates.',
            },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-2xl bg-ivory-200 border border-beige space-y-3 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center font-bold text-sm shadow-md">
                {item.step}
              </div>
              <h4 className="font-display font-semibold text-base text-forest pt-2">{item.title}</h4>
              <p className="text-sm text-charcoal-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="rounded-3xl bg-ivory-200 border border-beige p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sage/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-beige/70 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Heart className="w-10 h-10 text-terracotta mx-auto fill-terracotta/30" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest">
            Built for every student who ever looked at their hostel room and thought: <em>"I deserve better."</em>
          </h2>
          <p className="text-charcoal-muted text-sm max-w-xl mx-auto">
            You do. And it doesn't take a renovation budget or permission from your landlord. Just a good idea, a few hundred rupees, and the right starting point.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forest text-ivory font-semibold text-sm hover:bg-forest-800 transition-colors shadow-soft"
            >
              <span>Start your transformation</span>
              <Sparkles className="w-4 h-4 text-terracotta-light" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white text-charcoal font-semibold text-sm border border-beige hover:bg-ivory-100 transition-colors shadow-subtle"
            >
              <span>Browse room inspirations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

