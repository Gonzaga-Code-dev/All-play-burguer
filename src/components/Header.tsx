/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, RotateCcw, ShoppingBag } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

interface HeaderProps {
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const reservationUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(
    RESTAURANT_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <header className="sticky top-2.5 sm:top-3 z-40 w-full bg-[#120B0A]/95 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        {/* Zone 1: Brand Wordmark (Single text element with gamer accent) */}
        <a
          href="#"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <span className="font-display text-2xl md:text-3xl text-white tracking-wider uppercase group-hover:text-[#E8541C] transition-colors">
            ALL PLAY <span className="text-[#E8541C]">BURGUER</span>
          </span>
          <span className="hidden sm:inline-block font-arcade text-[10px] text-[#2FE0E6] border border-[#2FE0E6]/30 px-1.5 py-0.5 rounded uppercase">
            SP
          </span>
        </a>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-300">
          <a
            href="#experiencia"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            A Experiência
          </a>
          <a
            href="#rodizio"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Rodízio
          </a>
          <a
            href="#piscinao"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Piscinão
          </a>
          <a
            href="#cardapio"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Cardápio
          </a>
          <a
            href="#eventos"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Eventos
          </a>
          <a
            href="#localizacao"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Onde Estamos
          </a>
        </nav>

        {/* Zone 3: Actions (Keeta Delivery + Reservar Mesa + replay intro) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Rever abertura em vídeo"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-stone-400 hover:text-[#2FE0E6] rounded border border-stone-800 hover:border-stone-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="font-arcade text-[9px] uppercase">Intro</span>
            </button>
          )}

          {/* Keeta Delivery Button */}
          <a
            href={RESTAURANT_CONFIG.social.keetaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FFD23F] bg-[#FFD23F]/10 hover:bg-[#FFD23F]/20 border border-[#FFD23F]/40 rounded gamer-button transition-colors whitespace-nowrap"
            title="Peça agora na All Play São Mateus pelo Keeta"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Keeta</span>
          </a>

          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs md:text-sm font-bold tracking-wide uppercase text-white bg-[#E8541C] hover:bg-[#d04511] rounded gamer-button shadow-md shadow-[#E8541C]/30 hover:shadow-[#E8541C]/50 transition-all duration-200 whitespace-nowrap shrink-0"
          >
            Reservar Mesa
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="md:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#170F0E] border-b border-stone-800 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#experiencia"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-stone-200 hover:text-[#E8541C]"
          >
            A Experiência Gamer
          </a>
          <a
            href="#rodizio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-stone-200 hover:text-[#E8541C]"
          >
            Rodízio Mini Burgers & Pizza
          </a>
          <a
            href="#piscinao"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-stone-200 hover:text-[#E8541C]"
          >
            Piscinão All Play
          </a>
          <a
            href="#cardapio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-stone-200 hover:text-[#E8541C]"
          >
            Cardápio em Fases
          </a>
          <a
            href="#eventos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-stone-200 hover:text-[#E8541C]"
          >
            Espaço para Eventos & Aniversários
          </a>
          <a
            href="#localizacao"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-stone-200 hover:text-[#E8541C]"
          >
            Onde Estamos & Horários
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={RESTAURANT_CONFIG.social.keetaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#FFD23F] text-black font-bold text-xs uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedir no Keeta (Delivery Oficial)</span>
            </a>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#E8541C] text-white font-bold text-xs uppercase tracking-wider"
            >
              <span>Reservar Mesa no WhatsApp</span>
            </a>
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="flex items-center gap-2 text-xs text-stone-400 hover:text-[#2FE0E6]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rever vídeo de introdução</span>
              </button>
            )}
            <a
              href={`tel:${RESTAURANT_CONFIG.phoneRaw}`}
              className="text-xs text-stone-300 font-mono"
            >
              {RESTAURANT_CONFIG.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
