module.exports = {
  "root": true,

  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2020,
  },

  "extends": [
    "@nuxt/eslint-config",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],

  "rules": {
    "quotes": [
      "error",
      "double",
    ],
    "indent": [
      "error",
      2,
    ],
    "max-len": [
      "error",
      120,
    ],
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
    "arrow-parens": [
      "error",
      "always",
    ],
    "semi": [
      "error",
      "never",
    ],
    "object-curly-spacing": [
      "error",
      "always",
    ],
    "space-before-function-paren": [
      "error",
      {
        "asyncArrow": "always",
        "anonymous": "never",
        "named": "never",
      },
    ],
    "import/order": "error",
    "no-trailing-spaces": "error",
    "no-console": "error",
    "no-debugger": "error",
  },

  "settings": {
    "import/resolver": {
      "node": true,
      "typescript": true,
    },
  },
}
