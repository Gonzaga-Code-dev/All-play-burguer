# All Play Burguer São Mateus — Documentação do Site

Site oficial de página única (single page) para a hamburgueria temática de videogame **All Play Burguer São Mateus** em São Paulo.

---

## 🎮 Estrutura dos Arquivos de Configuração

Todas as variáveis do estabelecimento estão centralizadas para facilitar alterações sem necessidade de mexer no código de layout:

### 1. Dados da Casa, Preços e Horários
Edite o arquivo:
📁 `/src/config/restaurant.ts`

Neste arquivo você pode alterar:
- **Telefone e WhatsApp:** altere `phone`, `phoneRaw` e `whatsapp`.
- **Endereço e CEP:** altere o bloco `address`.
- **Horários de funcionamento:** altere `schedule.general`, `pizzaTime` e avisos de pico.
- **Valores do Rodízio:**
  - Almoço (segunda a quinta): Classic e VIP
  - Jantar (segunda a quinta): Classic e VIP
  - Finais de semana e feriados: Classic e VIP
  - Idades de gratuidade e meia-entrada para crianças
- **Piscinão All Play:** valores por pessoa e dias de disponibilidade.
- **Links sociais:** URLs do Instagram, iFood, Google Maps e Waze.

---

### 2. Cardápio Completo (5 Fases Gamer)
Edite o arquivo:
📁 `/src/data/menu.json`

O cardápio está estruturado em 5 fases:
1. **Fase 01 · Rodízio:** Entradas Classic, Entradas Exclusivas VIP (com tag `isVipOnly: true`), 9 sabores de Mini Burgers, 12 sabores de Pizzas Salgadas e Pizzas Doces.
2. **Fase 02 · Burgers & Pizzas À La Carte:** Hambúrgueres individuais e pizzas grandes com preços.
3. **Fase 03 · Taças & Sobremesas:** Taças monumentais (Kinder Bueno, Ferrero Rocher, Leite Ninho, Oreo, Sedução, Francesa), Petit Gateau, Açaí e Milk Shakes.
4. **Fase 04 · Drinks & Bebidas:** Caipirinhas, Gin Tropical, Drinks autorais, Cervejas e Refil livre.
5. **Fase 05 · Almoço Executivo & Piscinão:** Pratos do dia caseiros e o épico Piscinão All Play.

Para adicionar um item novo, basta copiar um bloco no formato:
```json
{
  "name": "Nome do Prato",
  "category": "Categoria",
  "price": "R$ 39,90",
  "description": "Descrição apetitosa dos ingredientes."
}
```

---

### 3. Abertura em Vídeo (`VideoIntroGate.tsx`)
📁 `/src/components/VideoIntroGate.tsx` e `/src/utils/audioSynth.ts`

- **Vídeo Oficial Carregado:** `/assets/aistudio/dreamina-2026-09-08-8971_4b95a25d.mp4`
- **Tela Inicial Interativa:** Exibe o logo com o botão **"PRESS START"** (desbloqueia a reprodução de áudio sem bloqueio de autoplay do navegador).
- **Vídeo em Tela Cheia:** Reprodução com som sincronizado, barra de progresso em tempo real e botão discreto de **"Pular"**.
- **Transição Suave para o Hero:** Ao terminar ou pular, ocorre um crossfade suave para a imagem de alta definição no topo do site (hero), garantindo continuidade visual perfeita como um único plano contínuo.
- **Rever Introdução:** O visitante pode rever a introdução a qualquer momento clicando em **"Intro"** no menu ou **"Rever Introdução"** no rodapé.

---

## 🚀 Como Executar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Compilar para produção
npm run build
```
