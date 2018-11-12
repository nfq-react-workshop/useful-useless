# React workshop #2

Praeitoje paskaitoje paruošėme darbui IDE. Sužinojome ES6 sintaksės teikiamus privalumus. Susipažinome su code bundling su `parcel`. Pabaigoje parašėme testinį `react` komponentą.

### Agenda
1. [Duomenų perdavimas komponente](#data)
2. [App layout](#layout)
3. [Styling](#styling)

### 1. <a name="data"></a> Duomenų perdavimas

Duomenys React yra perduodami viena kryptimi iš gaubiančių komponentų į vidinius. Paprastai duomenų perdavimo tipus galima susikirstyti į tris rūšis.

ryšys | perdavimo tipas
--- | ---
Tėvas → vaikas | Naudojame `props`
Vaikas → tėvas | Naudojame callbacks
Brolis → brolis | Naudojame ir callbacks ir `props`

#### 1.1 `Props`
Šis terminas bus vienas iš dažniausiai naudojamų ir girdimų, kai kalbėsitės su kolėgomis apie react. `Props` yra įprastas JavaScript objektas.

React yra įprasta nurodyti, kokių tipų props komponentas tikisi. Tam naudojam [`propTypes`](https://www.npmjs.com/package/prop-types). Daugiau apie tai [propTypes dokumentacijoje](https://reactjs.org/docs/typechecking-with-proptypes.html)
```sh
npm install prop-types
```

Primityvų perdavimas
```js
const Button = (props) => (
    <button name={props.name}>Push</button>
);

<Button name="foobar" />
/*
props = {
    name: 'foobar'
}
*/
```

Išraiškų perdavimas naudojant ES6 *template strings*. Sintaksė yra paprasta - naudojame `` ` `` kabutes vietoje `'`, išraiškas viduje rašome į `${}`
```js
const Button = (props) => (
    <button name={props.name}>Push</button>
);

<Button name={`foobar ${document.title}`} />
/*
props = {
    name: 'foobar Document'
}
*/
```
Specialus `props` narys skirtas perduoti React node (komponentą, arba elementą arba jų masyvą) - `children`.
```js
const Button = (props) => (
    <button name={props.name}>
        {props.text}
    </button>
);
<Button text="Push" name="foobar" />
```
```js
const Button = (props) => (
    <button name={props.name}>
        {props.children}
    </button>
);
<Button name="foobar">
    Push
</Button>
// or even
<Button name="foobar">
    <span>Push</span>
</Button>
```

#### 1.2 Callbacks
Norint gauti duomenis iš komponento vidaus į išorę naudosime `callback`. Tai yra paprasta funkcija perduodama per `props`.
```jsx
// Button.jsx
const attributes = {
    type: 'button'
}
class Button extends React.Component {
    constructor(props) {
        super(props);
        props.onConstruct(attributes);
    }
    render() {
        <button type={attributes.type}
    }
};
```
```jsx
// Form.tsx
function haveData(data) {
    console.log(data); // { type: 'button' }
}

class Form extends React.Component {
    render() {
        <form>
            <legend>The Form</legend>
            <Button onConstruct={haveData} />
        </form>
    }
}
```

### 2. <a name="layout"></a> App layout
Kursime app su gana įprastu layout. Layout bus ruošiamas mobile-first. Viršuje turėsime meniu, logotipą. Žemiau išvardinsime vienokio ar kitokio tipo subjektus, kurie turės nuorodas ir informaciją.
Apačioje turėsim footer su statinio teksto nuorodom.
```
+---------------------------------+
|LOGO  |new|comments|show|ask|jobs|
+---------------------------------+
|                                 |
| 1. Making rain simulation as    |
|    real as possible             |
|                                 |
|    by sazers | 14 comments      |
|                                 |
| +-----------------------------+ |
|                                 |
| 2. Show HN: Google Earth for    |
|    live radios                  |
|                                 |
|    by jaoed | 1 comment         |
|                                 |
| +-----------------------------+ |
|                                 |
| prev | 1 | 2 | 3 | 4 | 5 | next |
|                                 |
|                                 |
| FAQ                             |
| Support                         |
| Careers                         |
|                                 |
+---------------------------------+
```
Paverskime tokį kodą `jsx` layout.
```jsx
<React.fragment>
    <nav>
        <div>logo</div>
        <div>
            <a href="#new">new</a>
            <a href="#comments">comments</a>
            <a href="#show">show</a>
            <a href="#ask">ask</a>
            <a href="#jobs">jobs</a>
        </div>
    </nav>
    <main>
        <div>
            <span>1.</span>
            <div>Making rain simulation as real as possible</div>
            <div>
                <a href="#sazers">by sazers</a>
                <a href="#comments">14 comments</a>
            </div>
        </div>
        <div>
            <span>1.</span>
            <div>Show HN: Google Earth for live radios</div>
            <div>
                <a href="#jaoed">by jaoed</a>
                <a href="#comments">1 comment</a>
            </div>
        </div>
    </main>
    <footer>
        <a href="#FAQ">FAQ</a>
        <a href="#Support">Support</a>
        <a href="#Carrers">Carrers</a>
    </footer>
</React.fragment>
```
Toliau šį layout turėtume suskaidyti į nedidelius komponentus. Komponentų dydis turi būti toks, kad tenkintų *Single Responsibility* principą ir turėtų *interface* kuris neatskleistų implementacijos detalių. Semantinis sąrašas galėtų atrodyti taip:
* menu
    * logo
    * navigacija
        * list
            * link
* turinys
    * list
        * card
            * content
            * footer
* footer
    * list
        * link

Failų struktūra galėtų būti tokia
```
src/
    components/
        Menu.jsx
        Nav.jsx
        NavLinks.jsx
        NavLink.jsx
        Cards.jsx
        Card.jsx
        CardContent.jsx
        CardFooter.jsx
        Footer.jsx
        FooterLinks.jsx
```
Example layout
```jsx
const Layout = () => (
    <React.fragment>
        <Nav />
        <Cards />
        <Footer />
    </React.fragment>
);
```
#### 2.1 Duomenų perdavimas
Šiame etape turime komponentus, kuriuose visa informacija yra statiška. Tačiau pagal prigimtį mūsų programoje nemažai informacijos yra dinamiška. Kol kas turime
* **item** - `Card` komponento subjektas
* **page** - `NavLink` komponento subjektas

Galime pamėginti nusakyti jų struktūrą ir išvardinti juos dinamiškai. `JSX` sintaksė renderina tai, ką gražina išraiška tarp `{}`, todėl norint spausdinti masyvą React komponentų naudojame [Array.map](https://devdocs.io/javascript/global_objects/array/map). Kiekvienas masyvo narys bus mappinamas į komponetą.
```js
// src/components/Cards.jsx
const items = [
    {
        title: 'Making rain simulation as real as possible',
        comments_count: 14,
        url: 'http://rainbowhunt.me/?plays',
        user: 'sazers'
    },
    {
        title: 'Show HN: Google Earth for live radios',
        comments_count: 1,
        url: 'http://radio.garden',
        user: 'jaoued'
    }
];

const Cards = () => (
    <main>
        {items.map((item) => (
            <Card item={item} />
        ))}
    </main>
)
```
Analogiškai galėtume pasielgti su menu linkais.
```js
const pages = [
    {
        title: 'new',
        link: '#new'
    },
    {
        title: 'comments',
        link: '#comments'
    }
    ...
];
```
### 3. <a name="styling"></a> Styling
Naudosime [bulma](https://bulma.io) css framework. Tam reikės įsidiegti kelis dependencies.
```sh
npm install sass -D
npm install postcss-modules -D
npm install bulma
```
```jsx
// src/main.jsx
import 'bulma/css/bulma.css';
```
`postcss-modules` leidžia turėti [`css modules`](https://github.com/css-modules/css-modules) patogumus. Galime turėti `scss` failą kiekvienam komponentui su bet kokiais klasių selektoriais ir `css-modules` užtikrins kad klasės yra unikalios.
