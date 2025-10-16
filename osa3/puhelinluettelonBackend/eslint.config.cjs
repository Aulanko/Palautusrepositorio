const globals = require('globals')
const js = require('@eslint/js')
const stylisticJs = require('@stylistic/eslint-plugin-js')

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '**/assets/*.js']
  },
  js.configs.recommended,
  {

    files: ['**/*.js','!dist/**/*.js', '!**/dist/**'],

    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },

    plugins: {
      '@stylistic/js': stylisticJs,
    },

    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
    },


  },
]