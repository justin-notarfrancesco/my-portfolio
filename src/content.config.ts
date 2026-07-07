import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects / work showcase.
 * Each entry is a markdown file in `src/content/projects/`.
 * Swap in real work by editing the frontmatter fields below.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()).default([]),
    /** Path under /public, e.g. "/projects/foo.png". Optional — a themed placeholder renders if omitted. */
    image: z.string().optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    /** Semantic line key ("red", "blue", …) or a raw hex. Drives the roundel color. */
    lineColor: z.string().default('blue'),
    /** Two-letter route bullet shown on the card (e.g. "A", "7"). */
    line: z.string().default('•'),
    year: z.number().optional(),
    featured: z.boolean().default(false),
    /** Lower sorts first. */
    order: z.number().default(0),
  }),
});

export const collections = { projects };
