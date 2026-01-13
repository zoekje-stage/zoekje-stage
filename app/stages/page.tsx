import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Stages',
  description: 'Bekijk alle beschikbare stageplekken in Nederland. Binnenkort beschikbaar op Zoek je stage.',
};

export default function StagesPage() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #E0F2FE 0%, #FEF9E7 50%, #FEF3C7 100%)'
      }}
    >
      {/* Navigation */}
      <nav className="relative z-10 px-6 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="font-semibold text-lg text-slate-900 hover:text-slate-700 transition-colors">
            Home
          </a>
          <div className="flex items-center gap-8">
            <a href="/stages" className="text-slate-900 font-semibold transition-colors">
              Stages
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[85vh] px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-700">Binnenkort beschikbaar</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
            Stages komen eraan
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-slate-700 mb-16 max-w-3xl mx-auto leading-relaxed">
            We zijn druk bezig met het verzamelen van alle stageplekken in Nederland. Meld je aan op de homepage voor updates.
          </p>

          {/* CTA Button */}
          <a 
            href="/"
            className="inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl text-lg font-bold hover:bg-slate-800 transition-all duration-200 shadow-lg"
          >
            Terug naar home
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-slate-600 text-sm">
            © 2026 Zoek je stage • Alle rechten voorbehouden
          </p>
        </div>
      </footer>
    </div>
  );
}
