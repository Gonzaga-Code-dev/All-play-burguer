/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.ts';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(
    RESTAURANT_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <aside aria-label="Ações rápidas de contato e delivery" className="fixed bottom-5 right-5 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
      <a
        href={RESTAURANT_CONFIG.social.keetaUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir delivery pelo Keeta"
        className="group flex items-center gap-2 px-3.5 py-2.5 bg-[#FFD23F] hover:bg-[#ffc91a] text-black rounded-full shadow-2xl shadow-black/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-black/20"
      >
        <span className="font-arcade text-[10px] font-bold uppercase tracking-wider">
          KEETA DELIVERY
        </span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp e reservar mesa"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline-block">
          Reservar Mesa
        </span>
      </a>
    </aside>
  );
};
