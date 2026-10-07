# Cromeação Primos — apresentação comercial

Site em React, TypeScript e Vite, com oito páginas navegáveis: início, serviços, cromação, niquelação, trabalhos, processo, empresa e contato. Identidade em prata, preto/grafite e azul, derivada do logo oficial, com áreas claras de leitura, tipografia editorial e fotografias reais. O logo é o publicado no perfil oficial.

## Executar

```sh
npm ci
npm run dev -- --port 5175
```

Prévia local: http://127.0.0.1:5175/. Build e TypeScript: `npm run build`. A entrada padrão é `#/inicio`, com “Início” destacado no menu. As páginas usam URLs como `#/trabalhos`, compatíveis com hospedagem estática. Serviços detalhados pertencem ao grupo “Serviços” e possuem breadcrumbs para retornar. Não foi feita publicação em domínio público. Noindex e robots.txt estão configurados.

## Conteúdo e manutenção

- `src/content.ts`: empresa, contatos, serviços, perguntas, materiais, dez registros reais e suas fontes.
- `src/Sections.tsx`: seções e formulário de consulta.
- `src/App.tsx`: navegação, páginas, movimento e modal acessível.
- `src/professional.css` e `src/refinements.css`: estilos responsivos e animações.
- `public/media/instagram/`: arquivos WebP salvos localmente, sem hotlinks temporários.

A galeria reúne cinco fotografias e cinco frames de vídeos, identificados como tal. Filtros por peças/processo, ampliação, navegação por setas, Escape, controle de foco e links para os posts originais. Não há imagem de IA na apresentação atual.

## Contato

WhatsApp atual da bio oficial: +55 11 91493-5874. O formulário gera uma mensagem codificada para o canal, mostra um resumo e permite copiá-lo. É possível conversar diretamente pelo WhatsApp sem preencher o formulário. Material e quantidade podem ficar como “não sei” e “a informar”; apenas nome e descrição são obrigatórios. O envio e o anexo de fotos são feitos na conversa pelo visitante. O formulário não transmite dados a backend, nem simula envio concluído.

## Jornada do visitante

Menu principal: Início, Serviços, Trabalhos, A empresa e Pedir orçamento. A home apresenta a atuação, explica os serviços, mostra três exemplos reais e explica como consultar a equipe. Processo e demais detalhes ficam nas páginas internas. O teste percorre a jornada de pesquisa, entrada no orçamento e consulta sem quantidade conhecida.

## Movimento

Entrada escalonada de títulos, revelação inicial da fotografia, aproximação sutil das imagens, leve deslocamento da imagem principal no desktop e transições de seção que se repetem ao entrar/sair da área visível, inclusive ao subir a página. Barra de progresso de leitura e retorno ao topo. Movimento reduzido do sistema é respeitado; a rolagem continua nativa.

## Referências

[REFERENCIAS.md](REFERENCIAS.md) contém as fontes, contexto e pendências. Em 07/10/2026 o navegador conseguiu acessar publicamente o perfil e os posts, sem login. Fotos, identidade e link de WhatsApp foram verificados. Não foram usados contatos antigos das legendas como contato atual.

Confirmar com a empresa: endereço/horários, materiais e dimensões atendidos atualmente, quantidade mínima, pessoas físicas, peças usadas, prazos, garantias e aprovação das fotos para publicação definitiva.

## Verificações

Chromium em 360, 390, 768 e 1440 px: oito páginas sem rolagem horizontal, imagens carregadas, navegação, menu móvel/Escape, filtros, dez registros, modal/setas/Tab/Escape/retorno de foco, mensagem de WhatsApp e codificação, resumo/clipboard e FAQ. A abertura e a reentrada das animações ao rolar em ambas as direções também foram verificadas. Build e TypeScript aprovados, sem erros de console nos fluxos testados.

Para repetir: mantenha o servidor na porta 5175, execute `npx playwright install chromium` na primeira vez e `npm run test:ui`. As capturas locais ficam em `.playwright/`, ignoradas no Git. O teste do WhatsApp verifica o destino gerado sem enviar mensagens. Não foram realizados testes em aparelhos físicos ou outros navegadores.
