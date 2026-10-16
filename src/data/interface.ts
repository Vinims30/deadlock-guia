import tela from '../assets/interface/tela-provisoria.svg';

// A imagem da tela do jogo usada no capítulo "Controles e interface".
// Para trocar pelo print de verdade, mude o import acima e ajuste as áreas.
export const imagemTela = tela;

// Cada área é um retângulo em porcentagem da imagem:
// x e y = canto superior esquerdo, l = largura, a = altura.
// "elipse: true" desenha um círculo em vez de um retângulo.
export type Area = { x: number; y: number; l: number; a: number; elipse?: boolean };

export const areas: Record<string, Area> = {
  times: { x: 31, y: 0.8, l: 38, a: 9.5 },
  minimapa: { x: 1, y: 69, l: 16.5, a: 30 },
  vida: { x: 21.5, y: 87.5, l: 20, a: 9 },
  habilidades: { x: 41.5, y: 84.5, l: 17, a: 13 },
  itens: { x: 58.5, y: 87, l: 14, a: 11 },
  souls: { x: 73.5, y: 87.5, l: 9, a: 10 },
  stamina: { x: 46.5, y: 46.5, l: 7, a: 8, elipse: true },
  'barra-inimiga': { x: 59, y: 41, l: 7, a: 6.5, elipse: true },
};
