/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gamepad2, Sparkles, Smile, ShieldCheck } from 'lucide-react';

const SALON_ARCADE_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_13_42_e1bee769.png';
const KIDS_PLAYGROUND_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_00_34_25c4084d.png';
const GAMING_TABLES_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_36_03_32c8a634.png';
const TRAMPOLINE_PARK_IMAGE = '/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_37_18_bdfb3c49.png';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      step: '01',
      title: 'Videogame em Todas as Mesas',
      subtitle: 'Controles em mãos enquanto você come',
      description:
        'Cabines com consoles dedicados e dois controles por mesa. Jogue Super Mario, clássicos retrô e multiplayer enquanto saboreia o rodízio.',
      icon: Gamepad2,
      accent: '#2FE0E6',
      badge: 'FOTO REAL DA MESA',
      image: GAMING_TABLES_IMAGE
    },
    {
      step: '02',
      title: 'Parque de Trampolim Superior',
      subtitle: 'Piso superior com pura adrenalina neon',
      description:
        'Mezanino exclusivo com camas elásticas integradas, iluminação neon ultravioleta, cestas e redes de proteção para gastar energia.',
      icon: Sparkles,
      accent: '#FF2E93',
      badge: 'FOTO REAL DO TRAMPOLIM',
      image: TRAMPOLINE_PARK_IMAGE
    },
    {
      step: '03',
      title: 'Espaço Kids Monumental',
      subtitle: 'Brinquedão multinível de labirinto e escorregador',
      description:
        'Brinquedão gigante com tubos, escorregadores amarelos, área baby e grama sintética para a garotada brincar em segurança total.',
      icon: Smile,
      accent: '#39FF88',
      badge: 'FOTO REAL DO BRINQUEDÃO',
      image: KIDS_PLAYGROUND_IMAGE
    },
    {
      step: '04',
      title: 'Salão Privativo & Cabines Gamer',
      subtitle: 'Luminárias Pac-Man e mesas arcade',
      description:
        'Salão amplo com decoração temática, luminárias do Pac-Man e blocos interrogação, ideal para aniversários e eventos corporativos.',
      icon: ShieldCheck,
      accent: '#C98A3D',
      badge: 'FOTO REAL DO SALÃO',
      image: SALON_ARCADE_IMAGE
    }
  ];

  return (
    <section id="experiencia" className="relative py-20 bg-[#0F0908] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-arcade text-xs text-[#2FE0E6] uppercase tracking-wider">
                Fase 02 · A Experiência Real
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
              AQUI A DIVERSÃO NUNCA DÁ <span className="text-[#E8541C]">GAME OVER</span>
            </h2>
          </div>
          <p className="text-stone-300 text-sm md:text-base max-w-md leading-relaxed">
            Fotos reais da nossa unidade em São Mateus: mesas gamer interativas, brinquedão gigante e ambiente temático único em São Paulo.
          </p>
        </div>

        {/* Featured Real Photo Banner: Restaurant Salon & Arcade Booths */}
        <div className="relative mb-12 rounded-2xl overflow-hidden border border-stone-800 group shadow-2xl">
          <img
            src={SALON_ARCADE_IMAGE}
            alt="Interior real da All Play Burguer São Mateus com mesas de fliperama e luminárias temáticas"
            referrerPolicy="no-referrer"
            className="w-full h-80 sm:h-96 md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-[#120B0A]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="font-arcade text-[10px] md:text-xs text-[#2FE0E6] uppercase tracking-widest px-2.5 py-1 bg-[#2FE0E6]/15 border border-[#2FE0E6]/40 rounded mb-2 inline-block">
                ★ FOTO REAL DO SALÃO ALL PLAY
              </span>
              <h3 className="font-display text-2xl md:text-4xl text-white tracking-wide uppercase">
                MESAS COM VIDEOGAME, FLIPERAMA & LUMINÁRIAS RETRÔ
              </h3>
              <p className="text-xs md:text-sm text-stone-200 mt-1 max-w-xl">
                Cabines temáticas confortáveis com tampos de arcade retroiluminados, blocos de interrogação, fantasmas do Pac-Man e jogos para a mesa inteira disputar.
              </p>
            </div>

            <a
              href="#rodizio"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-stone-900 hover:bg-[#E8541C] hover:text-white font-bold text-xs uppercase tracking-wider rounded gamer-button transition-colors whitespace-nowrap self-start md:self-auto"
            >
              Ver Valores do Rodízio
            </a>
          </div>
        </div>

        {/* 4 Interactive Feature Cards with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={exp.step}
                className="relative rounded-xl bg-[#170F0E] border border-stone-800/90 hover:border-stone-700 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 hover:shadow-xl"
              >
                {exp.image && (
                  <div className="relative h-44 w-full overflow-hidden border-b border-stone-800">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="font-arcade text-[9px] text-[#39FF88] px-2 py-0.5 rounded bg-black/80 border border-[#39FF88]/40 uppercase backdrop-blur-sm">
                        REAL
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${exp.accent}15`, color: exp.accent }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-arcade text-[10px] text-stone-400 border border-stone-800 px-2 py-0.5 rounded uppercase">
                        {exp.badge}
                      </span>
                    </div>

                    <span className="font-arcade text-[10px] text-stone-400 block mb-1">
                      {exp.step}
                    </span>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-[#E8541C] transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-xs font-medium text-stone-400 mb-2">{exp.subtitle}</p>
                    <p className="text-xs text-stone-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
