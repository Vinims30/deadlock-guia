# Plano do projeto

## Objetivo

Um manual online que ensina Deadlock para alguém sem nenhuma experiência com MOBA.
Ele explica os conceitos gerais de MOBA e também o que é particular de Deadlock.

## Estrutura (inspirada no manual do Omarchy / Writebook)

O manual do Omarchy é feito com o Writebook. Ele funciona como um livro:

- **Capa**: título, uma imagem e o sumário completo, com um botão "Começar a ler".
- **Seções**: títulos que agrupam capítulos (ex.: "The Basics", "Configuration").
- **Capítulos**: uma página por assunto, com URL própria e texto curto e direto.
- **Navegação**: setas de anterior/próximo, busca e trilha de volta ao sumário.
- **Visual**: muito espaço em branco, tipografia de leitura, imagens grandes que ampliam ao clicar.

### Sumário

O sumário atual fica no próprio site: as seções estão em `src/secoes.ts` e os capítulos em `src/content/capitulos/`. Ordem das seções:

1. Primeiros passos
2. Como funciona o jogo
3. Mapa e macro
4. Gameplay
5. Itens e builds
6. Composição de equipes
7. Conceitos avançados
8. Glossário

### Como escrevemos o conteúdo

O Vinicius passa a ideia de cada capítulo. O Claude pesquisa a versão atual do jogo e escreve, e o Vinicius revisa.

O jogo mudou muito na atualização City Never Sleeps (29/09/2026), então sempre conferir na [Deadlock Wiki](https://deadlock.wiki) e nas notas de atualização. O capítulo de personagens fica por último, porque heróis novos ainda estão saindo.

## Design

Tema: Nova York mágica, anos 1920, art déco e ocultismo.

Paleta inicial (ainda vamos ajustar):

| Papel             | Cor       | Ideia                              |
| ----------------- | --------- | ---------------------------------- |
| Fundo             | `#14110f` | tinta / noite na cidade            |
| Superfície        | `#1e1a16` | couro escuro                       |
| Texto             | `#e8dcc4` | pergaminho                         |
| Destaque          | `#c9a14a` | latão / dourado art déco           |
| Time Amber Hand   | `#e08a2c` | âmbar                              |
| Time Sapphire Flame | `#3f7fd0` | safira                           |

Fontes: uma serifada elegante para títulos (estilo art déco) e uma fonte de leitura confortável para o texto.

## Imagens

- Ficam em `public/images/<capítulo>/`.
- Fontes possíveis: prints tirados no jogo, diagramas do mapa feitos por nós e artes oficiais (o site é um guia de fã, sem fins comerciais).

## Decisões em aberto

- [x] Nome do site: **Bem-vinda a Nova York**
- [x] Ferramenta: **Astro** (capítulos em Markdown)
- [x] Publicação: **GitHub Pages** (repositório público)
- [x] Tema: **escuro por padrão, com botão para o claro**
- [x] Ordem final das seções
