# React workshop #4

# 1. React komponentų State

React komponentai turi `state` objektą, į kurio pasikeitimus reaguoja
ir persirenderina. By default objekto reikšmė yra `undefined`.
`state` objektas yra read-only ir jį pasiekti galime per `this.state`.

## 1.1 Inicijuokime state mūsų komponente

State inicijuojame klasės konstruktoriuje

> src/components/Item/Item.jsx

```js
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }
```

Taip pat su'bind'inkime `onSpacerClick` metodą

> src/components/Item/Item.jsx

```js
  constructor(props) {
    ...
    
    this.onSpacerClick = this.onSpacerClick.bind(this);
  }
```

Perrašykime `onSpacerClick` metodą pakeisdami state

> src/components/Item/Item.jsx

```js
  onSpacerClick() {
    this.setState(prevState => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }
```

Modifikuojame elemento klasę priklausomai nuo state

> src/components/Item/Item.jsx

```js
render() {
  ...
  
    <div
      className={`${styles.imageSpacer} ${this.state.collapsed ? styles.collapsed : ''}`}
      onClick={this.onSpacerClick}
      role="presentation"
    />
    
  ...  
}
```

Prisidėkime šiek tiek stiliaus

> src/components/Item/Item.scss

```css
.imageSpacer {
  height: 70vh;

  transition: height 0.3s ease-out;
}

...

.collapsed {
  height: 10vh;
}
```

# 2. Išorinių duomenų užkrovimas

Iki šiol naudojome statinį failą duomenims į komponentus užkrauti.
Pakeiskime tai ir imkime duomeni iš HTTP API.

## 2.1 Instaliuojame json-server

```sh
npm install json-server
```

Prisidedame script į package.json lengvam serverio paleidimui

> pckage.json

```json
"scripts": {
  ...,
  "server": "json-server --watch ./src/mocks/data.json"
}
```

Paleidžiame JSON serverį:

```sh
npm run server
```

## 2.2 Instaliuojame axios

Taip pat mums reikės bibliotekos HTTP request'ams iš mūsų aplikacijos.
Naudosime `axios`:

```sh
npm install axios
```

## 2.3 Imame items iš API

Panaikinkime mūsų vietinį mock import'ą `LandingPage` puslapyje ir
išsitraukime visus items iš API.

> src/pages/Landing/LandingPage.jsx

```js
import * as React from 'react';
import axios from 'axios';

import { FloatingButton } from '../../components/FloatingButton/FloatingButton';
import { ItemList } from '../../components/ItemList/ItemList';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/items')
      .then(response => response.data)
      .then(data => {
        this.setState({
          items: data
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <ItemList items={this.state.items} />
        <FloatingButton to="/item/create" />
      </React.Fragment>
    );
  }
}
```

# 3. Sąlyginis renderinimas

Kai kada reikia nuspręsti kokį komponentą rodysime priklausomai nuo
kintamojo reikšmės. Šiuo atveju kol mūsų item'ai kraunasi galime rodyti
žinutę vartotojui apie vykstantį procesą:

> src/pages/Landing/LandingPage.jsx

```js
  constructor(props) {
    super(props);

    this.state = {
      items: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/items')
      .then(response => response.data)
      .then(data => {
        this.setState({
          items: data,
          loading: false,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <p>Loading... Please wait.</p>}
        {this.state.loading || <ItemList items={this.state.items} />}
        <FloatingButton to="/item/create" />
      </React.Fragment>
    );
  }
```

# 4. Stateless Functional Components

Gan dažnai React aplikacijose komponentams nereikia turėti jokio state.
Tokiu atveju galime naudoti paprastą funkciją vietoje klasės kuri pati
veiks kaip `render` metodas ir gaus props kaip argumentą.

Vienas tokių komponentų galėtų būtų mūsų FloatingButton. Paverskime jį
stateless function komponentu:

> src/components/FloatingButton/FloatingButton.jsx

```js
import * as React from 'react';

import styles from './FloatingButton.scss';

export function FloatingButton({ to }) {
  return (
    <a href={to} className={`button is-danger is-large ${styles.plusButton}`}>
      <span className="icon">
        <i className="fa fa-plus" />
      </span>
    </a>
  );
}
```

# 5. Higher-Order Components

## 5.1 Containers

Konteinerį galime naudoti kai komponentui norime suteikti papildomo
funkcionalumo tačiau nenorime keisti pačio komponento kad išlaikyti
jį "švarų". Susikurkime konteinerį mūsų Item komponentui kuris
ištrauks atitinkamą item iš API pagal puslapio url nurodytą ID:

> src/containers/Item/ItemContainer.jsx

```js
import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { Item } from '../../components/Item/Item';

export class ItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/items/${this.props.itemId}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          loading: false,
          item: data,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          item: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    if (this.state.item === false) {
      return <Redirect to="/404" />;
    }

    return <Item item={this.state.item} />;
  }
}
```

Pakeiskime Item komponentą naudojamą ItemPage komponente į naująjį
ItemContainer:

> src/pages/Item/ItemPage.jsx

```js
import * as React from 'react';

import { ItemContainer } from '../../containers/Item/ItemContainer';

export class ItemPage extends React.Component {
  render() {
    const { match } = this.props;

    return <ItemContainer itemId={match.params.id} />;
  }
}
```

## 5.2 Higher Order Components (HOC)

Konteineriai yra puikus būdas pridėti papildomo funkcionalumo komponentui,
tačiau mūsų pavyzdyje ItemContainer pats implementuoja visą logiką duomenims
iš API traukti. Šią logiką galime suabstraktuoti ir perpanudoti daugelyje
kitų konteinerių ar komponentų naudodami HOC:

> src/HOC/withData.jsx

```js
import * as React from 'react';
import axios from 'axios';

export function withData(Component, mappedProps) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      Object.keys(mappedProps).forEach(key => {
        const source =
          mappedProps[key] instanceof Function
            ? mappedProps[key](this.props)
            : mappedProps[key];

        axios
          .get(`http://localhost:3000/${source}`)
          .then(response => response.data)
          .then(data => {
            this.setState({
              [key]: data,
              loading: false,
            });
          })
          .catch(() => {
            this.setState({
              [key]: false,
              loading: false,
            });
          });
      });
    }

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  };
}
```

O dabar galime apvalyti ItemContainer:

> src/containers/Item/ItemContainer.jsx

```js
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { withData } from '../../HOC/withData';

import { Item } from '../../components/Item/Item';

export class ItemContainerComponent extends React.Component {
  render() {
    const { loading, item } = this.props;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (item === false) {
      return <Redirect to="/404" />;
    }

    return <Item item={item} />;
  }
}

export const ItemContainer = withData(ItemContainerComponent, {
  item: props => `items/${props.itemId}`,
});
```

# 6. Kas toliau?

* Paversti likusius komponentus kuriems nereikia state į stateless
functional komponentus
* Perdaryti ItemList naudojant HOC
* Sukurti formą naujo Item pridėjimui
