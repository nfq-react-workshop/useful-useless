# React workshop #1

## Agenda
1. [Node.js ir npm](#node)
2. [IDE paruošimas](#ide)
3. [package.json ir package-lock.json](#lock)
4. [Dependency tipai](#deps)
5. [Test drive](#test)
6. [ES6 įvadas ir pagrindai](#es6)
7. [React sąvokos](#react)

## 1. <a name="node"></a> Node.js ir npm
Instaliuojame `nvm` (node version manager)
* Linux/macOS - https://github.com/creationix/nvm#install-script
* Windows - https://github.com/coreybutler/nvm-windows

Instaliuojame `node` su `nvm`
```sh
nvm install --lts
nvm use --lts
```

## 2. <a name="ide"></a> IDE paruošimas
Neturintiems nei phpStorm, nei webStorm, nei VS Code rekomenduojame įsidiegti VS Code.

### 2.1 VS Code paruošimas
<kbd>⌘</kbd> + <kbd>P</kbd> (<kbd>Ctrl</kbd> + <kbd>P</kbd>)
```
ext install dbaeumer.vscode-eslint
ext install esbenp.prettier-vscode
ext install dzannotti.vscode-babel-coloring
ext install shinnn.stylelint
```

### 2.2 phpStorm paruošimas
<kbd>⌘</kbd> + <kbd>,</kbd> (<kbd>Ctrl</kbd> + <kbd>,</kbd>)
* Language and frameworks > javascript version: React/JSX
* Language and frameworks > Javascript > Code quality tools > eslint: enable
* Language and frameworks > Javascript > Stylesheets > stylelint: enable
  * path `{project dir}/node_modules/stylelint`
* Language and frameworks > Node > interpreter: choose
* Language and frameworks > Node: enable coding assistance

## 3. <a name="lock"></a>`package.json` ir `package-lock.json`
Du failai, kurie nusako depenedencių versijas yra `package.json` ir `package-lock.json`. `package.json` yra human-readable formatas, kuriame yra nusakoma, kokių paketų versijų pageidaujame. `package-lock.json` yra machine-readable formatas, kuris nusako, kokios tikslios versijos yra suinstaliuotos.

### 3.1 Inicijuojame projektą
Sukuriame tuščią package.json failo paruoštuką, kurį vėliau užpildysime savo paketų reikalavimais. Jis susideda iš kelių privalomų laukų kurious numatytomis reikšmėmis mums patogiai užpildys ši komanda
```sh
npm init -y
```
Package.json faile esančiame `scripts` lauke galime įrašyti shell komandas kurias vėliau galėsime patogiai paleisti naudodami nurodytą trumpinį, pvz: `npm run develop`. Šie komandų trumpiniai dažniausiai naudojami aplikacijai paleisti ar sukompiliuoti.
> P.S. Atkreipkime dėmesį, kad kai kurios shell komandos gali skirtis prikalusomai nuo operacinės sistemos.

## 4. <a name="deps"></a> Dependency tipai
Vieni svarbiausių laukų package.json faile yra dependencies. Jų yra net trys rūšys: `dependencies`, `devDependencies` ir `peerDepenencies`. Į `dependencies` lauką įrašome projektui paleisti (galutinei versijai) reikalingus paketus. Į `devDependencies` rašome paketus kurie reikalingi aplikacijai sukompiliuoti arba įrankiai naudojami development’o metu. Į `peerDependencies` rašome paketus kurie “tikimės” kad bus instaliuoti pačio developer’io tačiau jų automatiškai neistaliuojame (pvz typescript).

### 4.1 Įrankiai ir bibliotekos
**eslint** įrankis skirtas kodo formatavimo ir sintaksės klaidų tikrinimui
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

**prettier** Nesirūpinkite kodo stiliumi tuo pasirūpins prettier (kodo formatavimas)
```sh
npm install prettier --save-dev
```

**css-lint** Įrankis kuris padės išvengti klaidų stiliuose. Kartu veikia ir kaip kodo formatavimo hinteris
```sh
npm install csslint --save-dev
npm install stylelint --save-dev
npm install stylelint-config-recommended --save-dev
```

**git-hooks** komandos paleidžiamos prieš arba po git komandų. Dažniausiai naudojamos įvairiems tikrinimo/formatavimo įrankiams inicijuoti prieš keliant kodą į repozitoriją.

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

**React browser plugin** Naršyklės dev-tools plėtinys padedantis matyti ir debug’inti vidinę React’o komponentų struktūrą bei jų props’ų reikšmes.
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

**react** biblioteka, leidžianti kurti komponentus
```sh
npm install react
```

**react-dom** biblioteka, leidžianti renderinti `react` komponentus į DOM medį
```sh
npm install react-dom
```

**parcel** rašysime modernų javascript, kurio sąvybių nepalaiko naršyklės, todėl kodą reiks transpiliuoti ir subundlinti į vieną failą
```
npm install parcel --save-dev
```
Taip pat prisidedame `script` į package.json
```json
"start": "parcel src/index.html --open",
```

### 4.2 Įrankių konfigūracija
Kai kurių katalogų repozitorijoje nelaikysime. Sukurkime `.gitignore` failą
```
.idea
.vscode
/node_modules
/dist
/.cache
```

Vienodam kodo stiliui išlaikyti sukonfigūruokime `prettier` sukurdami failą `.prettierrc`
```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "all"
}
```
Taip pat `.stylelintrc`
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
Ir `.eslintrc`
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

## 5 <a name="test"></a> Test drive
Paleiskime pirmą hello world aplikaciją keliais paprastas žingsniais. Sukuriame katalogą `src` ir jame du failus `index.html` ir `index.js`.
```js
// index.js
console.log('Hello world');
```
`index.html` faile rašome `html:5` arba tiesiog `!` ir spaudžiame <kbd>tab</kbd>. Gausime html template, kurio body telieka sudėti tokį turinį.
```html
<body>
    Hello world
    <script src="index.js"></script>
</body>
```
Kadangi jau įsidėjome `start` į package.json `scripts` paleidžiame parcel viena trumpa komanda:
```sh
npm start
```
Adresu `http://localhost:1234` turėtų būti pasiekiama jūsų programa.

## 6 <a name="es6"></a> ES6 įvadas ir pagrindai

### 6.1 `let` ir `const`
Pradedant ES6 javascript versija kintamųjų deklaravimui nebenaudojame raktažodžio `var`. Jį keičia du nauji - `let` ir `const`.

Vienas svarbiausių skirtumų tarp senojo `var` ir naujųjų `const` bei `let` tai deklaracijos apibrėžtis (scope). Kaip žinia kintamieji deklaruojami naudojant `var` įgauną funkcijos lygio apibrėžtį, kitaip tariant toks kintamasis bus pasiekiamas visoje funkcijoje kurioje jis buvo deklaruotas (įskaitant visas vidines funkcijas). Tuo tarpu `let` bei `const` įgauna bloko lygio apibrėžtį, arba bus pasiekiami tik tame bloke kuriame buvo deklaruoti (įskaitant visus vidinius blokus).

`let` mums leidžia sukurti kintamąjį kurio reikšmę galėsime keisti ir po deklaracijos. Taip pat raktažodžiu `let` galime inicijuoti ir tuščius kintamuosius, kitaip tariant kintamuosius be reikšmės (`undefined`).

`const` mums leidžia sukurti kintamąjį kurio reikšmės javascript variklis kodo vykdymo metu mums pakeisti neleis. Gal būt dėl to ir pavadinimas kilęs nuo žodžio constant.
> P.S. Pagal nutylėjimą yra priimtina visada pirmiausia visus kintamuosius deklaruoti naudojant `const`, o tik reikalui esant deklaracijas keisti į `let`.
```js
const MAX_DURATION = 10;
for (let i = 0; i < MAX_DURATION; i++) {
    console.log(i);
}
```

### 6.2 `import`/`export`
ES6 įvėdė naują sistemą moduliams importuoti bei eksportuoti aplikacijoje. Seniau naudojome iš node.js kilusią `require` funkciją kurią ES6 pakeitė naujais raktažodžiais `import` ir `export`.

`import` sintaksė
```js
import * as React from 'react';
import { render } from 'react-dom';
import classnames from 'classnames';
```
`export` sintaksė
```js
export render;
export default classnames;
```

### 6.3 destructors
Destruktoriai naudojami objektų “išskleidimui” į kintamuosius.
```js
const coordinates = {
    lat: 3.5,
    lon: 2,
    center: false
};
const { lat, lon } = coordinates;
console.log(lat, lon);
```

### 6.4 arrow functions
Tai trumpesnis funkcijos aprašymo būdas, t.y. `function () {}` keičiam į `() => {}`.
Taip pat svarbus skirtumas yra, kad arrow funkcija išsaugo išorinį reference į raktažodį `this`.
```js
function getGreeting() {
    return 'Hello world';
}
const getGreeting = function () {
    return 'Hello world';
};
const getGreeting = () => {
    return 'Hello world';
}
const getGreeting = () => 'Hello world';
```

### 6.5 class klasės
Seniau norėdami sukurti javascript klasę turėdavome rašyti nemažai kodo, t.y. save kviečiančią funkciją kuri viduje deklaruoja konstruktorių… ES6 mums tai palengvino todėl dabar klasės aprašomos taip pat kaip ir daugumoje OOP programavimo kalbų.
```js
class Button extends React.Component {
    constructor(props) {
        super(props)
    }
}
```

### 6.6 simplified object notations
Objekto parametrus kurių pavadinimai yra tokie pat kaip reikšmei priskiriamas kintamojo pavadinimas galime aprašyti trumpiau.
```js
const test = 1;
// both are equivalent:
const foo = { test };
const foo = { test: test };
```

### 6.7 Template literals
Tai sintaksė kuri leidžia į string'us įterpti kintamuosius:
```js
const name = 'John';
const greeting = `hello, ${name}!`;
console.log(greeting); // Hello, John!
```

### 6.8 Array as reference type
Javascript egzistuoja tik primityvai ir objektai. Primityvai yra `string`, `number`, `boolean`, `undefined`, `null`. Visa kita yra objektai. Masyvai taip pat yra objektai

## 7 <a name="react"></a> React sąvokos

### 7.1 JSX
JSX == HTML (**išskyrus** className, prop bindings, additional syntax, inline js in html, conditions, custom elements (components), style definitions, event handlers, xhtml style empty elements, single parent element per block and more).
```js
const name = 'John Doe';
const content = (
    <div id="main">
        <span>Hello {name}</span>
    </div>
);
```
Šiame pavyzdyje javascript kode JSX sintakse yra parašyta tas pats, kas būtų parašyta be JSX
```js
const name = 'John Doe';
const content = React.createElement(
    'div',
    {
        id: 'main'
    },
    React.createElement(
        'span',
        null,
        `Hello ${name}`
    )
);
```
Tai primena browseriuose esančią DOM sintaksę
```js
document.createElement('div', { id: 'main' });
```
Patogumui naudosime tik JSX sitaksę.

### 7.2 Komponentai
React komponentus naudojame taip pat, kaip ir paprastus react elementus `div`, `span` ar kitus HTML esančius atitikmenis.
```js
import Separator from 'components/Separator';

const content = (
    <div>
        <span>text</span>
        <Separator />
        <span>rest of the test</span>
    </div>
);
```
Aprašomi jie gali būti keliais būdais. Šiandien nagrinėsime tik `Stateless Functional Component` būdą. Tai komponentas aprašomas funkcija ir neturinis state.
```js
import * as React from 'react';

const Separator = () => (
    <>
        <hr>
        I am the separator
    </>
);

export default Separator;
```
Komponentai gali turėti panašų interfeisą kaip ir elementai. Perduodami argumentai vadinami `props`
```js
const Separator = (props) => (
    <>
        <hr>
        I am the {props.type} separator
    </>
);

const content = <Separator type="awesome" />;
```
`props` yra javascript objektas. Todėl jo nariai gali būti ir primityvai ir objektai. Galima perduoti funkciją.
```js
const Separator = (props) => (
    <div onClick={props.onClick}>
        <hr>
        I am the {props.type} separator
    <div/>
);

const content = (
    <Separator
        type="awesome"
        onClick={() => console.log('click')}
    />
);
```
