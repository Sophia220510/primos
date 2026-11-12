# Direção visual e estúdio de peças

Revisão editorial industrial: grafite, prata e azul da marca, tipografia ampla, fotografia real e contraste entre superfícies claras e escuras. Orientações consultadas: Sites (presentation-led) e Vercel React Best Practices.

As páginas de hastes, canoplas e guidões oferecem um estúdio tridimensional. São modelos geométricos ilustrativos, identificados como tal na interface, e não digitalizações ou desenhos dimensionais das peças do cliente. A galeria real permanece disponível em cada página.

O renderer Three.js é importado apenas ao clicar em explorar. Não existem downloads de modelos, HDRs ou texturas externas. O ambiente usa seis cartões de luz de 128 px gerados localmente, sem renderizar uma sala. A densidade de pixels fica limitada a 1,25 no toque e 1,5 no desktop. O estúdio abre estático em todos os aparelhos: renderiza sob demanda e encerra os frames quando a interação estabiliza. A animação opcional usa delta de tempo e interpolação, sem o corte antigo em 30 fps; para fora da tela ou com a aba oculta. Geometrias, materiais, ambiente e contexto são liberados ao sair da página.

Os modelos foram refeitos observando as fotografias: hastes achatadas com furo passante, canoplas cilíndricas abertas e guidões tubulares. O enquadramento é calculado pelo tamanho da peça e do viewport. O giro automático oscila de forma limitada para manter o acabamento visível. Arrastar pausa a animação; o mouse controla dois eixos e o toque mantém a rolagem vertical.

O restante do site não tem callback JavaScript de scroll nem parallax de imagem ampla. A barra de leitura usa scroll timeline nativa, com fallback sem barra. As entradas de cards ocorrem uma vez. Seções grandes permanecem visíveis e sem transformações; filtros e blur de fundo foram removidos das superfícies principais. As imagens do catálogo e miniaturas têm sizes correspondentes ao tamanho real na tela.

Arraste horizontal preserva rolagem vertical no celular. Botões permitem giro pelo teclado, pausa e retorno ao ângulo inicial. Se WebGL não estiver disponível, a fotografia permanece no lugar.

Validação: `npm run build`, `npm run test:ui`, `npm run test:3d`. Testes Chromium com larguras de celular e desktop; isso não substitui medição em todos os aparelhos físicos. Teste 3D usa SwiftShader para reproduzir WebGL em automação.

Referências técnicas: https://threejs.org/manual/pages/rendering-on-demand.html e https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline
