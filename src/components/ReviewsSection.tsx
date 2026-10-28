/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ExternalLink, ThumbsUp } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="relative py-20 bg-[#0F0908] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-[#1D1412] mb-3">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span className="font-arcade text-xs text-amber-400 uppercase tracking-wider">
              Score Geral · Avaliações Oficiais
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
            QUEM VEM, <span className="text-[#E8541C]">RECOMENDA</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Veja as avaliações públicas da casa no Google.
          </p>
        </div>

        {/* Google score */}
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto mb-10">
          
          {/* Google Card */}
          <div className="p-8 rounded-2xl bg-[#170F0E] border border-stone-800 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-stone-200">Google Avaliações</span>
                <span className="text-xs text-stone-400">Verificado</span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-6xl text-white tabular-nums">
                  {RESTAURANT_CONFIG.ratings.google.score.toFixed(1)}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'fill-amber-400/30'}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-400 mb-6">
                Baseado em {RESTAURANT_CONFIG.ratings.google.count} de clientes reais que visitaram a casa.
              </p>
            </div>

            <a
              href={RESTAURANT_CONFIG.ratings.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-4 py-3 rounded-lg bg-[#120B0A] hover:bg-stone-800 text-xs font-bold text-stone-200 hover:text-white transition-colors"
            >
              <span>Ver todas as avaliações no Google Maps</span>
              <ExternalLink className="w-4 h-4 text-stone-400" />
            </a>
          </div>

        </div>

        {/* Highlights Bar */}
        <div className="max-w-4xl mx-auto p-4 rounded-xl bg-[#170F0E]/70 border border-stone-800 flex flex-wrap items-center justify-around gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-[#39FF88]" />
            <span>Videogames em 100% das mesas</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-[#39FF88]" />
            <span>Parque de trampolim com monitores</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-[#39FF88]" />
            <span>Ambiente climatizado e familiar</span>
          </div>
        </div>

      </div>
    </section>
  );
};
