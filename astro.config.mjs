// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://calculator.k5sha.xyz', 
  trailingSlash: 'always',

  integrations: [
    partytown({ 
      config: { forward: ['dataLayer.push'] } 
    }),
    sitemap({
      i18n: {
        defaultLocale: 'uk', 
        locales: {
          uk: 'uk-UA',
          en: 'en-US',
        },
      },
    }),
  ],
});