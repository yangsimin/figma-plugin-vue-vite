import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    vue: true,
    ignores: [],
  },

  // Legacy config
  ...compat.config({
    extends: [
      'plugin:@figma/figma-plugins/recommended',
    ],
  }),

  // Other flat configs...
)
