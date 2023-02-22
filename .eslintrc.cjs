module.exports = {
  "root": true,
  "extends": ["@nuxt/eslint-config"],

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
    ]
  }
}
