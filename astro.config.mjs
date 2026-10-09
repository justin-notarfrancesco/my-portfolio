// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://notar.nyc',
  integrations: [sitemap()],
  // Pages stay prerendered; the adapter only serves on-demand routes like /api/email.
  adapter: vercel(),
});
