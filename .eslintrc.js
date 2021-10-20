module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "airbnb-base",
        "airbnb-typescript/base"
    ],    
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
};
