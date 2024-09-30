module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eol-last': 0,
    "indent": 0,
    "space-before-function-paren": 0,
    'no-irregular-whitespace': 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off'
  }
}
