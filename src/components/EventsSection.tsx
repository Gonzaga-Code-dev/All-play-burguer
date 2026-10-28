/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PartyPopper, Users, Calendar, Trophy, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

export const EventsSection: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('15');
  const [eventType, setEventType] = useState('Aniversário Infantil');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `🎉 *ORÇAMENTO DE EVENTO - ALL PLAY SÃO MATEUS*
• *Nome:* ${name}
• *Data desejada:* ${date || 'A combinar'}
• *Nº de convidados:* ${guests} pessoas
• *Tipo de Evento:* ${eventType}
• *Observações:* ${notes || 'Nenhuma'}`;

    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="eventos" className="relative py-20 bg-[#120B0A] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2FE0E6]/30 bg-[#170F0E] mb-3">
            <PartyPopper className="w-3.5 h-3.5 text-[#2FE0E6]" />
            <span className="font-arcade text-xs text-[#2FE0E6] uppercase tracking-wider">
              Fase 05 · Salão Privativo
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase leading-tight">
            COMEMORE SEU ANIVERSÁRIO <span className="text-[#E8541C]">AQUI</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Espaço privativo exclusivo com videogames dedicados, acesso ao parque de trampolim, pacotes de rodízio especiais e muita diversão para todas as idades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Event Features & Monthly Attractions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-[#170F0E] border border-stone-800 space-y-4">
              <h3 className="font-display text-2xl text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E8541C]" /> O Que Inclui o Espaço Privativo
              </h3>
              
              <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                  <span>Área reservada com mesas exclusivas e decoração gamer</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                  <span>Videogames em todas as mesas com torneios multiplayer configurados</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                  <span>Acesso liberado ao parque de trampolim do piso superior e brinquedão</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                  <span>Pacotes de rodízio especial para festas com mini burgers, pizzas e refil</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                  <span>Garçons e monitores dedicados durante toda a comemoração</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden border border-stone-800 group h-36">
                <img
                  src="/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_13_42_e1bee769.png"
                  alt="Mesas e salão real com fliperama para festas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[11px] font-bold text-white">
                  Salão & Mesas Gamer
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-stone-800 group h-36">
                <img
                  src="/assets/aistudio/Imagem_do_ChatGPT_27_de_out._de_2026__22_00_34_25c4084d.png"
                  alt="Espaço kids real com labirinto e escorregador para aniversários"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[11px] font-bold text-white">
                  Brinquedão Integrado
                </span>
              </div>
            </div>

            {/* Attractions of the Month Box */}
            <div className="p-6 rounded-2xl bg-[#170F0E] border border-[#2FE0E6]/30 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl text-white uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#2FE0E6]" /> Atrações & Programação Especial
                </h4>
                <span className="font-arcade text-[9px] text-[#2FE0E6] px-2 py-0.5 bg-[#2FE0E6]/10 rounded border border-[#2FE0E6]/30 uppercase">
                  CONFIRA
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#120B0A] border border-stone-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Quintas Gamer: Torneios de Futebol Virtual</p>
                    <p className="text-stone-400 text-[11px]">Disputas valendo taças gourmet para o campeão!</p>
                  </div>
                  <span className="font-arcade text-[10px] text-amber-400">19H</span>
                </div>

                <div className="p-3 rounded-lg bg-[#120B0A] border border-stone-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Fins de Semana em Família</p>
                    <p className="text-stone-400 text-[11px]">Monitores com recreação e brincadeiras no trampolim.</p>
                  </div>
                  <span className="font-arcade text-[10px] text-[#39FF88]">12H-23H</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Quotation Form to WhatsApp */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#170F0E] border border-stone-800 shadow-2xl">
            <div className="mb-6">
              <span className="font-arcade text-xs text-[#E8541C] uppercase block mb-1">
                Orçamento Sem Compromisso
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white uppercase">
                SOLICITE UMA COTAÇÃO RÁPIDA
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Preencha os dados abaixo e enviaremos o cardápio e orçamento completo direto no seu WhatsApp!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carolina Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B0A] border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#E8541C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Data Desejada
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B0A] border border-stone-700 text-white text-xs focus:outline-none focus:border-[#E8541C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Nº Estimado de Pessoas *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B0A] border border-stone-700 text-white text-xs focus:outline-none focus:border-[#E8541C]"
                  >
                    <option value="10 a 15">10 a 15 pessoas</option>
                    <option value="15 a 25">15 a 25 pessoas</option>
                    <option value="25 a 40">25 a 40 pessoas</option>
                    <option value="40+">Mais de 40 pessoas (Salão Fechado)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Tipo de Evento *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B0A] border border-stone-700 text-white text-xs focus:outline-none focus:border-[#E8541C]"
                >
                  <option value="Aniversário Infantil">Aniversário Infantil</option>
                  <option value="Festa Teen / Gamer">Festa de Adolescente / Gamer</option>
                  <option value="Confraternização de Empresa">Confraternização de Empresa</option>
                  <option value="Encontro de Amigos / Família">Encontro de Amigos / Família</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Observações ou Pedidos Especiais
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Gostaria de saber sobre bolo, horário ou reserva do trampolim..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B0A] border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#E8541C]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#E8541C]/30 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitação via WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
