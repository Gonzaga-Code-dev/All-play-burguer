/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Crown, 
  Search, 
  MessageCircle, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Plus, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import menuData from '../data/menu.json';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

const DESSERT_TACA_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_11_28_625f5df5.png';
const BURGER_REAL_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__21_57_38_51163689.png';
const MINI_BURGERS_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_16_36_4a0c27a6.png';
const COCKTAIL_MENU_IMAGE = '/assets/drinks-all-play.png';
const LOADED_FRIES_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_46_53_201d1ffb.png';
const LUNCH_IMAGE = '/assets/almoco-executivo.png';
const RODIZIO_GAMER_IMAGE = '/assets/rodizio-gamer.png';

interface OrderItem {
  name: string;
  price: string;
  category: string;
}

// Interactive 3D Card Tilt Component
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}> = ({ children, className = '', highlighted = false }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6; // max 6 deg

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`${className} ${
        highlighted
          ? 'border-[#FF2E93] shadow-lg shadow-[#FF2E93]/20 ring-1 ring-[#FF2E93]'
          : 'border-stone-800/80 hover:border-[#2FE0E6]/50'
      }`}
    >
      {children}
    </div>
  );
};

export const AnimatedMenuSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [vipFilterActive, setVipFilterActive] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemForOrder, setSelectedItemForOrder] = useState<OrderItem | null>(null);

  const phases = menuData.phases;
  const currentPhase = phases[activePhaseIndex];

  // Quick order handler
  const handleOrderClick = (name: string, price: string = 'Consultar', category: string = 'Cardápio') => {
    setSelectedItemForOrder({ name, price, category });
  };

  const sendOrderToWhatsApp = (item: OrderItem) => {
    const text = `Olá! Gostaria de pedir: *${item.name}* (${item.price}) do cardápio da All Play São Mateus.`;
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    setSelectedItemForOrder(null);
  };

  // Schema.org Menu JSON-LD
  const menuJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'Cardápio Oficial All Play Burguer São Mateus',
      description: 'Cardápio completo organizado em 5 fases: rodízio de mini burgers, pizzas artesanais, taças de sobremesa e drinks.',
      hasMenuSection: phases.map((p) => ({
        '@type': 'MenuSection',
        name: `Fase ${p.number} · ${p.title}`,
        description: p.description,
      })),
    };
  }, [phases]);

  return (
    <section id="cardapio" className="relative py-20 bg-[#0A0710] border-b border-stone-800 text-[#F5EEFF] overflow-hidden">
      
      {/* Schema.org Menu Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />

      {/* Futuristic Arcade Ambient Neon Lighting (Rosa #FF2E93, Ciano #2FE0E6, Roxo #8A3FFC) */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#FF2E93]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#2FE0E6]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8A3FFC]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle arcade grid overlay */}
      <div className="absolute inset-0 arcade-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2FE0E6]/40 bg-[#120B0A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#2FE0E6] animate-ping" />
            <span className="font-arcade text-xs text-[#2FE0E6] uppercase tracking-wider">
              Level Select · Cardápio Animado
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-tight">
            CARDÁPIO EM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] via-[#8A3FFC] to-[#2FE0E6]">FASES GAMER</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Navegue pelas 5 fases e descubra rodízios fartos, mini burgers artesanais, pizzas na brasa, taças monumentais e drinks autorais.
          </p>
        </div>

        {/* Level Select Navigation Bar (5 Phases with Loading Progress) */}
        <div className="mb-10">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {phases.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 whitespace-nowrap shrink-0 gamer-card ${
                    isActive
                      ? 'bg-[#1A1226] border-[#2FE0E6] text-white shadow-lg shadow-[#2FE0E6]/25 ring-1 ring-[#2FE0E6]'
                      : 'bg-[#120B19]/70 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  <div
                    className={`font-arcade text-xs px-2 py-0.5 rounded border ${
                      isActive
                        ? 'bg-[#2FE0E6]/20 border-[#2FE0E6] text-[#2FE0E6]'
                        : 'bg-stone-900 border-stone-800 text-stone-500'
                    }`}
                  >
                    FASE {phase.number}
                  </div>
                  <span className="font-display text-base uppercase tracking-wider">{phase.title}</span>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#2FE0E6] animate-pulse" />}
                </button>
              );
            })}
          </div>

          {/* Level Progress Indicator Bar */}
          <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden mt-2 max-w-xl mx-auto">
            <div
              className="h-full bg-gradient-to-r from-[#FF2E93] via-[#8A3FFC] to-[#2FE0E6] transition-all duration-300"
              style={{ width: `${((activePhaseIndex + 1) / phases.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Search & Phase Subheader Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#140F1D]/80 border border-stone-800/90 mb-8 backdrop-blur-md">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-arcade text-xs text-[#FF2E93] uppercase break-words">
                FASE {currentPhase.number} · {currentPhase.title}
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">{currentPhase.subtitle}</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 md:shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar item no cardápio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[#0A0710] border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-[#2FE0E6] transition-colors"
            />
          </div>
        </div>

        {/* PHASE 01: RODÍZIO CATEGORIES & VIP TOGGLE */}
        {currentPhase.id === 'rodizio' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#10172B] via-[#15101E] to-[#21170A] border border-[#3DA5FF]/35 shadow-2xl items-center overflow-hidden">
              <div className="md:col-span-5 rounded-2xl overflow-hidden border border-[#3DA5FF]/30 bg-black/40">
                <img
                  src={RODIZIO_GAMER_IMAGE}
                  alt="Controle de videogame All Play em primeiro plano, com porção de salgados ao fundo"
                  className="block w-full h-auto aspect-square object-contain object-center"
                />
              </div>
              <div className="md:col-span-7 space-y-3">
                <span className="font-arcade text-[10px] text-[#3DA5FF] uppercase tracking-wider">
                  FASE 01 · RODÍZIO GAMER
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase leading-tight">
                  MINI BURGERS <span className="text-[#E8541C]">+ PIZZAS</span>
                </h3>
                <p className="text-sm text-stone-300">
                  Escolha seu player e aproveite o rodízio com videogame em todas as mesas.
                </p>
              </div>
            </div>

            {/* VIP Glow Toggle Switch */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#170E24] border border-[#FF2E93]/40 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#FF2E93]/20 text-[#FF2E93]">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Visualização VIP Ativada</h4>
                  <p className="text-xs text-stone-300">
                    Itens exclusivos do plano VIP (mini bolinho de carne e batatas carinhas) aparecem com destaque e glow especial.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setVipFilterActive(!vipFilterActive)}
                className={`px-4 py-2 text-xs font-bold rounded gamer-button border transition-colors whitespace-nowrap ${
                  vipFilterActive
                    ? 'bg-[#E8541C] text-white border-[#E8541C] shadow-md shadow-[#E8541C]/30'
                    : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                }`}
              >
                {vipFilterActive ? 'Destacar Exclusivos VIP: LIGADO' : 'Destacar VIP: DESLIGADO'}
              </button>
            </div>

            {/* Rodízio Groups */}
            {currentPhase.categories &&
              currentPhase.categories.map((cat, catIdx) => {
                const filteredItems = cat.items.filter((item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (filteredItems.length === 0) return null;

                return (
                  <div key={catIdx} className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-stone-800 pb-2">
                      <span className="w-1.5 h-4 bg-[#2FE0E6] rounded" />
                      <h3 className="font-display text-2xl text-white uppercase tracking-wider">
                        {cat.name}
                      </h3>
                      <span className="font-arcade text-[10px] text-stone-400 ml-auto">
                        {filteredItems.length} ITENS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredItems.map((item, itemIdx) => {
                        const isVip = item.isVipOnly;
                        const isHighlighted = isVip && vipFilterActive;

                        return (
                          <TiltCard
                            key={itemIdx}
                            highlighted={isHighlighted}
                            className={`p-4 rounded-xl border gamer-card flex flex-col justify-between ${
                              isHighlighted
                                ? 'bg-[#221326]'
                                : 'bg-[#140F1D]/70 hover:bg-[#1A1226]'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                                {isVip && (
                                  <span className="font-arcade text-[9px] px-2 py-0.5 rounded bg-[#FF2E93]/20 text-[#FF2E93] border border-[#FF2E93]/40 uppercase shrink-0">
                                    VIP ONLY
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                              <span className="text-[11px] text-[#39FF88] flex items-center gap-1 font-medium">
                                <Check className="w-3.5 h-3.5" /> No Rodízio
                              </span>
                              <button
                                onClick={() => handleOrderClick(item.name, 'Incluso no Rodízio', cat.name)}
                                className="text-[11px] font-bold text-stone-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-[#0A0710] hover:bg-[#E8541C] transition-colors"
                              >
                                <Plus className="w-3 h-3" /> Pedir Rodada
                              </button>
                            </div>
                          </TiltCard>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* PHASES 02, 03, 04, 05: ITEMS WITH PRICES & TAÇA HERO CARD */}
        {currentPhase.id !== 'rodizio' && (
          <div className="space-y-8">
            {/* Special Highlight for Fase 03 (Taças & Sobremesas) with Floating Parallax */}
            {currentPhase.id === 'tacas-sobremesas' && (
              <div className="relative group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E112A] via-[#160E21] to-[#120B19] border-2 border-[#FF2E93]/50 shadow-2xl items-center overflow-hidden">
                <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#FF2E93]/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative md:col-span-5 min-w-0 rounded-2xl overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
                  <img
                    src={DESSERT_TACA_IMAGE}
                    alt="Taça gourmet monumental com chocolates e morangos"
                    className="block w-full h-auto md:w-auto md:h-[420px] md:max-w-full object-contain object-center rounded-2xl"
                  />
                </div>

                <div className="md:col-span-7 min-w-0 flex flex-col justify-center space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-arcade text-[10px] text-[#FF2E93] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FF2E93]/15 border border-[#FF2E93]/30">
                      BOSS FINAL DOS DOCES
                    </span>
                    <span className="font-display text-2xl text-[#F59E0B] tabular-nums">
                      R$ 49,90
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase leading-tight break-words">
                    AS FAMOSAS TAÇAS GOURMET DA ALL PLAY
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed break-words">
                    Esculpidas com chocolates nobres (Kinder Bueno, Ferrero Rocher, Leite Ninho, Nutella pura e Oreo triturado), acompanhadas de morangos frescos e sorvete artesanal.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleOrderClick('Taça Gourmet da All Play', 'R$ 49,90', 'Taças Gourmet')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF2E93] hover:bg-[#e02480] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#FF2E93]/40 transition-transform active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pedir Taça Gourmet</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Special Highlight for Fase 02 (Burgers Artesanais) with Real Burger Photo */}
            {currentPhase.id === 'burgers-pizzas' && (
              <div className="relative group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#21110B] via-[#1A0E0A] to-[#120B0A] border-2 border-[#E8541C]/50 shadow-2xl items-center overflow-hidden mb-6">
                <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#E8541C]/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative md:col-span-5 min-w-0 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-black/40 flex items-center justify-center">
                  <img
                    src={BURGER_REAL_IMAGE}
                    alt="Hambúrguer artesanal real da All Play com queijo derretido e pão tostado"
                    className="block w-full h-auto md:w-auto md:h-[420px] md:max-w-full object-contain object-center rounded-2xl"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="font-arcade text-[9px] text-[#39FF88] px-2 py-0.5 rounded bg-black/80 border border-[#39FF88]/40 uppercase backdrop-blur-sm">
                      ★ FOTO REAL DO PRODUTO
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 min-w-0 flex flex-col justify-center space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-arcade text-[10px] text-[#E8541C] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#E8541C]/15 border border-[#E8541C]/30">
                      GRELHADOS NO FOGO
                    </span>
                    <span className="font-display text-2xl text-[#C98A3D] tabular-nums">
                      BLEND EXCLUSIVO 160G
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase leading-tight break-words">
                    BURGER ARTESANAL ALL PLAY
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed break-words">
                    Carne 100% bovina nobre, queijo cheddar cremoso escorrendo, bacon crocante em pedaços e pão brioche selado na manteiga. Escolha avulso ou saboreie no rodízio!
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleOrderClick('Cheddar Bacon Boss 160g', 'R$ 38,90', 'Burgers')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#E8541C]/40 transition-transform active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pedir Burger Artesanal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Special Highlight for Fase 04 (Drinks & Coquetéis) with Official Menu Photo */}
            {currentPhase.id === 'drinks-bebidas' && (
              <div className="relative group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0C1B14] via-[#0E171B] to-[#120B0A] border-2 border-[#39FF88]/40 shadow-2xl items-center overflow-hidden mb-6">
                <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#39FF88]/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative md:col-span-5 min-w-0 rounded-2xl overflow-hidden shadow-2xl border border-[#39FF88]/30 flex items-center justify-center bg-black/40">
                  <img
                    src={COCKTAIL_MENU_IMAGE}
                    alt="Dois drinks coloridos servidos na All Play Burguer"
                    className="block w-full h-auto md:w-auto md:h-[420px] md:max-w-full object-contain object-center rounded-2xl"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="font-arcade text-[9px] text-[#39FF88] px-2 py-0.5 rounded bg-black/85 border border-[#39FF88]/50 uppercase backdrop-blur-sm">
                      ★ DRINKS ALL PLAY
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 min-w-0 flex flex-col justify-center space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-arcade text-[10px] text-[#39FF88] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#39FF88]/15 border border-[#39FF88]/30">
                      COQUETELARIA OFICIAL
                    </span>
                    <span className="font-display text-2xl text-white tabular-nums">
                      A PARTIR DE R$ 20,00
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase leading-tight break-words">
                    CARTA DE DRINKS & COQUETÉIS ILUMINADA
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed break-words">
                    Caipirinhas de Saquê, Vodka e Cachaça com frutas frescas, clássicos como Mojito, Sex on the Beach, Gin Tônica Tanqueray e os exclusivos Charada Gin Tropical e Charada Curaçau.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOrderClick('Charada Gin Tropical', 'R$ 35,00', 'Coquetéis')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39FF88] hover:bg-[#2ed671] text-black font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#39FF88]/30 transition-transform active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pedir Charada Gin Tropical</span>
                    </button>
                    <button
                      onClick={() => handleOrderClick('Caipirinha de Saquê', 'R$ 25,00', 'Coquetéis')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded border border-stone-700 transition-colors"
                    >
                      <span>Pedir Caipirinha Saquê</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentPhase.id === 'almoco-piscinao' && (
              <div className="relative group grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#21170A] via-[#1A1209] to-[#120B0A] border border-[#FFD23F]/35 shadow-2xl items-center overflow-hidden">
                <div className="relative md:col-span-5 min-w-0 rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-black/40 flex items-center justify-center">
                  <img
                    src={LUNCH_IMAGE}
                    alt="Prato de almoço executivo com bife acebolado, arroz, feijão, batata frita e salada"
                    className="block w-full h-auto md:w-auto md:h-[420px] md:max-w-full object-contain object-center"
                  />
                </div>
                <div className="md:col-span-7 min-w-0 space-y-3">
                  <span className="font-arcade text-[10px] text-[#FFD23F] uppercase tracking-wider">
                    FASE 05 · ALMOÇO EXECUTIVO
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase leading-tight break-words">
                    PAUSA PRA<br /><span className="text-[#E8541C]">RECARREGAR.</span>
                  </h3>
                  <p className="text-sm text-stone-300">{RESTAURANT_CONFIG.schedule.lunchTime}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPhase.items &&
                currentPhase.items
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, idx) => (
                    <TiltCard
                      key={idx}
                      className="p-5 rounded-xl bg-[#140F1D]/80 border gamer-card flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-bold text-sm text-white group-hover:text-[#2FE0E6] transition-colors">
                            {item.name}
                          </h4>
                          {item.price && (
                            <span className="font-display text-lg text-[#F59E0B] tabular-nums shrink-0">
                              {item.price}
                            </span>
                          )}
                        </div>

                        {item.category && (
                          <span className="font-arcade text-[9px] text-stone-400 uppercase block mb-2">
                            {item.category}
                          </span>
                        )}

                        <p className="text-xs text-stone-300 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                        <button
                          onClick={() => handleOrderClick(item.name, item.price || 'Consultar', item.category || currentPhase.title)}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#0A0710] hover:bg-[#E8541C] text-stone-200 hover:text-white font-bold text-xs uppercase rounded gamer-button border border-stone-800 hover:border-transparent transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Fazer Pedido</span>
                        </button>
                      </div>
                    </TiltCard>
                  ))}
            </div>
          </div>
        )}

        {/* Phase Footer CTAs: WhatsApp & Delivery */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#170E24] via-[#120B0A] to-[#170E24] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-display text-2xl text-white uppercase tracking-wide">
              Pronto para jogar e comer bem?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Garanta sua mesa com videogame antecipadamente ou peça pelo Keeta no conforto de casa.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0">
            <a
              href={RESTAURANT_CONFIG.social.keetaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFD23F] hover:bg-[#ffc91a] text-black font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#FFD23F]/20 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedir no Keeta</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(
                'Olá! Gostaria de reservar uma mesa na All Play Burguer São Mateus.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#E8541C]/30 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Reservar Mesa</span>
            </a>
          </div>
        </div>

      </div>

      {/* QUICK ORDER MODAL / DRAWER */}
      {selectedItemForOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#140F1D] border-2 border-[#2FE0E6] shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-arcade text-[10px] text-[#2FE0E6] uppercase tracking-wider">
                  ITEM SELECIONADO · {selectedItemForOrder.category}
                </span>
                <h3 className="font-display text-2xl text-white uppercase mt-0.5">
                  {selectedItemForOrder.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItemForOrder(null)}
                className="p-1 rounded text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0710] border border-stone-800 mb-6 flex items-center justify-between">
              <span className="text-xs text-stone-400">Preço / Condição:</span>
              <span className="font-display text-2xl text-[#F59E0B]">
                {selectedItemForOrder.price}
              </span>
            </div>

            <p className="text-xs text-stone-300 mb-6 leading-relaxed">
              Como você deseja pedir este item agora?
            </p>

            <div className="space-y-3">
              <a
                href={RESTAURANT_CONFIG.social.keetaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedItemForOrder(null)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFD23F] hover:bg-[#ffc91a] text-black font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#FFD23F]/25 transition-transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pedir no Keeta (Delivery Oficial)</span>
              </a>

              <button
                onClick={() => sendOrderToWhatsApp(selectedItemForOrder)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#E8541C]/30 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enviar Pedido pelo WhatsApp</span>
              </button>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
