/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, MessageCircle, ShoppingBag, Users, Calendar } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

const PISCINAO_IMAGE = '/assets/piscinao-all-play.png';

export const PiscinaoSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Olá! Quero pedir informações ou reservar para o Piscinão All Play.'
  )}`;

  return (
    <section id="piscinao" className="relative py-20 bg-[#0A0710] border-b border-stone-800 overflow-hidden">
      {/* Subtle neon glow backdrops */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF2E93]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#E8541C]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Stage Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF2E93]/30 bg-[#1D1412] mb-3">
            <Flame className="w-3.5 h-3.5 text-[#FF2E93]" />
            <span className="font-arcade text-xs text-[#FF2E93] uppercase tracking-wider">
              Boss Battle · Prato Épico
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-tight">
            PISCINÃO <span className="text-[#E8541C]">ALL PLAY</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Uma verdadeira piscina monumental de cheddar cremoso com montanhas de fritas sequinhas, bacon defumado e hambúrgueres artesanais.
          </p>
        </div>

        {/* Feature Box with Big Photo and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#140F1D]/80 border border-[#8A3FFC]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Big Photo Column */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2E93]/20 via-[#E8541C]/20 to-[#2FE0E6]/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative rounded-2xl overflow-hidden border border-stone-700/80">
              <img
                src={PISCINAO_IMAGE}
                alt="Travessa do Piscinão All Play com mini hambúrgueres e batatas fritas com cheddar e bacon"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-arcade text-[10px] text-white px-3 py-1 bg-[#E8541C] rounded uppercase tracking-wider shadow">
                  SERVE DE 2 A 3 PESSOAS
                </span>
                <span className="font-arcade text-[10px] text-[#2FE0E6] px-2.5 py-1 bg-black/70 rounded backdrop-blur border border-[#2FE0E6]/40 uppercase">
                  SALÃO & DELIVERY
                </span>
              </div>
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <span className="font-arcade text-xs text-[#2FE0E6] uppercase block mb-1">
                Fórmula para Compartilhar
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide">
                A PARTIR DE R$ 49,90 <span className="text-sm font-sans text-stone-400 font-normal">/ pessoa</span>
              </h3>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              O prato que viralizou nas redes sociais: uma travessa generosa com piscina de cheddar derretido especial, montanha de batatas com bacon crocante moído, anéis de cebola dourados e mini burgers suculentos para mergulhar até a última gota.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-stone-200">
                <div className="p-2 rounded bg-[#E8541C]/20 text-[#E8541C]">
                  <Users className="w-4 h-4" />
                </div>
                <span>Ideal para dividir entre 2 a 3 pessoas</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-200">
                <div className="p-2 rounded bg-[#2FE0E6]/20 text-[#2FE0E6]">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>Disponível de <strong>Segunda a Sexta-feira</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-stone-800">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#E8541C]/30 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pedir no WhatsApp</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.social.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#170F0E] hover:bg-stone-800 text-stone-200 font-bold text-xs uppercase tracking-wider rounded gamer-button border border-stone-700 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#E8541C]" />
                <span>iFood Delivery</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
