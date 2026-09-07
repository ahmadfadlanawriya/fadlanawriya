import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Domain is intended but not yet purchased. Only affects canonical + absolute OG URLs.
  site: 'https://www.fadlanawriya.id',
  integrations: [mdx()],
  redirects: {
    // /work has no index page; truncating a case-study URL should land somewhere useful.
    '/work': '/#work',
  },
  fonts: [
    {
      // Overpass derives from Highway Gothic (FHWA road signage) — the lettering of the
      // wayfinding world this design commits to. One face carries the whole system, the
      // way a transit network uses a single face.
      provider: fontProviders.google(),
      name: 'Overpass',
      cssVariable: '--font-sans',
      weights: ['400', '600', '700', '900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
      optimizedFallbacks: true,
    },
  ],
});
