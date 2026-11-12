# Cromeação Primos — site institucional

React, TypeScript e Vite. Identidade prata, grafite e azul, vitrine de peças na abertura, fotografias fornecidas pela empresa e página dedicada a Mario Reis. Não há backend ou envio automático de mensagens.

## Rodar

```sh
npm ci
npm run dev -- --port 5175
```

Prévia: http://127.0.0.1:5175/#/inicio. Biografia: http://127.0.0.1:5175/#/mario-reis.

Build e TypeScript: `npm run build`. Testes: com o servidor na porta 5175, execute `npx playwright install chromium` na primeira vez e `npm run test:ui`.

## Páginas e jornada

- Início: abertura fotográfica com três prévias clicáveis, faixa animada com pausa, mosaicos, oito categorias de peças, carro-chefe, explorador dos dois banhos, jornada ilustrada do pedido, Mario, licenças e dúvidas.
- Peças e aplicações: catálogo filtrável por aplicação, oito categorias com página própria e galeria ampliável. São 23 fotografias reais selecionadas após a retirada da foto das molas amarelas.
- Hastes de panela: apresentação como especialistas no acabamento, com seis registros.
- Banhos e acabamentos: cromação e niquelação, com comparação dos serviços e orientação para o orçamento.
- Processo: seis etapas usuais, da avaliação da peça à conferência do acabamento, em linguagem acessível.
- Mario Reis: retrato com tratamento de fundo, biografia, linha do tempo e fotos reais de trabalho.
- Empresa: atuação e cinco documentos de registro, funcionamento, vistoria e segurança, de quatro órgãos, conferidos nas cópias enviadas pelo cliente.
- Contato: WhatsApp, e-mail, Instagram e preparação de orçamento com nome da peça e banho vindos da navegação.

Rotas estáticas por hash. A entrada padrão é Início. Links antigos de serviços e trabalhos redirecionam para as novas páginas. O formulário prepara o resumo; o visitante revisa e escolhe continuar no WhatsApp ou copiar. Fotos são anexadas na conversa. O material e a quantidade podem ficar desconhecidos.

## Conteúdo editável

- `src/final-data.ts`: dados comerciais, biografia, banhos, dúvidas e links.
- `src/client-media.json`: fotos e categorias.
- `src/components/FinalPages.tsx`: páginas e seções.
- `src/components/FinalShared.tsx`: componentes compartilhados.
- `src/components/Redesign.tsx`: abertura, apresentação, catálogo filtrável e jornada do pedido.
- `src/components/PieceStudio.tsx` e `src/piece-renderer.ts`: estúdio 3D sob demanda.
- `src/App.tsx`: navegação, menu, efeitos e modal.
- `src/final.css`: componentes base e responsividade; `src/editorial.css`: estúdio; `src/redesign.css`: nova direção visual e layouts.
- `public/media/cliente/`: WebPs de fotos, versões menores e retratos.

Sem bibliotecas de animação: CSS, IntersectionObserver e requestAnimationFrame. A barra de leitura não dispara renderizações da aplicação a cada rolagem. Movimento reduzido, teclado, Escape e retorno de foco no modal são respeitados. A vitrine não gira automaticamente.

A apresentação usa tipografia de leitura ampliada, seções compactas, entradas leves nos t?tulos, textos, fotos e cards ao subir e descer e reflexo nas fotos ao passar o cursor. Se??es grandes ficam est?ticas e vis?veis para reduzir o custo de composi??o. A faixa só se movimenta quando visível e pode ser pausada. Movimento reduzido desliga os efeitos adicionais. O 3D continua separado e carregado apenas após interação.

## Fontes e pendências

[Conteúdo recebido e pendências](docs/CONTEUDO-FINAL.md), [origem das fotos](docs/ORIGEM-FOTOS.json), [referências visuais](docs/REFERENCIAS-VISUAIS.md) e [prompt do tratamento do retrato](docs/PROMPT-RETRATO.md).

**Escopo final definido pelo cliente:** cromação e niquelação são os dois banhos apresentados. O processo explica as etapas usuais, ajustadas conforme material e aplicação: [base editorial e técnica](docs/PROCESSO-EDITORIAL.md). As licenças aparecem por órgão e tipo, sem datas ou afirmação de vigência atual: [conferência e manutenção](docs/LICENCAS.md). Os PDFs integrais não ficam públicos nem têm links de download.

O e-mail informado é cromeacaoprimos@gmail.com. O WhatsApp permanece o canal comercial já confirmado no perfil. As fotografias de peças não tiveram conteúdo alterado; apenas o fundo do retrato de Mario foi tratado com image_gen, com o original preservado e a edição documentada.

Noindex mantido. Não foi configurada publicação em domínio público.

## Verificação

Teste automatizado em Chromium a 360, 390, 768 e 1440 px: 15 páginas (sete principais e oito categorias), sem rolagem horizontal, fotos decodificadas, vitrine manual, navegação e menu, biografia, modal com teclado e foco, formulário contextual, mensagem codificada, clipboard, e-mail e dúvidas. Testados abertura/reentrada das animações, movimento reduzido, rotas antigas, seleção dos dois banhos, seis etapas do processo e ausência de comprovantes PDF na área pública. Capturas em .playwright/final (não versionadas). O teste verifica os links de contato sem enviar mensagens.

As capturas de desktop e celular foram inspecionadas. Não foram feitos testes em aparelhos físicos nem em outros navegadores.

Revisão pelos oito áudios da Laís: Mario é apresentado por seus mais de 40 anos de experiência, sem atribuir a ele a fundação da empresa; a Primos está no mercado desde 2002. Ferro, metais e zamac recebem destaque conjunto. As licenças aparecem por tipo e órgão, sem datas ou declaração de vigência atual. A imagem amarela anterior ao serviço saiu do catálogo; apenas a foto prateada de molas permanece.
