import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: ['public/*'],
    languageOptions: {
      globals: {
        node: true,
        es6: true,
        mocha: true,
      },
    },
    rules: {
      indent: [
        'error',
        2,
        {
          VariableDeclarator: {
            let: 2,
            const: 3,
          },
        },
      ],
      'no-label-var': 'error',
      'no-var': 'error',
      'no-new-object': 'error',
      'object-shorthand': 1,
      'quote-props': ['error', 'as-needed'],
      'no-array-constructor': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': ['error', 'never'],
      'no-useless-escape': 'error',
      'no-eval': 'error',
      'no-trailing-spaces': 'error',
      'key-spacing': [
        2,
        {
          singleLine: {
            beforeColon: false,
            afterColon: true,
          },
          multiLine: {
            beforeColon: true,
            afterColon: true,
            align: 'colon',
          },
        },
      ],
    },
  },
];
