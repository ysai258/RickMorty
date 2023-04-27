module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // React Native specific rules
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-single-element-style-arrays': 'warn',
    'react-native/no-unused-styles': 'warn',
    'react-native/sort-styles': [
      'warn',
      'asc',
      {ignoreClassNames: true, ignoreStyleProperties: true},
    ],

    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Object: 'Use {} instead.',
          Function: 'Use a specific function type instead, like `() => void`.',
          Boolean: 'Use the boolean type instead.',
          Number: 'Use the number type instead.',
          String: 'Use the string type instead.',
        },
      },
    ],

    // React specific rules
    'react/jsx-uses-react': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/jsx-filename-extension': ['warn', {extensions: ['.tsx', '.jsx']}],
    'react/prop-types': 'warn',
    'react/display-name': 'warn',

    // React Hooks specific rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Prettier specific rules
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
