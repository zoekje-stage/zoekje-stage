'use client';

import { useState } from 'react';

export default function Home() {
  return (
    <>
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
              <a href="/stages" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Stages
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 flex items-center justify-center min-h-[85vh] px-6 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
              Alle stages in Nederland,
              <br />
              op één plek
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-slate-700 mb-16 max-w-3xl mx-auto leading-relaxed">
              Stop met zoeken op tientallen websites. Wij verzamelen alle stageplekken voor jou.
            </p>

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
    </>
  );
}
