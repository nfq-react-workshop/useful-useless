# 1 Node.js ir npm
## 1.1 Instaliuojame `nvm` (node version manager)
* Linux/macOS - https://github.com/creationix/nvm#install-script
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
* Windows - https://github.com/coreybutler/nvm-windows

# 2. IDE paruošimas
## 2.1 VS Code paruošimas
<kbd>⌘</kbd> + <kbd>P</kbd> (<kbd>Ctrl</kbd> + <kbd>P</kbd>)
```
ext install dbaeumer.vscode-eslint
ext install esbenp.prettier-vscode
ext install dzannotti.vscode-babel-coloring
```
# 3. Instaliuojame įrankius
## 3.1 eslint
```sh
npm install eslint --save-dev
npm install babel-eslint --save-dev
npm install eslint-config-prettier --save-dev
npm install eslint-plugin-prettier --save-dev
npm install eslint-plugin-react --save-dev
npm install prettier-eslint --save-dev
```
## 3.2 prettier
```sh
npm install prettier --save-dev
```
## 3.3 css-lint
```sh
npm install csslint --save-dev
npm install stylelint --save-dev
npm install stylelint-config-recommended --save-dev
```
## 3.4 git-hooks
Į `package.json` įdedame:
```json
"lint-staged": {
  "src/**/*.jsx": [
    "prettier --write",
    "git add"
  ],
  "src/**/*.scss": [
    "stylelint --syntax scss",
    "git add"
  ]
}
```
Taip pat po `scripts` pridedame:
```json
"precommit": "lint-staged"
```
## 3.5 React browser plugin
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
## 3.6 Parcel
Prisidedame `script` į package.json
```json
"start": "parcel src/index.html --open",
```
## 3.7 `.prettierrc`
```json
{
  "printWidth": 120,
  "trailingComma": "all",
  "singleQuote": true,
  "tabWidth": 4
}
```
## 3.8 `.stylelintrc`
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
## 3.9 `.eslintrc`
```json
{
  "parser": "babel-eslint",
  "extends": [
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  "plugins": [
    "react",
    "prettier"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "settings": {
    "react": {
      "version": "^16.4.1"
    }
  },
  "rules": {
    "prettier/prettier": "error",
    "react/display-name": [ 0 ]
  }
}
```
