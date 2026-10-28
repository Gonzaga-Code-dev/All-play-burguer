/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Crown, Check, Sparkles, MessageCircle, Clock, Info } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

const MINI_BURGERS_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_16_36_4a0c27a6.png';
const APPETIZERS_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_10_09_c2b96227.png';
const LOADED_FRIES_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_46_53_201d1ffb.png';

export const RodizioSection: React.FC = () => {
  const [activePlan, setActivePlan] = useState<'classic' | 'vip'>('vip');

  const rodizioReservationUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Olá! Quero reservar uma mesa para o Rodízio da All Play São Mateus.'
  )}`;

  return (
    <section id="rodizio" className="relative py-20 bg-[#120B0A] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E8541C]/30 bg-[#1D1412] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E8541C]" />
            <span className="font-arcade text-xs text-[#E8541C] uppercase tracking-wider">
              Fase 03 · O Famoso Rodízio
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-tight">
            RODÍZIO DE MINI BURGUER + PIZZA
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Todos os dias das 12h às 23h. Mini hambúrgueres artesanais montados na hora, fatias de pizzas crocantes e porções à vontade na sua mesa!
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* Seg a Qui - Almoço */}
          <div className="p-6 rounded-2xl bg-[#170F0E] border border-stone-800 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-arcade text-[10px] text-stone-400 uppercase">Seg a Qui · 12h às 15h</span>
                <Clock className="w-4 h-4 text-stone-400" />
              </div>
              <h3 className="font-display text-2xl text-white uppercase tracking-wide">
                Almoço Executivo
              </h3>
              <p className="text-xs text-stone-300 mb-6">Perfeito para aquela pausa especial no meio do dia.</p>
              
              <div className="space-y-3 pt-4 border-t border-stone-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-300">Plano Classic:</span>
                  <span className="font-display text-2xl text-stone-100 tabular-nums">
                    R$ {RESTAURANT_CONFIG.pricing.rodizio.segundaQuintaAlmoco.classic.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#E8541C]/10 border border-[#E8541C]/30">
                  <span className="text-xs font-bold text-[#E8541C] flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" /> Plano VIP:
                  </span>
                  <span className="font-display text-2xl text-[#E8541C] tabular-nums">
                    R$ {RESTAURANT_CONFIG.pricing.rodizio.segundaQuintaAlmoco.vip.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-4">* Valor individual por pessoa</p>
          </div>

          {/* Seg a Qui - Jantar */}
          <div className="p-6 rounded-2xl bg-[#170F0E] border border-stone-800 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-arcade text-[10px] text-stone-400 uppercase">Seg a Qui · 18h às 23h</span>
                <Clock className="w-4 h-4 text-stone-400" />
              </div>
              <h3 className="font-display text-2xl text-white uppercase tracking-wide">
                Noite Gamer Semanal
              </h3>
              <p className="text-xs text-stone-300 mb-6">Mini burgers + pizzas salgadas e doces quentinhas.</p>
              
              <div className="space-y-3 pt-4 border-t border-stone-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-300">Plano Classic:</span>
                  <span className="font-display text-2xl text-stone-100 tabular-nums">
                    R$ {RESTAURANT_CONFIG.pricing.rodizio.segundaQuintaJantar.classic.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#E8541C]/10 border border-[#E8541C]/30">
                  <span className="text-xs font-bold text-[#E8541C] flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" /> Plano VIP:
                  </span>
                  <span className="font-display text-2xl text-[#E8541C] tabular-nums">
                    R$ {RESTAURANT_CONFIG.pricing.rodizio.segundaQuintaJantar.vip.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-4">* Pizzas a partir das 14h</p>
          </div>

          {/* Sexta, Sábado, Domingo e Feriados */}
          <div className="p-6 rounded-2xl bg-[#1D1412] border-2 border-[#E8541C] flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#E8541C]/10">
            <div className="absolute top-0 right-0 bg-[#E8541C] text-white font-arcade text-[9px] uppercase px-3 py-1 rounded-bl">
              MAIS PROCURADO
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-arcade text-[10px] text-[#2FE0E6] uppercase">Sex, Sáb, Dom & Feriados</span>
                <Clock className="w-4 h-4 text-[#2FE0E6]" />
              </div>
              <h3 className="font-display text-2xl text-white uppercase tracking-wide">
                Fim de Semana & Feriados
              </h3>
              <p className="text-xs text-stone-300 mb-6">Experiência completa durante todo o dia com videogame e trampolim.</p>
              
              <div className="space-y-3 pt-4 border-t border-stone-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-300">Plano Classic:</span>
                  <span className="font-display text-2xl text-stone-100 tabular-nums">
                    R$ {RESTAURANT_CONFIG.pricing.rodizio.fdsFeriados.classic.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#E8541C]/20 border border-[#E8541C]">
                  <span className="text-xs font-bold text-[#E8541C] flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" /> Plano VIP:
                  </span>
                  <span className="font-display text-2xl text-[#E8541C] tabular-nums">
                    R$ {RESTAURANT_CONFIG.pricing.rodizio.fdsFeriados.vip.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-4">* Das 12h às 23h sem interrupção</p>
          </div>

        </div>

        {/* Children Policy Alert */}
        <div className="mb-14 p-4 rounded-xl bg-[#170F0E] border border-amber-500/30 flex items-start sm:items-center gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs sm:text-sm text-stone-200">
            <span className="font-bold text-amber-300">Regras para Crianças: </span>
            {RESTAURANT_CONFIG.pricing.rodizio.criancas.docNote}.
          </div>
        </div>

        {/* Visual Showcase: Mini Burgers & Interactive Classic vs VIP Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#170F0E] p-6 sm:p-8 rounded-2xl border border-stone-800">
          
          {/* Photos: Mini Burgers Board & Appetizers */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden group border border-stone-800">
              <img
                src={MINI_BURGERS_IMAGE}
                alt="Tábua real com rodízio de mini burgers artesanais coloridos na All Play"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="font-arcade text-[9px] text-[#39FF88] px-2 py-0.5 rounded bg-black/80 border border-[#39FF88]/40 uppercase backdrop-blur-sm">
                  ★ FOTO REAL DO RODÍZIO
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="font-arcade text-[10px] text-[#C98A3D] uppercase tracking-wider block mb-0.5">
                  TÁBUA DE MINI BURGERS ARTESANAIS
                </span>
                <p className="font-bold text-xs sm:text-sm text-white">
                  Pães coloridos artesanais, carnes nobres grelhadas e 9 receitas exclusivas servidas na mesa.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden group border border-stone-800">
                <img
                  src={LOADED_FRIES_IMAGE}
                  alt="Batatas especiais com cheddar, bacon e catupiry com alho na mesa gamer"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="font-arcade text-[8px] text-[#FFD23F] uppercase block">
                    CHEDDAR & CATUPIRY
                  </span>
                  <p className="font-bold text-[11px] text-white leading-tight">
                    Batatas com alho crocante e bacon
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden group border border-stone-800">
                <img
                  src={APPETIZERS_IMAGE}
                  alt="Porção real com onion rings crocantes, batatas fritas e coxinhas na mesa gamer"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="font-arcade text-[8px] text-[#2FE0E6] uppercase block">
                    ONION RINGS & COXINHAS
                  </span>
                  <p className="font-bold text-[11px] text-white leading-tight">
                    Entradas servidas à vontade
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Comparison: Classic vs VIP */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-arcade text-xs text-[#2FE0E6] uppercase block mb-1">
                  Comparador de Planos
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wide">
                  CLASSIC vs. VIP: O QUE MUDA?
                </h3>
              </div>

              {/* Segmented Control for Comparison */}
              <div className="flex items-center gap-1 p-1 bg-[#120B0A] rounded-lg border border-stone-800">
                <button
                  onClick={() => setActivePlan('classic')}
                  className={`px-3 py-1.5 text-xs font-bold rounded uppercase transition-colors ${
                    activePlan === 'classic'
                      ? 'bg-stone-800 text-white'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setActivePlan('vip')}
                  className={`px-3 py-1.5 text-xs font-bold rounded uppercase transition-colors flex items-center gap-1 ${
                    activePlan === 'vip'
                      ? 'bg-[#E8541C] text-white shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-3 h-3" /> VIP
                </button>
              </div>
            </div>

            {/* Inclusions list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#120B0A]/60 border border-stone-800 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-200">
                  <strong className="text-white">9 sabores de Mini Burgers</strong> artesanais servidos quentinhos
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#120B0A]/60 border border-stone-800 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-200">
                  <strong className="text-white">12 sabores de Pizzas Salgadas</strong> + 4 opções doces
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#120B0A]/60 border border-stone-800 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-200">
                  <strong className="text-white">Entradas Classic:</strong> Batata tradicional, Cheddar & Bacon, Catupiry & Alho, Onion rings, Mini Coxinhas e Bolinhas de Queijo
                </span>
              </div>

              {/* VIP Exclusives */}
              <div
                className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all duration-300 ${
                  activePlan === 'vip'
                    ? 'bg-[#E8541C]/15 border-[#E8541C] shadow-sm shadow-[#E8541C]/20'
                    : 'bg-[#120B0A]/40 border-stone-800 opacity-60'
                }`}
              >
                <Crown
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    activePlan === 'vip' ? 'text-[#E8541C]' : 'text-stone-500'
                  }`}
                />
                <span className="text-xs text-stone-200">
                  <strong className={activePlan === 'vip' ? 'text-[#E8541C]' : 'text-stone-400'}>
                    Exclusivo VIP:
                  </strong>{' '}
                  Mini bolinho de carne artesanal nobre + batatas carinhas crocantes inclusas à vontade!
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-800">
              <span className="text-xs text-stone-400">
                Cardápio sujeito a alterações sem aviso prévio conforme disponibilidade de insumos.
              </span>

              <a
                href={rodizioReservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Garantir Mesa para Rodízio</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
