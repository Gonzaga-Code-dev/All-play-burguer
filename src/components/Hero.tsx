/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

const HERO_BURGER_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__21_34_15_33b4f247.png';

export const Hero: React.FC = () => {
  const reservationUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(
    RESTAURANT_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <section className="relative w-full overflow-hidden bg-[#120B0A] pt-8 pb-16 md:py-20 border-b border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E8541C]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#C98A3D]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & High-converting CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
            {/* Gamified Stage Badge */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-medium text-stone-400">
              <span className="font-arcade text-[#2FE0E6] uppercase tracking-wider text-[11px]">
                LEVEL 01 · SÃO MATEUS - SP
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-300">AV. SATÉLITE, 145</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl text-white tracking-wide uppercase leading-[0.95] mb-4 text-balance">
              AQUI TODOS JOGAM. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8541C] via-[#F59E0B] to-[#C98A3D]">
                E TODO MUNDO COME BEM.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-xl">
              A hamburgueria temática de videogame de São Paulo: videogame liberado em todas as mesas, parque de trampolim no piso superior, espaço kids e rodízio completo de mini hambúrgueres artesanais + pizzas.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 mb-8">
              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-sm tracking-wider uppercase rounded gamer-button shadow-lg shadow-[#E8541C]/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Reservar Mesa</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.social.keetaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FFD23F] hover:bg-[#ffc91a] text-black font-bold text-sm tracking-wider uppercase rounded gamer-button shadow-lg shadow-[#FFD23F]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pedir no Keeta</span>
              </a>

            </div>

            {/* Google review score */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-stone-800/80 text-xs">
              <a
                href={RESTAURANT_CONFIG.ratings.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span className="tabular-nums">{RESTAURANT_CONFIG.ratings.google.score.toFixed(1)}</span>
                    <span className="text-stone-400 font-normal">no Google</span>
                  </div>
                  <span className="text-stone-400 text-[11px] block">{RESTAURANT_CONFIG.ratings.google.count}</span>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Hero Cinematic Burger Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Visual glow frame */}
            <div className="relative w-full max-w-lg lg:max-w-none group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E8541C]/30 via-[#C98A3D]/40 to-[#2FE0E6]/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border border-stone-800/80 bg-[#170F0E] shadow-2xl gamer-card">
                <img
                  src={HERO_BURGER_IMAGE}
                  alt="All Play Monster Burger artesanal com queijo derretido, gergelim e iluminação dourada"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[16/10] transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-transparent opacity-80" />

                {/* Pixel touch tag */}
                <div className="absolute top-3 right-3 font-arcade text-[9px] text-[#2FE0E6] bg-black/70 px-2 py-0.5 rounded border border-[#2FE0E6]/40 uppercase backdrop-blur-sm">
                  16-BIT CRAFT
                </div>

                {/* Floating highlight badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-lg bg-[#120B0A]/85 backdrop-blur-md border border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-[#E8541C]/20 text-[#E8541C]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-white">Burger Artesanal na Brasa</p>
                      <p className="text-[11px] text-stone-400">Pão brioche selado, carne nobre e queijo melt</p>
                    </div>
                  </div>
                  <span className="font-arcade text-[10px] text-[#2FE0E6] px-2 py-1 bg-[#2FE0E6]/10 rounded border border-[#2FE0E6]/30 uppercase">
                    HIT COMBO
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature highlight bar underneath */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#170F0E]/80 border border-stone-800/90 flex flex-col justify-center">
            <span className="font-arcade text-[10px] text-[#2FE0E6] uppercase mb-1">01. Setup Gamer</span>
            <p className="font-bold text-sm text-stone-100">Videogame em Todas as Mesas</p>
            <p className="text-xs text-stone-400 mt-0.5">Jogue à vontade sem custo extra</p>
          </div>

          <div className="p-4 rounded-xl bg-[#170F0E]/80 border border-stone-800/90 flex flex-col justify-center">
            <span className="font-arcade text-[10px] text-[#FF2E93] uppercase mb-1">02. Piso Superior</span>
            <p className="font-bold text-sm text-stone-100">Parque de Trampolim</p>
            <p className="text-xs text-stone-400 mt-0.5">Saltos e energia pura monitorada</p>
          </div>

          <div className="p-4 rounded-xl bg-[#170F0E]/80 border border-stone-800/90 flex flex-col justify-center">
            <span className="font-arcade text-[10px] text-[#39FF88] uppercase mb-1">03. Espaço Kids</span>
            <p className="font-bold text-sm text-stone-100">Brinquedão & Monitores</p>
            <p className="text-xs text-stone-400 mt-0.5">Segurança para toda a família</p>
          </div>

          <div className="p-4 rounded-xl bg-[#170F0E]/80 border border-stone-800/90 flex flex-col justify-center">
            <span className="font-arcade text-[10px] text-[#C98A3D] uppercase mb-1">04. Menu Completo</span>
            <p className="font-bold text-sm text-stone-100">Rodízio Burgers & Pizza</p>
            <p className="text-xs text-stone-400 mt-0.5">Todos os dias das 12h às 23h</p>
          </div>
        </div>

      </div>
    </section>
  );
};
