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

### Sumário proposto

1. **Como funciona o jogo**
   - O que é um MOBA
   - Como se ganha (Patrons, Guardians, Walkers, Shrines)
   - Fases da partida (lane, mid game, late game)
   - Eventos da partida
2. **Composição de equipes**
   - As funções (carry, suporte, tanque, etc.)
   - Personagens por função (com uma ficha curta para cada um)
3. **Mapa e macro**
   - O mapa e as lanes
   - Jungle e caixas: como maximizar o farm
   - Buffs e objetivos com tempo marcado
4. **Gameplay**
   - Melee e parry
   - Movimentação básica
5. **Itens e builds**
   - As 3 categorias de itens (Weapon, Vitality, Spirit)
   - Como pensar uma build sem decorar item por item
6. **Conceitos avançados** (opcional)
   - Técnicas avançadas de movimentação
   - Rotas de caixas
   - Outros

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
- [ ] Ordem final dos capítulos
