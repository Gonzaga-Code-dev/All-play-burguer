/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { FastForward, Sparkles, Gamepad2 } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

export const INTRO_VIDEO_URL = '/assets/aistudio/dreamina-2026-09-08-8971_4b95a25d.mp4';

interface VideoIntroGateProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const VideoIntroGate: React.FC<VideoIntroGateProps> = ({ onComplete, forceShow = false }) => {
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [currentTime, setCurrentTime] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Check sessionStorage and preferences
  useEffect(() => {
    if (!forceShow) {
      const seen = sessionStorage.getItem('allplay_intro_seen');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (seen || prefersReducedMotion) {
        onComplete();
      }
    }
  }, [forceShow, onComplete]);

  // Handle completion / skip transition
  const handleFinish = () => {
    if (isFadingOut) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsFadingOut(true);
    sessionStorage.setItem('allplay_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  // Autoplay video on mount (muted, with graceful error fallback)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Auto entrance video playback notice:', err);
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 8.5;
    setCurrentTime(curr);
    setProgress(Math.min(100, (curr / dur) * 100));
  };

  // REAL-TIME PIXEL ART CANVAS RENDER LOOP (FIXO NO MODO SUAVE)
  // Utiliza micro-pixels (blockSize = 4) para manter o apetite visual dos ingredientes com textura gamer
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

    // Modo Suave fixo: micro-pixels nítidos sem perda de definição dos ingredientes
    const blockSize = 4;

    const renderSubtlePixelArt = () => {
      if (!running) return;

      if (video.readyState >= 2) {
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);

        const lowW = Math.max(1, Math.floor(w / blockSize));
        const lowH = Math.max(1, Math.floor(h / blockSize));

        offCanvas.width = lowW;
        offCanvas.height = lowH;

        if (offCtx) {
          offCtx.drawImage(video, 0, 0, lowW, lowH);
          ctx.clearRect(0, 0, w, h);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(offCanvas, 0, 0, lowW, lowH, 0, 0, w, h);

          // Partículas sutis de faíscas gastronômicas durante o preparo
          const time = video.currentTime;
          if (time < 7.5) {
            ctx.fillStyle = 'rgba(232, 84, 28, 0.45)';
            for (let i = 0; i < 16; i++) {
              const px = Math.floor(((Math.sin(time * 2 + i * 1.5) * 0.4 + 0.5) * w) / blockSize) * blockSize;
              const py = Math.floor(((Math.cos(time * 1.5 + i * 1.1) * 0.35 + 0.5) * h) / blockSize) * blockSize;
              ctx.fillRect(px, py, blockSize, blockSize);
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(renderSubtlePixelArt);
    };

    animFrameRef.current = requestAnimationFrame(renderSubtlePixelArt);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const getCurrentStatus = () => {
    if (currentTime < 1.6) return 'PREPARANDO INGREDIENTES...';
    if (currentTime < 3.8) return 'SELAGEM NA BRASA & QUEIJO CHEDDAR';
    if (currentTime < 5.8) return 'MONTAGEM ARTESANAL EM ALTA VELOCIDADE';
    if (currentTime < 7.5) return 'COMBOS & MOLHOS EXCLUSIVOS ALL PLAY';
    return 'PRONTO! INICIANDO EXPERIÊNCIA GAMER...';
  };

  return (
    <div
      className={`fixed inset-0 z-[150] flex flex-col justify-between bg-[#120B0A] transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Hidden source video element (muted for guaranteed autoplay) */}
      <video
        ref={videoRef}
        src={INTRO_VIDEO_URL}
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        className="hidden"
      />

      {/* Real-time Canvas with Pixel Art Rendering (Fixo no Suave) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pixel-art-screen pointer-events-none"
      />

      {/* Retro Grid & Scanline Texture Overlay */}
      <div className="absolute inset-0 pixel-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pixel-crt-scanline opacity-15 pointer-events-none" />

      {/* Top HUD: Brand Bar & Skip Action */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#120B0A]/90 via-[#120B0A]/50 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded bg-[#E8541C] text-white">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg sm:text-xl text-white tracking-wider uppercase leading-none">
                ALL PLAY BURGUER
              </span>
              <span className="font-arcade text-[8px] sm:text-[9px] text-[#39FF88] px-1.5 py-0.5 rounded bg-black/60 border border-[#39FF88]/40">
                PIXEL SUAVE
              </span>
            </div>
            <p className="font-arcade text-[9px] sm:text-[10px] text-stone-400 uppercase mt-0.5">
              SÃO MATEUS · {RESTAURANT_CONFIG.slogan}
            </p>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleFinish}
          className="group inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded bg-[#170F0E]/90 hover:bg-[#E8541C] text-white border border-stone-700 hover:border-[#E8541C] text-xs font-arcade tracking-wider uppercase transition-all duration-200 shadow-lg backdrop-blur-md"
        >
          <span>Pular Intro</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Center Cinematic Subtle Title (fades gracefully) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none">
        <div className="p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 max-w-lg">
          <span className="font-arcade text-[10px] sm:text-xs text-[#2FE0E6] uppercase tracking-widest block mb-1">
            Fase de Abertura · São Mateus
          </span>
          <h2 className="font-display text-2xl sm:text-4xl text-white uppercase tracking-wider">
            {getCurrentStatus()}
          </h2>
        </div>
      </div>

      {/* Bottom HUD: Retro Progress Loading Bar */}
      <div className="relative z-20 p-4 sm:p-6 bg-gradient-to-t from-[#120B0A]/95 via-[#120B0A]/70 to-transparent flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-arcade text-stone-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E8541C] animate-pulse" />
            <span className="text-[#E8541C]">INICIALIZANDO CARDÁPIO & ATRAÇÕES:</span>
          </div>
          <span className="text-white font-mono font-bold">{Math.round(progress)}%</span>
        </div>

        {/* Progress Track */}
        <div className="relative w-full h-2.5 sm:h-3 bg-black/80 rounded border border-stone-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E8541C] to-[#F59E0B] transition-all duration-100 ease-linear relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/90 shadow-[0_0_8px_#E8541C]" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-stone-500 font-arcade pt-1">
          <span>VIDEOGAMES · TRAMPOLIM · RODÍZIO</span>
          <button
            onClick={handleFinish}
            className="text-stone-400 hover:text-white underline underline-offset-2 transition-colors pointer-events-auto"
          >
            Pressione para entrar imediatamente
          </button>
        </div>
      </div>
    </div>
  );
};
