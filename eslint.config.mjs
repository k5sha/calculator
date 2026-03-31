import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...eslintPluginAstro.configs.recommended,
  
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    }
  },
  {
    files: ["**/*.astro"],
    rules: {
    },
  }
];