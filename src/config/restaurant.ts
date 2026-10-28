/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RestaurantConfig {
  name: string;
  slogan: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappDisplay: string;
  whatsappDefaultMessage: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    full: string;
    short: string;
  };
  schedule: {
    general: string;
    pizzaTime: string;
    lunchTime: string;
    peakWarning: string;
  };
  ratings: {
    google: {
      score: number;
      count: string;
      url: string;
    };
    ifood: {
      score: number;
      url: string;
    };
  };
  social: {
    instagram: string;
    instagramUrl: string;
    facebook: string;
    facebookUrl: string;
    ifoodUrl: string;
    keetaUrl: string;
    googleMapsUrl: string;
    wazeUrl: string;
  };
  pricing: {
    rodizio: {
      segundaQuintaAlmoco: { classic: number; vip: number };
      segundaQuintaJantar: { classic: number; vip: number };
      fdsFeriados: { classic: number; vip: number };
      criancas: {
        gratisMaxAge: number;
        meiaMaxAge: number;
        docNote: string;
      };
    };
    piscinao: {
      fromPrice: number;
      serves: string;
      availability: string;
    };
    tacas: {
      basePrice: number;
    };
  };
  attractions: {
    title: string;
    subtitle: string;
    description: string;
  }[];
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "All Play Burguer São Mateus",
  slogan: "Aqui todos jogam!",
  tagline: "A hamburgueria temática de videogame de São Paulo",
  phone: "(11) 2367-7806",
  phoneRaw: "1123677806",
  whatsapp: "551123677806",
  whatsappDisplay: "(11) 2367-7806",
  whatsappDefaultMessage: "Olá! Vim pelo site da All Play Burguer São Mateus e quero reservar uma mesa.",
  address: {
    street: "Av. Satélite, 145",
    neighborhood: "São Mateus",
    city: "São Paulo",
    state: "SP",
    cep: "08330-480",
    full: "Av. Satélite, 145 · São Mateus, São Paulo - SP · CEP 08330-480",
    short: "Av. Satélite, 145 · São Mateus, SP"
  },
  schedule: {
    general: "Todos os dias das 12h às 23h",
    pizzaTime: "Pizzas no rodízio de segunda a sexta a partir das 14h (sábados, domingos e feriados o dia todo)",
    lunchTime: "Almoço executivo das 12h às 15h",
    peakWarning: "Em horários de pico (noites de sexta, sábados e domingos), pode haver tempo de espera. Recomendamos chegar cedo ou reservar com antecedência!"
  },
  ratings: {
    google: {
      score: 4.4,
      count: "mais de 3.200 avaliações",
      url: "https://www.google.com/maps/place/All+Play+Burguer/@-23.5985,-46.4862,17z"
    },
    ifood: {
      score: 4.8,
      url: "https://www.ifood.com.br"
    }
  },
  social: {
    instagram: "@allplay_saomateus",
    instagramUrl: "https://www.instagram.com/allplay_saomateus",
    facebook: "All Play Burguer São Mateus",
    facebookUrl: "https://www.facebook.com",
    ifoodUrl: "https://www.ifood.com.br",
    keetaUrl: "https://fooddelivery-eu.mykeeta.com/mpweb/shop_golden?useShopPoi=1&channel=googlemap&shopId=159486843&cityId=102302389&lch=default%7E*googlemap%7E*BR%7E*159486843&locale=pt-BR&region=BR&utm_source=organic&utm_medium=others&utm_campaign=googlemap",
    googleMapsUrl: "https://maps.google.com/?q=Av.+Sat%C3%A9lite,+145+-+S%C3%A3o+Mateus,+S%C3%A3o+Paulo+-+SP,+08330-480",
    wazeUrl: "https://waze.com/ul?q=Av.+Sat%C3%A9lite,+145+-+S%C3%A3o+Mateus"
  },
  pricing: {
    rodizio: {
      segundaQuintaAlmoco: { classic: 59.90, vip: 69.90 },
      segundaQuintaJantar: { classic: 69.90, vip: 79.90 },
      fdsFeriados: { classic: 79.90, vip: 89.90 },
      criancas: {
        gratisMaxAge: 4,
        meiaMaxAge: 9,
        docNote: "0 a 4 anos não pagam · 5 a 9 anos pagam meia (Classic ou VIP), mediante apresentação de documento com foto"
      }
    },
    piscinao: {
      fromPrice: 49.90,
      serves: "Serve de 2 a 3 pessoas",
      availability: "Segunda a Sexta · Salão e Delivery"
    },
    tacas: {
      basePrice: 49.90
    }
  },
  attractions: [
    {
      title: "Videogame em Todas as Mesas",
      subtitle: "Jogos retrô e da nova geração",
      description: "Controles higienizados e biblioteca com centenas de jogos lendários para disputar em multiplayer enquanto você come."
    },
    {
      title: "Parque de Trampolim",
      subtitle: "Piso superior com muita energia",
      description: "Área de trampolins e saltos segura com monitoria no andar superior para a garotada gastar energia."
    },
    {
      title: "Espaço Kids Completo",
      subtitle: "Diversão segura para os pequenos",
      description: "Brinquedão, labirinto, piscina de bolinhas e monitores dedicados cuidando com carinho e segurança."
    },
    {
      title: "Espaço Privativo para Eventos",
      subtitle: "Aniversários e confraternizações",
      description: "Salão exclusivo com videogames dedicados, pacotes de rodízio especiais e decoração temática."
    }
  ]
};
