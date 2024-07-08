import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    vue: true,
    typescript: true,
    isInEditor: false,
  },
  {
    ignores: [
      '**/composer.json',
      '**/composer.lock',
      '**/.ddev',
      '**/.github',
      '**/storybook-static',
      '**/public/build',
      '**/storage',
      '**/vendor',
    ],
  },
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': ['off'],
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
    },
  },
)
