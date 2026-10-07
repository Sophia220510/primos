# Cromeação Primos — prévia comercial

Site em React, TypeScript e Vite. Composição editorial em prata, branco quente e grafite, com um discreto acento oliva provisório. Nome da empresa diagramado em texto, sem símbolo apresentado como logo oficial.

## Executar

```sh
npm ci
npm run dev -- --port 5175
```

Preview local: http://127.0.0.1:5175/. Build: `npm run build`. `npm run preview` serve o build. Não foi configurada publicação em domínio público. A página e robots.txt solicitam não indexação; isso não substitui controle de acesso.

## Atualização

Edite `src/data.ts` para alterar dados, contatos, serviços, textos, imagens e informações pendentes. Imagens ficam em `public/media`. A imagem atual é ilustrativa, gerada com IA e identificada na página. Ao substituir por fotografias reais, atualize também as legendas e a identificação na interface. A galeria atual contém um estudo, sem filtros decorativos.

O formulário copia o resumo para enviar pelo Instagram. Se o navegador bloquear o clipboard, mostra o texto selecionável. Não há backend, upload ou envio automático. O campo WhatsApp fica vazio até confirmação oficial; caso preenchido, use somente dígitos com código do país e DDD.

## Referências e confirmação

Consulte [REFERENCIAS.md](REFERENCIAS.md). Os dados disponíveis vieram do briefing. O Instagram bloqueou a consulta e não foi possível verificar fotos, logo, contatos ou publicações. Nenhuma foto real foi utilizada.

Confirmar na reunião: identidade visual e permissão das fotos; telefone, WhatsApp, endereço e horários; materiais e dimensões aceitos; atendimento a pessoas físicas e quantidade mínima; peças usadas/restauração; outros acabamentos; prazos, garantias, capacidade produtiva e certificações.

## Validação realizada

- Build de produção e checagem estrita de TypeScript aprovados.
- Chromium, larguras 360, 390, 768 e 1440 px: sem rolagem horizontal; carregamento da imagem; navegação interna e destinos dos links; menu mobile e Escape; modal, Tab, Escape e retorno de foco; formulário, resumo e clipboard; FAQ.
- Sem erros de console ou JavaScript nos fluxos testados.
- Capturas de desktop e celular inspecionadas; recortes ajustados para preservar as peças.
- Links externos apontam ao perfil oficial informado; o conteúdo do Instagram continua inacessível neste ambiente.
- Não foram anunciados contatos, trabalhos reais, serviços adicionais ou condições comerciais desconhecidas.

Capturas locais de validação em `.playwright/` (ignoradas no Git). Não foram realizados testes em dispositivos físicos ou outros navegadores.
