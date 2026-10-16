import type { Area } from '../data/interface';

// Desenha a camada escura com "buracos" nas áreas destacadas e o contorno laranja.
// Devolve o SVG como texto para poder ser usado tanto na página quanto no zoom.
// O escuro é um só caminho com fill-rule="evenodd": o retângulo da tela inteira
// menos as áreas, então não precisa de máscara nem de ids.
export function desenharDestaques(areas: Area[]): string {
  if (areas.length === 0) return '';

  const forma = (a: Area) => {
    if (!a.elipse) return `M${a.x} ${a.y}h${a.l}v${a.a}h${-a.l}Z`;
    const rx = a.l / 2;
    const ry = a.a / 2;
    const cy = a.y + ry;
    return `M${a.x} ${cy}a${rx} ${ry} 0 1 0 ${a.l} 0a${rx} ${ry} 0 1 0 ${-a.l} 0Z`;
  };

  const buracos = areas.map(forma).join('');
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
    <path d="M0 0H100V100H0Z${buracos}" fill="#080604" fill-opacity="0.62" fill-rule="evenodd"/>
    <path d="${buracos}" fill="none" stroke="#e08a2c" stroke-width="3" vector-effect="non-scaling-stroke"/>
  </svg>`;
}
