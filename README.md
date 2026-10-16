# Bem-vinda a Nova York

Um site-manual para ensinar Deadlock a quem nunca jogou um MOBA.

O planejamento está em [`docs/PLANO.md`](docs/PLANO.md).

## Ver o site no computador

```bash
npm install      # só na primeira vez
npm run dev
```

Depois abra <http://localhost:4321/deadlock-guia/>. A página atualiza sozinha sempre que um arquivo é salvo.

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Capítulos (o texto) | `src/content/capitulos/<seção>/<capítulo>.md` |
| Imagens de um capítulo | `src/content/capitulos/<seção>/imagens/` |
| Nome e ordem das seções | `src/secoes.ts` |
| Cores e fontes | `src/styles/global.css` |
| Capa e sumário | `src/pages/index.astro` |
| Página de capítulo | `src/pages/[...slug].astro` |

## Escrever um capítulo

1. Crie um arquivo `.md` na pasta da seção. O número no começo do nome define a ordem: `03-meu-capitulo.md`.
2. Comece o arquivo com:

   ```markdown
   ---
   titulo: "Meu capítulo"
   resumo: "Uma frase que aparece no sumário."
   ---
   ```

3. Deixe o título e o resumo entre aspas. Escreva o texto em Markdown abaixo disso. Use `##` para subtítulos.
4. Para colocar uma imagem: `![descrição da imagem](./imagens/arquivo.png)`.

Para destacar os times no texto, use `<span class="ambar">Amber Hand</span>` e `<span class="safira">Sapphire Flame</span>`.

## Recursos extras nos capítulos (arquivos `.mdx`)

Capítulos que terminam em `.mdx` podem usar componentes. Importe no começo do arquivo, logo depois do cabeçalho:

```mdx
import Interface from '../../../components/Interface.astro';
import Pendente from '../../../components/Pendente.astro';
```

- `<Interface destaque="minimapa" legenda="O minimapa" />` mostra a tela do jogo com uma parte em destaque. As áreas disponíveis e a imagem usada ficam em `src/data/interface.ts`.
- `<Heroi nome="Abrams" funcao="Tanque" imagem={abrams}>texto</Heroi>` mostra a ficha de um herói, com o ícone importado no começo do arquivo (`import abrams from './imagens/herois/abrams.webp';`).
- `<Pendente>texto</Pendente>` marca um print que falta. Com `tipo="conferir"`, marca algo para conferir no jogo. Só aparece no `npm run dev` e some no site publicado.

## Testes automáticos

```bash
npm test
```

Gera o site, abre num Chromium de verdade e roda testes em todas as páginas. Cada teste corresponde a um bug que já aconteceu: páginas com erro, imagens quebradas, rolagem horizontal de 320px a 2560px, zoom das imagens (no computador e no celular), destaques sem zoom, imagens em branco com a placa de vídeo, avisos de pendência no site publicado e ícones de herói com zoom.

**Regra do projeto:** todo bug novo ganha um teste que falharia com ele, em `tests/`. Rode `npm test` antes de salvar uma mudança.

## Publicação

O repositório é privado por enquanto. Quando o site estiver pronto:

1. No GitHub, vá em **Settings → General → Change visibility** e deixe o repositório público.
2. Vá em **Settings → Pages** e escolha **Source: GitHub Actions**.
3. Envie qualquer mudança (ou rode o workflow "Publicar site" manualmente). O site fica em <https://vinims30.github.io/deadlock-guia/>.
