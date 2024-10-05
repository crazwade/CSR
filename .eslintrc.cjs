module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'comma-dangle': ['error', {
      object: 'always',
      functions: 'never'
    }]
  }
};
