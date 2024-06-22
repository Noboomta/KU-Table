const globals = require('globals')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const { includeIgnoreFile } = require('@eslint/compat')
const pluginVue = require('eslint-plugin-vue')

const path = require('node:path')
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})
const gitignorePath = path.resolve(__dirname, '.gitignore')

module.exports = [
  includeIgnoreFile(gitignorePath),
  ...compat.extends('eslint:recommended', 'prettier'),
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['src/**/*.(js|vue)'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
]
