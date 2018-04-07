module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        validate: [
            'javascript',
            'javascriptreact',
            'html',
            'vue',
            'vue-html',
            //  { "language": "html", "autoFix": true }
        ],
        extensions: ['.vue'],
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "extends": [
        "plugin:vue/recommended", "prettier"
    ],
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
        'object-curly-newline': ["error", { "consistent": true }],
        'no-param-reassign': 0,
        'indent': ["error", 4],
        'import/first': 0,
        'import/named': 2,
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 2,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        semi: 'off',
        curly: 'off',
        'max-len': [
            'error',
            {
                code: 250,
                ignoreComments: true,
                ignoreStrings: true,
            },
        ],
        'no-multi-spaces': 'off',
        'arrow-body-style': 'off',
        'comma-dangle': 'off',
        'no-param-reassign': [
            'warn',
            {
                props: false,
            },
        ],
        'linebreak-style': 'off',
        'arrow-parens': 'off',
        quotes: 'off',
        'keyword-spacing': 'off',
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'space-before-blocks': 'off',
        'brace-style': 'off',
        'import/no-dynamic-require': 'off',
        'no-console': [
            'warn',
            {
                allow: ['warn', 'error'],
            },
        ],
        'no-shadow': [
            'error',
            {
                allow: ['resolve', 'reject', 'done', 'cb'],
            },
        ],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}