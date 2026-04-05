// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://calculator.k5sha.xyz', 
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'uk', 
        locales: {
          uk: 'uk-UA',
          en: 'en-US',
        },
      },
      serialize(item) {
        if (/codes/.test(item.url)) {
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
});