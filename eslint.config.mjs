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
      '**/resources/js/ziggy.js',
    ],
  },
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': ['off'],
      'tailwindcss/classnames-order': [
        'error',
        {
          callees: [
            'classnames',
            'clsx',
            'ctl',
            'cva',
            'tv',
            'twMerge',
          ],
          classRegex: '^(class(Name)?|.+-class)$',
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
    },
  },
)
