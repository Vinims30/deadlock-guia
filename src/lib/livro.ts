import { getCollection, type CollectionEntry } from 'astro:content';
import { secoes } from '../secoes';

export type Capitulo = {
  entrada: CollectionEntry<'capitulos'>;
  slug: string;
  numero: string;
  secao: (typeof secoes)[number];
};

// Remove o número do começo ("01-gameplay" vira "gameplay")
const semNumero = (parte: string) => parte.replace(/^\d+-/, '');

// Monta o livro: seções em ordem, cada uma com seus capítulos em ordem
export async function carregarLivro() {
  const entradas = (await getCollection('capitulos')).sort((a, b) =>
    a.id.localeCompare(b.id),
  );

  const livro = secoes.map((secao, i) => {
    const capitulos: Capitulo[] = entradas
      .filter((e) => e.id.startsWith(secao.pasta + '/'))
      .map((entrada, j) => ({
        entrada,
        slug: entrada.id.split('/').map(semNumero).join('/'),
        numero: `${i + 1}.${j + 1}`,
        secao,
      }));
    return { ...secao, numero: i + 1, capitulos };
  });

  return { livro, capitulos: livro.flatMap((s) => s.capitulos) };
}

// Monta um link respeitando o endereço base do site
export function link(caminho = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${caminho.replace(/^\//, '')}`;
}
