require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  env: {
    node: true,
  },
};
