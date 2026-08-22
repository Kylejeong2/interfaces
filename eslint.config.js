import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  { ignores: ['eslint.config.js', 'prettier.config.js'] },
  ...tanstackConfig,
]
