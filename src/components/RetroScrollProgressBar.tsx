/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

export const RetroScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Progresso de navegação da página"
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none select-none"
    >
      {/* Background Frame with Pixelated Border */}
      <div className="w-full h-2.5 sm:h-3 bg-[#0A0504]/90 border-b border-[#E8541C]/40 backdrop-blur-md relative overflow-hidden flex items-center shadow-lg shadow-black/80">
        
        {/* Retro Grid / Pixel Segmented Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-25 z-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.8) 4px, rgba(0,0,0,0.8) 6px)'
          }}
        />

        {/* Dynamic Progress Fill with Brand Flame Orange Gradient */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-full bg-gradient-to-r from-[#8A2108] via-[#E8541C] to-[#F59E0B] transition-[width] duration-150 ease-out relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Intense Glow Edge on Current Head */}
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/90 shadow-[0_0_12px_#E8541C,0_0_20px_#F59E0B]" />
        </div>

        {/* Stepped Pixel Markers */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none z-20">
          <span className="w-0.5 h-full bg-black/40" />
          <span className="w-0.5 h-full bg-black/40" />
          <span className="w-0.5 h-full bg-black/40" />
          <span className="w-0.5 h-full bg-black/40" />
          <span className="w-0.5 h-full bg-black/40" />
        </div>
      </div>

      {/* Floating Retro Progress Tag (visible on md+ screens) */}
      <div 
        className="hidden md:flex absolute top-3.5 right-4 items-center gap-1.5 px-2 py-0.5 rounded bg-[#170F0E]/90 border border-[#E8541C]/40 text-[9px] font-arcade text-stone-300 shadow-md backdrop-blur-sm pointer-events-auto"
        title="Progresso pelo cardápio e atrações da All Play"
      >
        <span className="inline-block w-1.5 h-1.5 bg-[#E8541C] rounded-none animate-pulse" />
        <span className="text-[#E8541C]">STAGE PROGRESS:</span>
        <span className="text-white font-mono">{Math.round(scrollProgress)}%</span>
      </div>
    </aside>
  );
};
