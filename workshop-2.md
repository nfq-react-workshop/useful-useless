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

### 2. <a name="layout"></a> App layout

### 3. <a name="styling"></a> Styling