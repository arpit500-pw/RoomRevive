import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Studio } from './pages/Studio';
import { Results } from './pages/Results';
import { Moodboard } from './pages/Moodboard';
import { MyRoom } from './pages/MyRoom';
import { Decor } from './pages/Decor';
import { About } from './pages/About';

function App() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/moodboard" element={<Moodboard />} />
          <Route path="/my-room" element={<MyRoom />} />
          <Route path="/decor" element={<Decor />} />
          <Route path="/about" element={<About />} />
          {/* Catch-all */}
          <Route
            path="*"
            element={
              <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
                <h2 className="font-display font-bold text-3xl text-forest">
                  Page Not Found
                </h2>
                <p className="text-charcoal-muted text-sm">
                  This space doesn't exist yet. Head back home to explore more rooms.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory text-sm font-semibold hover:bg-forest-800 transition-colors"
                >
                  Return Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
