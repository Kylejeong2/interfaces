import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      '.nitro/**',
      '.output/**',
      '.vercel/**',
      'dist/**',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
  ...tanstackConfig,
]
