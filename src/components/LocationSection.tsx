/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Clock, Navigation, AlertCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="relative py-20 bg-[#120B0A] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2FE0E6]/30 bg-[#170F0E] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#2FE0E6]" />
            <span className="font-arcade text-xs text-[#2FE0E6] uppercase tracking-wider">
              Localização · Ponto de Encontro
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
            ONDE <span className="text-[#E8541C]">ESTAMOS</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Localizado no coração de São Mateus, com fácil acesso e estacionamento nas proximidades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#170F0E] border border-stone-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-[#E8541C]/20 text-[#E8541C] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white uppercase tracking-wide">
                    Endereço Completo
                  </h3>
                  <p className="text-sm text-stone-200 mt-1 font-medium">
                    {RESTAURANT_CONFIG.address.street}
                  </p>
                  <p className="text-xs text-stone-400">
                    {RESTAURANT_CONFIG.address.neighborhood} · {RESTAURANT_CONFIG.address.city} - {RESTAURANT_CONFIG.address.state}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    CEP: {RESTAURANT_CONFIG.address.cep}
                  </p>
                </div>
              </div>

              {/* Direct Navigation Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={RESTAURANT_CONFIG.social.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#120B0A] hover:bg-stone-800 text-xs font-bold text-stone-200 hover:text-white border border-stone-700 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#2FE0E6]" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={RESTAURANT_CONFIG.social.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#120B0A] hover:bg-stone-800 text-xs font-bold text-stone-200 hover:text-white border border-stone-700 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>Waze</span>
                </a>
              </div>
            </div>

            {/* Hours & Direct Call Card */}
            <div className="p-6 rounded-2xl bg-[#170F0E] border border-stone-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-[#2FE0E6]/20 text-[#2FE0E6] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white uppercase tracking-wide">
                    Horário de Funcionamento
                  </h3>
                  <p className="text-sm font-bold text-stone-100 mt-1">
                    {RESTAURANT_CONFIG.schedule.general}
                  </p>
                  <p className="text-xs text-stone-300 mt-1">
                    {RESTAURANT_CONFIG.schedule.pizzaTime}
                  </p>
                </div>
              </div>

              {/* Direct Call Button (Mobile friendly) */}
              <div className="pt-3 border-t border-stone-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#39FF88]" />
                    <span className="text-xs text-stone-300">Telefone fixo:</span>
                  </div>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.phoneRaw}`}
                    className="font-mono text-sm font-bold text-white hover:text-[#E8541C] transition-colors"
                  >
                    {RESTAURANT_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Peak Hours Notice */}
            <div className="p-4 rounded-xl bg-[#170F0E] border border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-300 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5">Dica para horários de pico:</strong>
                {RESTAURANT_CONFIG.schedule.peakWarning}
              </div>
            </div>

          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 h-96 lg:h-[460px] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative">
            <iframe
              title="Mapa All Play Burguer São Mateus"
              src="https://maps.google.com/maps?q=Av.+Sat%C3%A9lite,+145+-+S%C3%A3o+Mateus,+S%C3%A3o+Paulo+-+SP,+08330-480&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Quick button pinned on map */}
            <div className="absolute bottom-4 right-4">
              <a
                href={RESTAURANT_CONFIG.social.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E8541C] hover:bg-[#d04511] text-white font-bold text-xs uppercase tracking-wider rounded gamer-button shadow-lg shadow-[#E8541C]/40 transition-transform active:scale-95"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Como Chegar</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
