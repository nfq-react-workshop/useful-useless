# Cheat-sheet for Workshop 3

# 1. Aplikacijos kodas

## 1.1 src/root/App.jsx
```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

...

render() {
  return (
    <Router>
      <LandingLayout>
        <Route exact path="/" component={LandingPage} />
      </LandingLayout>
    </Router>
  );
}
```

## 1.2 src/pages/NotFound/NotFoundPage.jsx
```js
import * as React from 'react';

import styles from './NotFoundPage.scss';

export class NotFoundPage extends React.Component {
  render() {
    return (
      <section className="section">
        <h1 className={`title ${styles.isSuper}`}>404</h1>
        <p className={`${styles.isHighlighted}`}>Sorry, the thing you`re looking for was not found.</p>
      </section>
    );
  }
}
```

## 1.3 src/pages/NotFound/NotFoundPage.scss
```css
.isSuper {
    color: white !important;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
    font-size: 6rem !important;
}

.isHighlighted {
    background-color: #00d1b2;
    padding: 3px 8px;
    display: inline-block;
    color: white !important;
}
```

## 1.4 src/root/App.jsx
```js
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

...

  render() {
    return (
      <Router>
        <LandingLayout>
          <Route exact path="/" component={LandingPage} />
          <Route component={NotFoundPage} />
        </LandingLayout>
      </Router>
    );
  }
```
## 1.5 src/root/App.jsx
```js
import { Switch } from 'react-router-dom';

...

  render() {
    return (
      <Router>
        <LandingLayout>
          <switch>
            <Route exact path="/" component={LandingPage} />
            <Route component={NotFoundPage} />
          </switch>
        </LandingLayout>
      </Router>
    );
  }
```

## 1.6 src/pages/NotFound/NotFoundPage.jsx
```js
import { Link } from 'react-router-dom';

...

  render() {
    return (
      <section className="section">
        <h1 className={`title ${styles.isSuper}`}>404</h1>
        <p className={`${styles.isHighlighted}`}>Sorry, the thing you`re looking for was not found.</p>
        <hr />
        <p>
          You can try returning <Link to="/">home</Link> to continue your search for glory.
        </p>
      </section>
    );
  }
```
## 1.7 src/root/Route.jsx
```js
import * as React from 'react';
import { Route as ReactRoute } from 'react-router-dom';

export class Route extends React.Component {
  render() {
    const { component, layout, ...rest } = this.props;
    let routeComponent = props => React.createElement(component, props);

    if (layout) {
      routeComponent = props =>
        React.createElement(layout, props, React.createElement(component, props));
    }

    return <ReactRoute {...rest} render={routeComponent} />;
  }
}
```

## 1.8 src/root/App.jsx
```js
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} layout={LandingLayout} />
          <Route component={NotFoundPage} layout={LandingLayout} />
        </Switch>
      </Router>
    );
  }
```

## 1.9 src/layouts/Clean/CleanLayout.jsx
```js
import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './CleanLayout.scss';

export class CleanLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar is-primary is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <img src="https://placehold.it/112x28?text=Logo" alt="Useful-useless" />
              </Link>

              <a role="button" className={`navbar-burger ${styles.burger}`}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to="/">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">{this.props.children}</div>
        </section>
      </React.Fragment>
    );
  }
}
``` 

## 1.10 src/layouts/Clean/CleanLayout.scss
```css
.burger {
  color: white;
  background: none;
  border: none;
}
```

## 1.11 src/components/Item/Item.jsx
```js
import * as React from 'react';

import styles from './Item.scss';

import './Cover.scss';

export class Item extends React.Component {
  componentDidMount() {
    WindowTools.setBodyImage(this.props.item.image);
  }

  componentWillUnmount() {
    WindowTools.setBodyImage(null);
  }

  render() {
    const {
      item: { title, subtitle, description },
    } = this.props;

    return (
      <div>
        <div className={styles.imageSpacer} />
        <h1 className={`title ${styles.isSuper}`}>{title}</h1>
        <p className={`subtitle ${styles.isHighlighted}`}>{subtitle}</p>
        <div className={`card ${styles.spacedBottom}`}>
          <div className="card-content">
            <div className="content">
              <div>{description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

## 1.12 src/services/Utils/WindowTools.js

```js
export class WindowTools {
  static setBodyImage(image) {
    document.body.style.backgroundImage = image ? `url("${image}")` : null;
  }
}
```

## 1.13 src/components/Item/Item.scss
```css
.imageSpacer {
  height: 70vh;
}

.isSuper {
  color: white !important;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
  font-size: 6rem !important;
}

.isHighlighted {
  background-color: #00d1b2;
  padding: 3px 8px;
  display: inline-block;
  color: white !important;
}

.spacedBottom {
  margin-bottom: 2rem;
}
```

## 1.14 src/components/Item/Cover.scss
```css
html {
  height: 100%;
}

body {
  min-height: 100%;
  padding-top: 3.25rem;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position-y: 3.25rem;
  background-position-x: center;
}
```

## 1.15 src/pages/Item/ItemPage.jsx
```js
import * as React from 'react';

import { Item } from '../../components/Item/Item';

export class ItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.mockItem = {
      id: 1,
      title: 'test',
      image: 'https://www.supercars.net/blog/wp-content/uploads/2016/12/Ferrari-LaFerrari.jpg',
      description: 'Test description',
    };
  }

  render() {
    return <Item item={this.mockItem} />;
  }
}
```

## 1.16 src/root/App.jsx
```js
import { ItemPage } from '../pages/Item/ItemPage';

...

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} layout={LandingLayout} />
          <Route exact path="/item/:id" component={ItemPage} layout={CleanLayout} />
          <Route component={NotFoundPage} layout={CleanLayout} />
        </Switch>
      </Router>
    );
  }
```

## 1.17 src/mocks/data.json

https://raw.githubusercontent.com/nfq-react-workshop/useful-useless/workshop-3/src/mocks/data.json

## 1.18 src/pages/Item/ItemPage.jsx
 ```js
import * as React from 'react';

import { Item } from '../../components/Item/Item';

import mock from '../../mocks/data';

export class ItemPage extends React.Component {
  render() {
    const { match } = this.props;

    const item = mock.items.find(i => i.id === match.params.id);

    return <Item item={item} />;
  }
}
```

## 1.19 src/components/Item/Item.jsx
```js
  onSpacerClick() {
    WindowTools.invertBodyImage();
  }
  
  ...

  render() {
    ...
  
    return (
      <div>
        <div className={styles.imageSpacer} onClick={this.onSpacerClick} />
        ...
      </div>
    );  
  }
```

## 1.20 src/services/Utils/WindowTools.js
```js
  static invertBodyImage() {
    document.body.style.filter = 'grayscale(100%)';
  }
```
