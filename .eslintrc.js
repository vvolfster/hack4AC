module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true
  },
  // add your custom rules here
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi':'off',
    'curly':'off',
    'max-len': ["error", { code : 150, ignoreComments: true, ignoreStrings: true }],
    'no-multi-spaces':'off',
    'arrow-body-style' : 'off',
    'comma-dangle' : 'off',
    'no-param-reassign' : ['warn', { "props": false }], // Turning it off for embedded props makes it so we can use lodash.reduce without getting a headache.
    'indent' : ["error",4, {"SwitchCase": 1}],
    'linebreak-style' : 'off',
    'quotes' : 'off',
    'keyword-spacing' : 'off',
    'no-restricted-syntax' : 'off',
    'guard-for-in' : 'off',
    'space-before-blocks' : 'off',
    'brace-style': 'off',
    'import/no-dynamic-require': 'off',
    'no-console' : ["warn", { allow: ["warn", "error"] }],
    'no-shadow': ["error", { allow: ["resolve","reject","done","cb"] }],
  }
}
