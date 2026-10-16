import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada capítulo é um arquivo .md dentro de src/content/capitulos/<seção>/
const capitulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/capitulos' }),
  schema: z.object({
    titulo: z.string(),
    // Frase curta que aparece no sumário, abaixo do título
    resumo: z.string().optional(),
  }),
});

export const collections = { capitulos };
