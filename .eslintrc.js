module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // "plugin:react/recommended",
        "airbnb",
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
    ],
    rules: {
        "linebreak-style": 0,
        "quotes": ["error", "double"],
        "react/function-component-definition": [
            2,
            {
                "namedComponents": "arrow-function",
                "unnamedComponents": "arrow-function"
            }
        ],
        "indent": off,
        "react/prop-types": 0
    },
};
