import partida from '../assets/interface/tela-partida.webp';
import inicio from '../assets/interface/tela-inicio.webp';
import lojaSecreta from '../assets/interface/tela-loja-secreta.webp';
import steamVent from '../assets/interface/tela-steam-vent.webp';

// Cada área é um retângulo em porcentagem da imagem:
// x e y = canto superior esquerdo, l = largura, a = altura.
// "elipse: true" desenha um círculo em vez de um retângulo.
export type Area = { x: number; y: number; l: number; a: number; elipse?: boolean };

// Prints da tela do jogo com partes para destacar.
export const telas = {
  // Partida aos 24 minutos, com tudo liberado
  partida: {
    imagem: partida,
    areas: {
      times: { x: 17, y: 0, l: 66.5, a: 14 },
      ultimates: { x: 18, y: 11, l: 27, a: 3.4 },
      placar: { x: 43.5, y: 0.3, l: 13, a: 8 },
      objetivo: { x: 24, y: 17, l: 9.5, a: 3.5 },
      vida: { x: 21, y: 60.5, l: 10, a: 26 },
      mira: { x: 46, y: 47, l: 8, a: 13.5, elipse: true },
      buffs: { x: 1, y: 60.5, l: 6, a: 11 },
      atributos: { x: 1, y: 70.5, l: 14.5, a: 9.5 },
      nivel: { x: 1, y: 81, l: 3.6, a: 6.5, elipse: true },
      souls: { x: 4.4, y: 80.5, l: 9, a: 6.5 },
      itens: { x: 1, y: 87, l: 19.7, a: 12.5 },
      habilidades: { x: 40.5, y: 88, l: 19, a: 12 },
      'item-ativo': { x: 60.5, y: 89, l: 4, a: 10.5 },
      minimapa: { x: 78, y: 58, l: 21.5, a: 41.5 },
    },
  },
  // Começo da partida (0:50), com um inimigo perto
  inicio: {
    imagem: inicio,
    areas: {
      'barra-inimiga': { x: 65, y: 62.5, l: 11, a: 10.5 },
      'melhorar-habilidade': { x: 40, y: 84.5, l: 20, a: 15.5 },
      abates: { x: 0, y: 20, l: 14.5, a: 10 },
    },
  },
  // Loja secreta embaixo de Chinatown, com uma estátua dourada ao fundo
  'loja-secreta': {
    imagem: lojaSecreta,
    areas: {
      estatua: { x: 71, y: 43.5, l: 4, a: 11 },
    },
  },
  // Steam vent na Plaza, com uma Tough Crate do lado
  'steam-vent': {
    imagem: steamVent,
    areas: {
      'tough-crate': { x: 30, y: 32.5, l: 13, a: 20 },
    },
  },
} satisfies Record<string, { imagem: ImageMetadata; areas: Record<string, Area> }>;

export type NomeTela = keyof typeof telas;
