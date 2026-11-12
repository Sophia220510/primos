# Cromeação Primos — versão de apresentação final

React, TypeScript e Vite. Identidade prata, grafite e azul, vitrine de peças na abertura, fotografias fornecidas pela empresa e página dedicada a Mario Reis. Não há backend ou envio automático de mensagens.

## Rodar

```sh
npm ci
npm run dev -- --port 5175
```

Prévia: http://127.0.0.1:5175/#/inicio. Biografia: http://127.0.0.1:5175/#/mario-reis.

Build e TypeScript: `npm run build`. Testes: com o servidor na porta 5175, execute `npx playwright install chromium` na primeira vez e `npm run test:ui`.

## Páginas e jornada

- Início: vitrine manual de três destaques, peças, carro-chefe, banhos, Mario, licenças, dúvidas e orçamento.
- Peças e aplicações: oito categorias, cada uma com sua página e galeria ampliável. São 24 fotografias reais selecionadas.
- Hastes de panela: destaque como carro-chefe, com seis registros.
- Banhos e acabamentos: cromação e niquelação, além de consulta sobre os outros banhos.
- Processo: consulta e cuidados com a peça, sem inventar uma sequência química da empresa.
- Mario Reis: retrato com tratamento de fundo, biografia, linha do tempo e fotos reais de trabalho.
- Empresa: atuação e cinco documentos de registro, funcionamento, vistoria e segurança, de quatro órgãos, conferidos nas cópias enviadas pelo cliente.
- Contato: WhatsApp, e-mail, Instagram e preparação de orçamento com nome da peça e banho vindos da navegação.

Rotas estáticas por hash. A entrada padrão é Início. Links antigos de serviços e trabalhos redirecionam para as novas páginas. O formulário prepara o resumo; o visitante revisa e escolhe continuar no WhatsApp ou copiar. Fotos são anexadas na conversa. O material e a quantidade podem ficar desconhecidos.

## Conteúdo editável

- `src/final-data.ts`: dados comerciais, biografia, banhos, dúvidas e links.
- `src/client-media.json`: fotos e categorias.
- `src/components/FinalPages.tsx`: páginas e seções.
- `src/components/FinalShared.tsx`: componentes compartilhados.
- `src/App.tsx`: navegação, menu, efeitos e modal.
- `src/final.css`: identidade e responsividade.
- `public/media/cliente/`: WebPs de fotos, versões menores e retratos.

Sem bibliotecas de animação: CSS, IntersectionObserver e requestAnimationFrame. A barra de leitura não dispara renderizações da aplicação a cada rolagem. Movimento reduzido, teclado, Escape e retorno de foco no modal são respeitados. A vitrine não gira automaticamente.

## Fontes e pendências

[Conteúdo recebido e pendências](docs/CONTEUDO-FINAL.md), [origem das fotos](docs/ORIGEM-FOTOS.json), [referências visuais](docs/REFERENCIAS-VISUAIS.md) e [prompt do tratamento do retrato](docs/PROMPT-RETRATO.md).

**Para fechar a redação técnica:** faltam os nomes de todos os outros banhos e a explicação dos procedimentos específicos da empresa. Os ZIPs continham fotos. Não foram inventados banhos adicionais, prazos, garantias ou certificações. As licenças já foram incluídas com os períodos dos cinco comprovantes: [conferência e manutenção](docs/LICENCAS.md). Endereço comercial e horários podem ser confirmados caso queiram mostrá-los.

O e-mail informado é cromeacaoprimos@gmail.com. O WhatsApp permanece o canal comercial já confirmado no perfil. As fotografias de peças não tiveram conteúdo alterado; apenas o fundo do retrato de Mario foi tratado com image_gen, com o original preservado e a edição documentada.

Noindex mantido. Não foi configurada publicação em domínio público.

## Verificação

Teste automatizado em Chromium a 360, 390, 768 e 1440 px: 15 páginas (sete principais e oito categorias), sem rolagem horizontal, fotos decodificadas, vitrine manual, navegação e menu, biografia, modal com teclado e foco, formulário contextual, mensagem codificada, clipboard, e-mail e dúvidas. Testados abertura/reentrada das animações, movimento reduzido e rotas antigas. Capturas em .playwright/final (não versionadas). O teste verifica os links de contato sem enviar mensagens.

As capturas de desktop e celular foram inspecionadas. Não foram feitos testes em aparelhos físicos nem em outros navegadores.
