module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: ['react', '@typescript-eslint', 'tailwindcss'],
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:import/typescript',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:tailwindcss/recommended'
  ],
  overrides: [{
    files: ['*.ts', '*.tsx', '*.js'],
    parser: '@typescript-eslint/parser',
  }],
  parserOptions: {
    ecmaFeatures: { jsx: true, },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  "ignorePatterns": ["**/*.html"],
  rules: {
    'global-require': 'off',
    'react/no-children-prop': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'no-shadow': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx', '.ts'], },
    ],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    semi: 'error',
    'react/jsx-fragments': 'off',
    'no-tabs': 'error',
    'no-unused-vars': 'warn',
    'no-empty-function': 'warn',
    'react/no-array-index-key': 'off',
    'no-param-reassign': 'off',
    'no-trailing-spaces': 'error',
    'no-restricted-syntax': 'off',
    'object-curly-spacing': [2, 'always'],
    'no-undefined': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-cycle': 'off',
    'no-plusplus': 'off',
    'key-spacing': [
      2,
      { afterColon: true, },
    ],
    'no-empty': 'warn',
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'prefer-destructuring': 'warn',
    quotes: 'off',
    'no-lone-blocks': 'off',
    'no-redeclare': 'off',
    'indent': 'error',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        "ignoreTemplateLiterals": true,
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$"
      },
    ],
    'no-useless-escape': 'warn',
    'react/button-has-type': 'off',
    'no-use-before-define': 'off',
    camelcase: 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-indent': ['error', 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-first-prop-new-line": ["error"],
    "react/jsx-max-props-per-line": ['error', {
      "maximum": 1,
      "when": "always"
    }],
    "react/jsx-closing-bracket-location": ["error", {
      "nonEmpty": "line-aligned",
      "selfClosing": "line-aligned"
    }],
    'tailwindcss/no-custom-classname': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {
      },
    },
  },
  globals: {
    "JSX": "readonly"
  }
};
