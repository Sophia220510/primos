# Direção visual e estúdio de peças

Revisão editorial industrial: grafite, prata e azul da marca, tipografia ampla, fotografia real e contraste entre superfícies claras e escuras. Orientações consultadas: Sites (presentation-led) e Vercel React Best Practices.

As páginas de hastes, canoplas e guidões oferecem um estúdio tridimensional. São modelos geométricos ilustrativos, identificados como tal na interface, e não digitalizações ou desenhos dimensionais das peças do cliente. A galeria real permanece disponível em cada página.

O renderer Three.js é importado apenas ao clicar em explorar. Não existem downloads de modelos, HDRs ou texturas externas. O ambiente de reflexão é gerado localmente. A densidade de pixels fica limitada a 1,5 e a animação a aproximadamente 30 quadros por segundo. O loop para quando a área sai da tela, a aba fica oculta ou o visitante pausa. Movimento reduzido inicia estático. Geometrias, materiais, ambiente e renderer são descartados ao sair da página.

Arraste horizontal preserva rolagem vertical no celular. Botões permitem giro pelo teclado, pausa e retorno ao ângulo inicial. Se WebGL não estiver disponível, a fotografia permanece no lugar.

Validação: `npm run build`, `npm run test:ui`, `npm run test:3d`. Testes Chromium com larguras de celular e desktop; isso não substitui medição em todos os aparelhos físicos. Teste 3D usa SwiftShader para reproduzir WebGL em automação.

Referência técnica: https://threejs.org/docs/pages/WebGLRenderer
