/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Facebook, Phone, MessageCircle, RotateCcw, Heart } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  return (
    <footer className="w-full bg-[#0A0710] border-t border-stone-800 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl text-white uppercase tracking-wider">
                ALL PLAY <span className="text-[#E8541C]">BURGUER</span>
              </span>
            </div>
            <p className="font-arcade text-xs text-[#2FE0E6] uppercase tracking-wider">
              {RESTAURANT_CONFIG.slogan}
            </p>
            <p className="text-xs text-stone-300 max-w-md leading-relaxed">
              A primeira hamburgueria gamer de São Mateus. Videogames em todas as mesas, parque de trampolim no mezanino, rodízio completo de mini burguer e pizzas, taças monumentais e espaço privativo para eventos.
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-display text-lg text-white uppercase tracking-wider">
              Contato & Local
            </h4>
            <p className="text-xs text-stone-300">
              {RESTAURANT_CONFIG.address.full}
            </p>
            <div className="text-xs space-y-1">
              <p>
                <strong className="text-stone-200">Telefone:</strong>{' '}
                <a href={`tel:${RESTAURANT_CONFIG.phoneRaw}`} className="hover:text-white">
                  {RESTAURANT_CONFIG.phone}
                </a>
              </p>
              <p>
                <strong className="text-stone-200">WhatsApp:</strong>{' '}
                <a
                  href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {RESTAURANT_CONFIG.whatsappDisplay}
                </a>
              </p>
              <p>
                <strong className="text-stone-200">Horário:</strong> {RESTAURANT_CONFIG.schedule.general}
              </p>
            </div>
          </div>

          {/* Social & Actions */}
          <div className="space-y-3">
            <h4 className="font-display text-lg text-white uppercase tracking-wider">
              Redes & Delivery
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={RESTAURANT_CONFIG.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#FF2E93]" />
                <span>{RESTAURANT_CONFIG.social.instagram}</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.social.keetaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FFD23F] transition-colors"
              >
                <span className="w-4 h-4 text-center font-bold text-[#FFD23F] text-[11px]">K</span>
                <span className="text-[#FFD23F] font-semibold">Pedir no Keeta (Delivery Oficial)</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.social.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-4 h-4 text-center font-bold text-red-500 text-[11px]">iF</span>
                <span>Pedir no iFood Delivery</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.social.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-4 h-4 text-center font-bold text-blue-400 text-[11px]">G</span>
                <span>Avaliações no Google (4,4 ⭐)</span>
              </a>

              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="flex items-center gap-2 text-stone-400 hover:text-[#2FE0E6] pt-2 transition-colors text-left"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="font-arcade text-[10px] uppercase">Rever Introdução</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Credits & CNPJ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} All Play Burguer São Mateus. Todos os direitos reservados. CNPJ: 45.192.384/0001-92.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Feito com paixão gamer em São Paulo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
