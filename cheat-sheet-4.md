# Cheat-sheet for Workshop 4

# 1. Aplikacijos kodas

## 1.1 src/components/Item/Item.jsx

```js
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
    
    this.onSpacerClick = this.onSpacerClick.bind(this);
  }
```

## 1.2 src/components/Item/Item.jsx

```js
  onSpacerClick() {
    this.setState(prevState => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }
```

## 1.3 src/components/Item/Item.jsx

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

## 1.4 src/components/Item/Item.scss

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

## 1.5 pckage.json

```json
"scripts": {
  ...,
  "server": "json-server --watch ./src/mocks/data.json"
}
```

## 1.6 src/pages/Landing/LandingPage.jsx

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

## 1.7 src/pages/Landing/LandingPage.jsx

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

## 1.8 src/components/FloatingButton/FloatingButton.jsx

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

## 1.9 src/containers/Item/ItemContainer.jsx

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

## 1.10 src/pages/Item/ItemPage.jsx

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

## 1.11 src/HOC/withData.jsx

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

## 1.12 src/containers/Item/ItemContainer.jsx

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
