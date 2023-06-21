module.exports = {
  root: true,

  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    "space-before-function-paren": 0,
    indent: [2, 2, { SwitchCase: 1 }],
    // "prettier/prettier": [2, { tabWidth: 4, endOfLine: "auto" }],
    "prettier/prettier": "off",
    "no-console": "off",
    "no-debugger": "off",
    quotes: "off",
    semi: "off",
    " comma-dangle": "off",
    "vue/multi-word-component-names": 0,

    // 解决let被强转为const问题
    "prefer-const": 0,
    "comma-dangle": 0,
  },
};
