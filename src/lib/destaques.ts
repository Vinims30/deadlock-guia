import type { Area } from '../data/interface';

type Recorte = { x: number; y: number; l: number; a: number };

// Desenha o destaque: um contorno laranja em volta de cada área e o resto da
// imagem escurecido. Devolve HTML como texto para ser usado tanto na página
// quanto no zoom. O elemento onde ele entra precisa de position: relative e
// overflow: hidden (o escuro é uma sombra enorme que o overflow corta).
//
// Por que não SVG: com a placa de vídeo ligada, o Chromium deixava em branco
// as imagens deste capítulo quando o escuro era desenhado com SVG.
//
// Limite: com mais de uma área, a sombra de uma escurece a outra. Por isso os
// capítulos usam um destaque por imagem.
export function desenharDestaques(areas: Area[], recorte: Recorte = { x: 0, y: 0, l: 100, a: 100 }): string {
  const n = (v: number) => Math.round(v * 100) / 100;
  return areas
    .map((a) => {
      const estilo = [
        'position:absolute',
        `left:${n(((a.x - recorte.x) / recorte.l) * 100)}%`,
        `top:${n(((a.y - recorte.y) / recorte.a) * 100)}%`,
        `width:${n((a.l / recorte.l) * 100)}%`,
        `height:${n((a.a / recorte.a) * 100)}%`,
        `border-radius:${a.elipse ? '50%' : '4px'}`,
        'border:3px solid #e08a2c',
        'box-sizing:border-box',
        'box-shadow:0 0 0 200vmax rgb(8 6 4 / 0.62)',
        'pointer-events:none',
      ].join(';');
      return `<span aria-hidden="true" style="${estilo}"></span>`;
    })
    .join('');
}
