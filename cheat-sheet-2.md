# Cheat-sheet for Workshop 2

# 1. Aplikacijos kodas

## 1.1 src/components/FloatingButton/FloatingButton.jsx
```js
import * as React from 'react';

export class FloatingButton extends React.Component {
  render() {
    const { to } = this.props;

    return (
      <a href={to}>
        Click me
      </a>
    );
  }
}
```

## 1.2 src/pages/Landing/LandingPage.jsx
```js
import * as React from 'react';

import { FloatingButton } from '../../components/FloatingButton/FloatingButton';

export class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <FloatingButton to="/item/create" />
      </div>
    );
  }
}
```

## 1.3 src/root/App.jsx
```js
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import { LandingPage } from '../pages/Landing/LandingPage';

export default class App extends React.Component {
  render() {
    return <LandingPage />;
  }
}
```

## 1.4 src/components/ItemList/ItemList.jsx
```js
import * as React from 'react';

export class ItemList extends React.Component {
  constructor(props) {
    super(props);
    
    this.mockItems = [
      {
        id: 1,
        title: 'test',
        image: 'http://placehold.it/640x480',
        description: 'Test description',
      },
    ];
  }

  render() {
    const { items } = this.props;

    return (
      <div className="columns is-multiline">
        {items.map((item, index) => (
          <div key={index} className="column is-one-third">
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}
```

## 1.5 src/components/ItemCard/ItemCard.jsx
```js
import * as React from 'react';

export class ItemCard extends React.Component {
  render() {
    const {
      item: { id, title, image, description },
    } = this.props;

    return (
      <a href={`item/${id}`} className="card">
        <div className="card-image">
          <div className="image is-16by9">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </a>
    );
  }
}
```

## 1.6 src/layouts/Landing/LandingLayout.jsx
```js
import * as React from 'react';

export class LandingLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Useful-Useless</h1>
              <h2 className="subtitle">A garbage collector</h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">{this.props.children}</div>
        </section>
      </React.Fragment>
    );
  }
}
```

## 1.7 src/root/App.jsx
```js
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import { LandingPage } from '../pages/Landing/LandingPage';
import { LandingLayout } from '../layouts/Landing/LandingLayout';

export default class App extends React.Component {
  render() {
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    );
  }
}
```

# 2. Keli nauji įrankiai

# 2.1 Instaliuojame įrankius CSS naudojimui
```sh
npm install sass
npm install postcss-modules
```

# 2.2 Instaliuojame stilių ir ikonėlių bibliotekas
```sh
npm install bulma
npm install font-awesome
```

# 3. Aplikacijos stilius

## 3.1 src/root/App.jsx
```js
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import { LandingPage } from '../pages/Landing/LandingPage';
import { LandingLayout } from '../layouts/Landing/LandingLayout';

import 'bulma/bulma.sass';
import 'font-awesome/scss/font-awesome.scss';

export default class App extends React.Component {
  render() {
    return (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    );
  }
}
```

## 3.2 src/components/FloatingButton/FloatingButton.scss
```css
.plusButton {
  border-radius: 1000px !important;
  position: fixed !important;
  bottom: 60px;
  right: 60px;
}
```

## 3.3 src/components/FloatingButton/FloatingButton.jsx
```js
import * as React from 'react';

import styles from './FloatingButton.scss';

export class FloatingButton extends React.Component {
  render() {
    const { to } = this.props;

    return (
      <a href={to} className={`button is-danger is-large ${styles.plusButton}`}>
        <span className="icon">
          <i className="fa fa-plus" />
        </span>
      </a>
    );
  }
}
```

## 3.4 src/components/ItemCard/ItemCard.scss
```css
.block {
    display: block;
}
```
## 3.5 src/components/ItemCard/ItemCard.jsx
```js
import * as React from 'react';

import styles from './ItemCard.scss';

export class ItemCard extends React.Component {
  render() {
    const {
      item: { id, title, image, description },
    } = this.props;

    return (
      <a href={`item/${id}`} className={`card ${styles.block}`}>
        <div className="card-image">
          <div className="image is-16by9">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </a>
    );
  }
}
```
