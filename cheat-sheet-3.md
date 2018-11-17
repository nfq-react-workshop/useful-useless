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
