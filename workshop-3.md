# React workshop #3

# 1. Routing

Norėdami savo aplikacijoje turėti daugiau nei vieną puslapį turėsime
implementuoti router'į. Kad nereiktų to daryti patiems nuo nulio mums
padės su React suderinamos route'inimo bibliotekos `react-router` ir 
`react-router-dom`. Pastaroji reikalinga tam, kad `react router` galetų
valdyti naršyklės history ir puslapio adresą įgalintant aplikacijos 
navigaciją tarp skirtingų puslapių kaip įprastoje svetainėje.

## 1.1 Instaliuojame react router

```sh
npm install react-router
npm install react-router-dom
```

## 1.2 Diegiame router į mūsų aplikaciją

Importuojame BrowserRouter komponentą kuris leis router'iui valdyti
naršyklės history bei puslapio adresą

> src/root/App.jsx
```js
import { BrowserRouter as Router } from 'react-router-dom';
```

Apgaubiame mūsų App komponento elementus Router komponentu render funkcijoje

> src/root/App.jsx
```js
  render() {
    return (
      <Router>
        <LandingLayout>
          <LandingPage />
        </LandingLayout>
      </Router>
    );
  }
```

## 1.3 Mūsų pirmas Route

`Route` iš `react-router-dom` tai dar vienas komponentas kuris priima du
props: `path` ir `component`. `path` prop'se nurodome kokiam url atitikus
šis komponentas bus iš'render'intas, o kartu su juo ir mūsų komponentas kurį
nurodome per `component` prop'są.

Paverčiame mūsų LandingPage puslapio komponentą į Route komponentą 

> src/root/App.jsx
```js
  render() {
    return (
      <Router>
        <LandingLayout>
          <Route path="/" component={LandingPage} />
        </LandingLayout>
      </Router>
    );
  }
```

Pabandykime nueiti į kokį nors kitą puslapį, pvz: `/test` - kaip matome
vistiek yra rodomas mūsų landing page. Taip atsitinka todėl, kad `Router`
komponento `path` prop'se mūsų nurodytas url yra tikrinamas taip, kad užtenka
jog mūsų įrašyta reikšmė egzistuotų pačiame url, taigi šiuo atveju mūsų
nurodytas path `/` egzistuos visuose url kokius tik bandysime atidaryti.
Kad mūsų `Route` komponentas būtų renderinamas tik tada kai url tiksliai
atitinka nurodytą `path` nustatome `exact` prop'są.

> src/root/App.jsx
```js
  <Route exact path="/" component={LandingPage} />
```

Pabandykime nueiti į `/test` url ir pamatysime kad mūsų landing page
komponentas nebėra išrenderinamas.

## 1.4 Kuriame 404 puslapį

Nuėję į puslapio url koris nėra užregistruotas nei viename `Route` komponente
nematysime nieko išrenderinamo. Kad vartotojui parodyti žinutę jog jo ieškomas
puslapis nerastas, susikurkime 404 puslapį.

Pirmiausia susikurkime pačio puslapio komponentą

> src/pages/NotFound/NotFoundPage.jsx
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

Pridėkime šiek tiek stiliaus

> src/pages/NotFound/NotFoundPage.jsx
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

Pridedame naują Route į App komponentą ir norodome mūsų naują NotFound
komponentą kaip Route komponento `component` propso reikšmę.
Šį kartą nenustatome Route komponentui jokios `path` prop'so reikšmės,
kadangi norime jog visi url kurie nėra nurodyti atsidurtų šiame komponente.

> src/root/App.jsx
```js
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

Jeigu vėl pabandysime atsidaryti `/test` puslapį kuris neegzistuoja
matysime mūsų naują 404 puslapį. Puiku! Ne visai... Nueikime į `/`
puslapį. Matome kad išsirenderina ne tik mūsų LandingPage komponentas
tačiau kartu ir mūsų naujasis NotFound komponentas. Taip atsitinka todėl
kad routeris visus Route renderina "inclusive" būdu. T.y. visus Route
kurių path tinka dabar atidarytam puslapiui. Tam kad priverstume routerį
renderinti puslapius "exclusive" būdu panaudosime dar vieną komponentą iš
`react-router-dom` bibliotekos - `Switch`. Visi Route gyvenantys Switch
komponento viduje bus renderinami exclusive būdu. T.y. routeriui suradus
pirmąjį Route kurio path tinka mūsų dabartiniam puslapiui - jis bus
išrenderintas, o visi likę Route (net ir tie kurie irgi tiktų) - ne.

Importuokime `Switch` komponentą ir apgaubkime juo visus Route komponentus
> src/root/App.jsx
```js
import { Switch } from 'react-router-dom';
```
```js
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

Reiktų nepamirši atkreipti dėmesio į Route komponentų esančių po Switch 
komponentu eiliškumą, kadangi kaip ir minėjome Switch pasirinks ir renderins
pirmą tikusį Route. 

# 1.5 Naviguojame tarp puslapių

Kad patektume į kitus puslapius savo aplikacijoje mums reikės nuorodų.
Tradiciškai nuorodoms naudojame `<a>` elementus, tačiau su React router
nudosime `Link` komponentą. `Link` komponentas mums leis naviguoti tarp
aplikacijos puslapių neperkraunant pačios aplikacijos.

Panaudokime `Link` komponentą mūsų NotFound puslapyje

> src/pages/NotFound/NotFoundPage.jsx
```js
import { Link } from 'react-router-dom';
```
```js
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

# 1.6 Skirtingi Layout skirtingiems puslapiams

Šiuo metu visi mūsų aplikacijos puslapiai apgaubdi LandingLlayout
komponentu. Susikurtkime savo Route komponentą kuris veiks kaip
wrapper'is `react-router-dom` bibliotekos Route komponentui ir leis
mums nurodyti layout komponentą išskirtinai kiekvienam individualiam Route.

> src/root/Route.jsx
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

Pakeiskime mūsų Route komponentus naujuoju Route wrapper'iu

> src/root/App.jsx
```js
import { Route } from './Route';
```

Taip pat iškelkime mūsų layout komponentą ir nurodykime jį kaip `layout`
prop reikšmę kiekvienam mūsų naujam Route komponentui.

> src/root/App.jsx
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

Kadangi jau turime galimybę nurodyti layout komponentą kiekvienam
individualiam Route susikurkime dar vieną layout komponentą ir panaudokime
jį mūsų 404 puslapiui

> src/layouts/Clean/CleanLayout.jsx
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

Šiek tiek stiliaus

> src/layouts/Clean/CleanLayout.scss
```css
.burger {
  color: white;
  background: none;
  border: none;
}
```

Panaudokime mūsų nująjį layout 404 Route komponentui

> src/root/App.jsx
```js
<Route component={NotFoundPage} layout={CleanLayout} />
```

# 2. React lifecycle metodai

## 2.1 componentDidMount

Funckija iškviečiama iš karto kai React komponentas yra pirmą kartą įkeliamas
į DOM. Šiame metode galime atlikti įvairias inicializacijas, arba atlikti
DOM manipuliacijas (pvz. pridėti klasę ant `<body>` elemento).

## 2.2 componentDidUpdate

Ši funkcija iškviečiama kai komponento props (arba state - apie tai sužinosime
vėliau) atsinaujina. Tai puiki vieta atlikti props modifikacijoms (pvz. vieno
iš props datos formatavimas) arba papildomoms DOM manipuliacijoms.

## 2.3 componentWillUnmount

Funkcija iškviečiama prieš komponentą išimant iš DOM. Tai gera vieta
nutraukti intervalus ar išvalyti kitus resursus iš atminties. 

## 2.4 shouldComponentUpdate

Šioje funkcijoje galime nuspręsti ar komponentas turėtų atsinaujinti.
Dažniausiai ši funkcija nėra naudojama, tačiau speceliais scenarijais
kai pvz. tam tikro prop pasikeitimas sukelia per daug re-render'ių galime
jo reikšmę patikrinti ir atitinkamai atiduoti boolean value kuris ir nuspręs
ar komponentas bus atnaujintas.

## 2.5 Susikurkime Item komponentą

> src/components/Item/Item.jsx
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

> src/components/Item/Item.scss
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

> src/components/Item/Cover.scss
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

Susikurkime tr8kstamą WindowTools helper klasę

> src/services/Utils/WindowTools.js

```js
export class WindowTools {
  static setBodyImage(image) {
    document.body.style.backgroundImage = image ? `url("${image}")` : null;
  }
}
```

Susikurkime puslapį kuriame atvaizduosime mūsų naująjį Item komponentą

> src/pages/Item/ItemPage.jsx
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
      subtitle: 'Test subtitle',
      description: 'Test description',
    };
  }

  render() {
    return <Item item={this.mockItem} />;
  }
}
```

Sukurtkime naują Route naujajam Item puslapiui

> src/root/App.jsx
```js
import { ItemPage } from '../pages/Item/ItemPage';
```
```js
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

Atkreipkime dėmesį į `:id` kurį įrašėme į Route path - tai route path
kintamasis. Kintamuosius galime pasiekti iš komponento ir pagal tai spręsti 
koks įrašas bus atvaizduotas.

Pirmiausia susikurkime daugiau įrašų

> src/mocks/data.json

https://raw.githubusercontent.com/nfq-react-workshop/useful-useless/workshop-3/src/mocks/data.json

Panaudokime naujuosius įrašus Landing puslapyje

> src/pages/Landing/LandingPage.jsx
```js
import mock from '../../mocks/data';

...

<ItemList items={mock.items} />
```

Taip pat panaudokime šiuos įrašus ir mūsų Item puslapyje surasdami tinkamą
įrašą pagal route path kintamąjį kurį pasieksime per `this.props.match`

> src/pages/Item/ItemPage.jsx
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

# 3. DOM eventai ir `this`

React'e DOM eventai naudojami labai panašiai kaip ir įprastame HTML.
Ant elemento rašome `on*` (* bet koks DOM eventas, pvz: click) ir
priskiriame funkciją. Ši funkcija bus iškviesta įvykus laukiamam veiksmui.

Pridėkime click eventą į mūsų Item komponentą:

> src/components/Item/Item.jsx

```js
  onSpacerClick() {
    WindowTools.invertBodyImage();
  }
```

```js
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

Pridėkime šią funkciją į WindowTools helper klasę

> src/services/Utils/WindowTools.js
```js
  static invertBodyImage() {
    document.body.style.filter = 'grayscale(100%)';
  }
```

# 4. Darbas su eventais

Į kiekvieną event handler'į gauname Event objektą. Šiame objekte galime
rasti įvairių naudingų funkcijų bei properčių.

## 4.1 preventDefault

Sustabdo standartinių naršyklės funkcijų vykdymą, pvz. klausydami click 
evento ant `<a>` elemento ir iškvietę šią funkciją galime sustabdyti
naršyklės navigaciją į `href` nurodytą ant `<a>` elemento.

## 4.2 stopPropagation

Iškvietę šią funckiją galime sustabdyti eventų "bubble'inimąsi" per DOM medį.

## 4.3 target

Šiame propertyje rasime DOM elementą kuris ir iššaukė mūsų klusomą event'ą.
