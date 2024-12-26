import react from 'eslint-plugin-react';
import { ESLint } from 'eslint';
import prettier from 'eslint-config-prettier';

export default {
  parser: '@typescript-eslint/parser', // Configuração para TypeScript
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'], // Altere se tiver apenas um tsconfig
    tsconfigRootDir: import.meta.dirname,
  },
  settings: { react: { version: 'detect' } },
  plugins: {
    react,
    '@typescript-eslint', // Plugin para TypeScript
    prettier, // Plugin Prettier
  },
  extends: [
    'plugin:react/recommended', // Regras recomendadas do react
    'plugin:@typescript-eslint/recommended', // Regras recomendadas para TypeScript
    'prettier', // Extende as configurações do Prettier
  ],
  rules: {
    'prettier/prettier': 'error', // Regra para aplicar o Prettier
  },
};
