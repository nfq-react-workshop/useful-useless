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
### 3. <a name="styling"></a> Styling