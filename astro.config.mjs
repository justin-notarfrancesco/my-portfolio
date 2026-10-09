// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const BUILD_ONLY = /^(rolldown|@vercel\/routing-utils|es-module-lexer)$/;

// https://astro.build/config
export default defineConfig({
  site: 'https://notar.nyc',
  integrations: [sitemap()],
  // Pages stay prerendered; the adapter only serves on-demand routes like /api/email.
  adapter: vercel(),
  vite: {
    build: {
      rollupOptions: {
        treeshake: {
          // @astrojs/vercel leaves bare `import "rolldown"` (and friends) in the
          // server entry. rolldown needs a native binary that isn't traced into
          // the function, so the function crashed on boot. These build-time
          // packages have no runtime side effects; let the bundler drop them.
          moduleSideEffects: (id, external) => !(external && BUILD_ONLY.test(id)),
        },
      },
    },
  },
});
