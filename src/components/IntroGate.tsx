/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, FastForward, Play, Gamepad2 } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';
import { introAudio } from '../utils/audioSynth.ts';

const HERO_BURGER_IMAGE = '/src/assets/images/hero_burger_cinematic_1793146783399.jpg';

interface IntroGateProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onComplete, forceShow = false }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [currentShot, setCurrentShot] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Check storage and prefers-reduced-motion
  useEffect(() => {
    if (!forceShow) {
      const seen = sessionStorage.getItem('allplay_intro_seen');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Also check saveData
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      const saveData = nav.connection?.saveData === true;

      if (seen || prefersReducedMotion || saveData) {
        onComplete();
      }
    }
  }, [forceShow, onComplete]);

  // Preload hero burger image
  useEffect(() => {
    const img = new Image();
    img.src = HERO_BURGER_IMAGE;
  }, []);

  const handleStartIntro = () => {
    setHasStarted(true);
    introAudio.setMuted(isMuted);
    introAudio.startBassLoop();
    introAudio.playSubDrop(150, 0.9);
  };

  const handleSkip = () => {
    introAudio.stopAll();
    setIsFadingOut(true);
    sessionStorage.setItem('allplay_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    introAudio.setMuted(next);
  };

  // Canvas Cinematic Animation loop (10 seconds total)
  useEffect(() => {
    if (!hasStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DURATION_MS = 10000; // 10 seconds

    const render = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(elapsed / DURATION_MS, 1);
      setProgress(pct * 100);

      // Width and Height
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      const cx = w / 2;
      const cy = h / 2;

      // Clear dark background (#120B0A with subtle caramel vignette)
      ctx.fillStyle = '#120B0A';
      ctx.fillRect(0, 0, w, h);

      // Background ambient radial gradient (dark gold & flame glow)
      const grad = ctx.createRadialGradient(cx, cy, 50, cx, cy, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(232, 84, 28, 0.18)');
      grad.addColorStop(0.5, 'rgba(201, 138, 61, 0.08)');
      grad.addColorStop(1, 'rgba(18, 11, 10, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Seconds 0 to 1.6: Shot 1 - Burger Instant Deconstruction
      // Seconds 1.6 to 3.4: Shot 2 - Beef Patty Blazing Sear & Cheese Drop
      // Seconds 3.4 to 5.4: Shot 3 - High-Speed Ingredient Flight
      // Seconds 5.4 to 7.6: Shot 4 - High-Speed Mid-Air Assembly
      // Seconds 7.6 to 10: Shot 5 - Hero Slam Down onto Mirror Surface

      const sec = (elapsed / 1000);

      if (sec < 1.6) {
        if (currentShot !== 1) {
          setCurrentShot(1);
          introAudio.playWhoosh(0.7);
        }
        // Floating ingredient tower separation
        const explosionT = Math.min(sec / 1.6, 1);
        const spread = explosionT * 180;

        drawIngredientLayer(ctx, cx, cy - spread * 1.5, 'Top Brioche Bun with Sesame', '#D4883A', 80, 36);
        drawIngredientLayer(ctx, cx, cy - spread * 0.9, 'Crisp Curly Lettuce', '#4ADE80', 88, 12);
        drawIngredientLayer(ctx, cx, cy - spread * 0.45, 'Thick-cut Ripe Tomato', '#EF4444', 85, 14);
        drawIngredientLayer(ctx, cx, cy - spread * 0.1, 'Purple Onion Rings', '#A855F7', 80, 10);
        drawIngredientLayer(ctx, cx, cy + spread * 0.25, 'Melted Cheddar Cheese', '#FBBF24', 90, 16);
        drawIngredientLayer(ctx, cx, cy + spread * 0.65, 'Thick Grilled Beef Patty', '#592D1D', 92, 28);
        drawIngredientLayer(ctx, cx, cy + spread * 1.05, 'Pickle Slices & Special Sauce', '#84CC16', 78, 12);
        drawIngredientLayer(ctx, cx, cy + spread * 1.45, 'Golden Brioche Base Bun', '#C47A32', 82, 32);

        // Golden sparks flying
        drawSparks(ctx, cx, cy, explosionT * 60, explosionT);

      } else if (sec < 3.4) {
        if (currentShot !== 2) {
          setCurrentShot(2);
          introAudio.playSizzle(1.8);
          introAudio.playSubDrop(160, 0.5);
        }
        // Patty blazing sear
        const searT = (sec - 1.6) / 1.8;
        // Cast iron pan surface
        ctx.fillStyle = '#1c1514';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 80, 180, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        // Flames rising from edges
        drawFlames(ctx, cx, cy + 70, 140, searT);

        // Heavy seared patty
        drawPattySear(ctx, cx, cy + 60, 110, 36, searT);

        // Dripping melted cheese descending
        const cheeseY = cy - 100 + searT * 150;
        if (cheeseY < cy + 50) {
          drawIngredientLayer(ctx, cx, cheeseY, 'Melted Golden Cheddar', '#F59E0B', 100, 18);
        }

      } else if (sec < 5.4) {
        if (currentShot !== 3) {
          setCurrentShot(3);
          introAudio.playWhoosh(0.5);
        }
        // High speed ingredient orbit / flight
        const flightT = (sec - 3.4) / 2.0;
        const angle = flightT * Math.PI * 4;

        ctx.save();
        ctx.translate(cx, cy);
        // Orbiting elements
        drawOrbitingItem(ctx, Math.cos(angle) * 160, Math.sin(angle) * 80, '#A855F7', 35, 'Cebola Roxa');
        drawOrbitingItem(ctx, Math.cos(angle + 2) * 190, Math.sin(angle + 2) * 90, '#EF4444', 45, 'Tomate Maduro');
        drawOrbitingItem(ctx, Math.cos(angle + 4) * 170, Math.sin(angle + 4) * 85, '#22C55E', 50, 'Alface Fresca');
        drawOrbitingItem(ctx, Math.cos(angle + 5.5) * 140, Math.sin(angle + 5.5) * 70, '#84CC16', 30, 'Picles Crocante');
        ctx.restore();

      } else if (sec < 7.6) {
        if (currentShot !== 4) {
          setCurrentShot(4);
          introAudio.playWhoosh(0.8);
        }
        // High speed snap assembly in air
        const snapT = (sec - 5.4) / 2.2;
        const compress = (1 - snapT) * 160;

        drawIngredientLayer(ctx, cx, cy + 90, 'Base Bun', '#C47A32', 100, 34);
        if (snapT > 0.15) drawIngredientLayer(ctx, cx, cy + 65, 'Special Sauce & Pickles', '#84CC16', 95, 14);
        if (snapT > 0.35) drawIngredientLayer(ctx, cx, cy + 40, 'Juicy Beef Patty', '#592D1D', 110, 32);
        if (snapT > 0.55) drawIngredientLayer(ctx, cx, cy + 18, 'Melted Cheddar', '#F59E0B', 115, 20);
        if (snapT > 0.7) drawIngredientLayer(ctx, cx, cy - 2, 'Tomate & Cebola', '#EF4444', 105, 16);
        if (snapT > 0.85) drawIngredientLayer(ctx, cx, cy - 24, 'Alface', '#22C55E', 110, 16);
        // Top bun slamming in
        const topY = cy - 50 - compress * 0.8;
        drawIngredientLayer(ctx, cx, topY, 'Brioche Bun & Sesame', '#D4883A', 102, 42);

      } else {
        // Shot 5: 7.6s - 10s: Slamdown onto mirror surface & lock hero frame!
        if (currentShot !== 5) {
          setCurrentShot(5);
          introAudio.playSubDrop(180, 1.2);
        }

        const shockT = Math.min((sec - 7.6) / 2.4, 1);

        // Golden shockwave ripples on table
        drawShockwave(ctx, cx, cy + 90, shockT);

        // Draw the complete centered hero burger frame
        drawHeroBurgerRender(ctx, cx, cy, shockT);
      }

      if (elapsed < DURATION_MS) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        // Finished naturally
        handleSkip();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasStarted, currentShot]);

  // Visual helper functions
  const drawIngredientLayer = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    _label: string,
    color: string,
    rx: number,
    ry: number
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.restore();
  };

  const drawSparks = (ctx: CanvasRenderingContext2D, cx: number, cy: number, distance: number, opacity: number) => {
    ctx.save();
    ctx.fillStyle = `rgba(245, 158, 11, ${1 - opacity})`;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const sx = cx + Math.cos(a) * (distance + (i % 3) * 20);
      const sy = cy + Math.sin(a) * (distance + (i % 4) * 15);
      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawFlames = (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, t: number) => {
    ctx.save();
    ctx.fillStyle = 'rgba(232, 84, 28, 0.7)';
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const flicker = Math.sin(t * 20 + i) * 15;
      const fx = cx + Math.cos(a) * (radius + flicker);
      const fy = cy + Math.sin(a) * (radius * 0.35 + flicker * 0.3);
      ctx.beginPath();
      ctx.arc(fx, fy - 10, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawPattySear = (ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number, _t: number) => {
    ctx.save();
    // Patty body
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#451e11';
    ctx.fill();

    // Sizzling steam
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(cx - 40 + i * 20, cy - 30 - i * 8, 12, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawOrbitingItem = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    size: number,
    _name: string
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.45, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.restore();
  };

  const drawShockwave = (ctx: CanvasRenderingContext2D, cx: number, cy: number, t: number) => {
    ctx.save();
    const r = t * 280;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(201, 138, 61, ${Math.max(0, 1 - t)})`;
    ctx.lineWidth = 4;
    ctx.shadowColor = '#E8541C';
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.restore();
  };

  const drawHeroBurgerRender = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    t: number
  ) => {
    ctx.save();
    // Dark gold rim light aura
    const glow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 220);
    glow.addColorStop(0, 'rgba(201, 138, 61, 0.4)');
    glow.addColorStop(0.6, 'rgba(232, 84, 28, 0.2)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(cx - 250, cy - 250, 500, 500);

    // Stone mirror surface reflection
    ctx.fillStyle = 'rgba(20, 13, 11, 0.9)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 90, 190, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Stack
    // Base bun
    drawIngredientLayer(ctx, cx, cy + 70, '', '#B86F28', 110, 32);
    // Sauce & pickles
    drawIngredientLayer(ctx, cx, cy + 50, '', '#84CC16', 105, 14);
    // Seared Patty
    drawIngredientLayer(ctx, cx, cy + 30, '', '#4A2113', 118, 30);
    // Dripping Cheese
    drawIngredientLayer(ctx, cx, cy + 12, '', '#F59E0B', 122, 22);
    // Tomato & Onion
    drawIngredientLayer(ctx, cx, cy - 8, '', '#DC2626', 112, 16);
    // Fresh Lettuce
    drawIngredientLayer(ctx, cx, cy - 24, '', '#16A34A', 116, 16);
    // Brioche Top Bun
    drawIngredientLayer(ctx, cx, cy - 56, '', '#D4883A', 112, 44);

    // Sesame seeds on top
    ctx.fillStyle = '#FEF08A';
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const sx = cx + Math.cos(a) * (30 + (i % 5) * 12);
      const sy = cy - 60 + Math.sin(a) * (14 + (i % 3) * 6);
      ctx.fillRect(sx, sy, 3, 2);
    }

    ctx.restore();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#120B0A] transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* INITIAL GATE SCREEN: Before user presses start (unlocks audio) */}
      {!hasStarted ? (
        <div className="relative flex flex-col items-center justify-center px-4 text-center max-w-xl z-10">
          {/* Subtle gamer glow ring */}
          <div className="absolute w-72 h-72 rounded-full bg-[#E8541C]/15 blur-3xl -z-10 animate-pulse pointer-events-none" />

          {/* Logo / Badge */}
          <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#C98A3D]/30 bg-[#1D1412]/80 backdrop-blur-sm">
            <Gamepad2 className="w-4 h-4 text-[#E8541C]" />
            <span className="font-arcade text-xs text-[#C98A3D] uppercase tracking-wider">
              São Paulo · São Mateus
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide uppercase leading-none mb-2">
            ALL PLAY BURGUER
          </h1>
          <p className="font-arcade text-sm md:text-base text-[#2FE0E6] mb-8 tracking-widest uppercase">
            {RESTAURANT_CONFIG.slogan}
          </p>

          <p className="text-sm text-stone-300 max-w-md mb-8 leading-relaxed">
            Videogame em todas as mesas, parque de trampolim no andar superior e rodízio completo de mini hambúrgueres artesanais + pizzas.
          </p>

          {/* Big PRESS START Button */}
          <button
            onClick={handleStartIntro}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E8541C] hover:bg-[#ff6128] text-white font-arcade text-sm md:text-base tracking-widest uppercase rounded gamer-button shadow-lg shadow-[#E8541C]/40 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2FE0E6]"
          >
            <Play className="w-5 h-5 fill-current text-white group-hover:scale-110 transition-transform" />
            <span>PRESS START</span>
          </button>

          {/* Skip directly link */}
          <button
            onClick={handleSkip}
            className="mt-6 text-xs text-stone-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Pular intro e ir direto para o site
          </button>
        </div>
      ) : (
        /* PLAYING 10s CINEMATIC VIDEO / CANVAS ANIMATION */
        <div className="relative w-full h-full flex flex-col justify-between">
          {/* Canvas animation layer */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

          {/* Top Control Bar: Audio toggle & Skip */}
          <div className="relative z-20 flex items-center justify-between p-6">
            <div className="flex items-center gap-3 bg-[#120B0A]/70 backdrop-blur-md px-3.5 py-1.5 rounded border border-stone-800">
              <span className="font-arcade text-[11px] text-[#2FE0E6] uppercase tracking-wider animate-pulse">
                REC · BASS HOUSE 150 BPM
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                className="p-2.5 rounded bg-[#120B0A]/70 hover:bg-[#1D1412] text-white border border-stone-700/60 backdrop-blur-md transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-stone-400" /> : <Volume2 className="w-5 h-5 text-[#39FF88]" />}
              </button>

              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-4 py-2 bg-[#120B0A]/80 hover:bg-[#E8541C] text-white font-arcade text-xs rounded border border-stone-700/60 backdrop-blur-md transition-colors"
              >
                <span>PULAR</span>
                <FastForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stage Subtitle Banner */}
          <div className="relative z-20 flex flex-col items-center justify-end pb-8 px-4 text-center">
            <div className="bg-[#120B0A]/85 backdrop-blur-md border border-[#E8541C]/40 px-6 py-2.5 rounded gamer-card max-w-md">
              <span className="font-arcade text-xs text-[#E8541C] uppercase block mb-1">
                Fase 0{currentShot} / 05
              </span>
              <p className="font-display text-xl md:text-2xl text-white tracking-wide uppercase">
                {currentShot === 1 && 'Desconstrução Explosiva do Burger'}
                {currentShot === 2 && 'Patty Artesanal na Brasa & Cheddar Melt'}
                {currentShot === 3 && 'Salada Fresca & Ingredientes em Órbita'}
                {currentShot === 4 && 'Montagem em Alta Velocidade no Ar'}
                {currentShot === 5 && 'All Play Burger · Pronto para o Jogo'}
              </p>
            </div>

            {/* Thin Progress Bar */}
            <div className="w-full max-w-md mt-4 bg-stone-900/80 h-1.5 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-[#E8541C] via-[#C98A3D] to-[#2FE0E6] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
