# Cheat-sheet for Workshop 1

## 1 Node.js ir npm
### 1.1 Instaliuojame `nvm` (node version manager)
* Linux/macOS - https://github.com/creationix/nvm#install-script
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
* Windows - https://github.com/coreybutler/nvm-windows

## 2. IDE paruošimas
### 2.1 VS Code paruošimas
<kbd>⌘</kbd> + <kbd>P</kbd> (<kbd>Ctrl</kbd> + <kbd>P</kbd>)
```
ext install dbaeumer.vscode-eslint
ext install esbenp.prettier-vscode
ext install dzannotti.vscode-babel-coloring
ext install shinnn.stylelint
```
## 3. Instaliuojame įrankius
### 3.1 eslint
```sh
npm install acorn --save-dev
npm install eslint --save-dev
npm install eslint-config-airbnb --save-dev
npm install eslint-config-prettier --save-dev
npm install eslint-plugin-immutable --save-dev
npm install eslint-plugin-import --save-dev
npm install eslint-plugin-jsx-a11y --save-dev
npm install eslint-plugin-prettier --save-dev
npm install eslint-plugin-react --save-dev
```
### 3.2 prettier
```sh
npm install prettier --save-dev
```
### 3.3 css-lint
```sh
npm install csslint --save-dev
npm install stylelint --save-dev
npm install stylelint-config-recommended --save-dev
```
### 3.4 git-hooks
Instaliuojame git-hooks įrankius: 
```sh
npm install husky --save-dev
npm install lint-staged --save-dev
```
Į `package.json` įdedame `husky` konfiguraciją:
```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```
Taip pat `lint-staged` konfiguraciją:
```json
"lint-staged": {
  "src/**/*.jsx": [
    "eslint --fix",
    "git add"
  ],
  "src/**/*.scss": [
    "stylelint --syntax scss",
    "git add"
  ]
},
```
### 3.5 React browser plugin
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
### 3.6 Parcel
Prisidedame `scripts` į package.json
```json
"start": "parcel src/index.html --open",
```
### 3.7 `.prettierrc`
```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "all"
}
```
### 3.8 `.stylelintrc`
```json
{
  "extends": [
    "stylelint-config-recommended"
  ],
  "rules": {
    "selector-list-comma-newline-after": "always",
    "selector-pseudo-element-colon-notation": "double",
    "no-duplicate-selectors": null
  }
}
```
### 3.9 `.eslintrc`
```json
{
  "parser": "babel-eslint",
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["react", "immutable", "import", "prettier"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ]
  }
}
```
