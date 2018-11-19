# React workshop #3

Praeitoje paskaitoje sukūrėme komponentus vienam projekto puslapiui ir pritaikėme jam stilių. Šioje paskaitoje paruošime kitus puslapius ir navigaciją tarp jų. Kai kurie komponentai taps interaktyvūs nes panaudosime React vidinį `state`. Tuo pačiu susipažinsime, kaip naudojant React reaguotį į `event`us

### Agenda
1. [Routing](#routing)
2. [React life cycle](#life)
3. [DOM events](#dom)

### 1. <a name="routing"></a> Routing

SPA ir routing yra neatsiejamos sąvokos. Principas yra iš server pusės visais `path` grąžinti tą patį `index.html`, o client side pagal url `path` parinkti kokį turinį reikia rodyti. Client side routing savo esme niekuo nesiskiria nuo server side routing. Turime `path(string)` ir turime tam tikra eilės tvarka išrikiuotas taisykles. Kurias taisykles `path` atitinka, tokį turinį ir parenkame.

Routing bibliotekų yra nemažai, tačiau šiuo atveju naudosime `react-router`.
```sh
npm install react-router
npm install react-router-dom
```
Router taisyklės apsirašo kaip komponentai.
```js
import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '/pages/HomePage';
import New from '/pages/New';
import Comment from '/pages/Comment';
import NotFound from '/pages/NotFound';

<Router>
    <div>header</div>
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/new/:page?" component={New} />
        <Route path="/comment/:id" component={Comment} />
        <Route component={NotFound} />
    </Switch>
    <div>footer</div>
</Router>
```
Navigavimui tarp tokių puslapių naudojame `Link` komponentą.
```js
import { Link } from 'react-router-dom';

<Link to="/new/1">page 1</Link>
```

### 2. <a name="life"></a> React life cycle

#### 2.1 `componentDidMount`
Šis klasės metodas bus pakviestas iš kart, kai komponentas bus įdėtas į DOM. Paprastai naudojamas pakviesti duomenų parsiuntimo funkciją ar atlikti kokį nors veiksmą, kuris reikalauja, kad komponentas jau būtų DOM.

#### 2.2 `componentWillUnmount`
Šis klasės metodas yra pakviečiamas prieš pat išimant jį iš DOM. Paprastai naudojamas pašalinti įvairiems pašaliniams poveikiams. Pavyzdžiui `componentDidMount` buvo subscribinama, tuomet `componentWillUnmount` turėtume daryti unsubscribe.

#### 2.3 `shouldComponentUpdate`
Metodas kviečiamas kai komponento `props` **arba** `state` pasikeitė. Jo grąžinamas rezultatas labai reikšmingai įtakoja performance. By default šio metodo grąžinama reikšmė yra `true`.

#### 2.4 `componentDidUpdate`
Šis metodas kviečiamas tuomet, kai `shouldComponentUpdate` atsakė `true` **ir** buvo pakviestas render metodas.

![React life cycle diagram](https://cdn-images-1.medium.com/max/1600/0*OoDfQ7pzAqg6yETH.)
### 3. <a name="dom"></a> DOM events

React eventus valdome gana panašiai, kaip tai darytume naudodami tik HTML.
```html
<div onclick="fetchData()">fetch</div>
```
```jsx
<div onClick={fetchData}>fetch</div>
```
Naudojame React klases kai dirbame su su eventais. Event handleriams funkcijas įprastai vadiname su prefix `handle`. O komponento `prop` vadiname panašiai, kaip `prop`, perduodamą elementui pvz. `onClick`, `onButtonClick`, `onMouseOver` ir t.t.
```jsx
class Button extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <button onClick={handleClick}>
                {this.props.children}
            </button>
        )
    }
}

Button.propTypes = {
    onClick: PropTypes.func
};
```
