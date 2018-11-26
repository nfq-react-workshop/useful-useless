# React workshop #4

Praeitame workshop išmokome naudoti client-side routing. Sujungėm routes su komponentais. Susipažinome, kaip veikia React life cycle. Ir praktiškai panaudojome React state.

### Agenda
1. [Išoriniai duomenys](#data)
2. [Sąlyginis renderinimas](#conditional)
3. [HOC](#hoc)

### 1. <a name="data"></a> Išoriniai duomenys

Iki šiol mūsų aplikacija turėjo statiškus duomenis. Paprastai duomenys arba jau būna persiųsti iš serverio, arba turime juos parsisiųsti.

Parsiuntimui vardan paprastumo naudosime [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Tačiau jis nėra palaikomas visose naršyklėse. Problemą spresime naudodami **polyfill**.
```sh
npm install whatwg-fetch --save
```
Taip pat mūsų aplikacijoje reikia įjungti `whatwg-fetch`
```js
// main.jsx
import 'whatwg-fetch';
```

#### 1.1 Promise
`fetch` funkcija grąžina `Promise`. Promise naudosime lengvesniam darbui su asichroninėmis funkcijomis. Pats paprasčiausias `Promise` pavyzdys gali būti su `setTimeout`.
```js
const runTimer = new Promise(
    (resolve, reject) => setTimeout(resolve, 100)
);

runTimer.then(() => console.log('time is up'));
```
`resolve` funkcijai galima perduoti argumentus.
```js
const runTimer = new Promise(
    (resolve, reject) => setTimeout(
        () => resolve(100),
        100
    )
);

runTimer.then((result) =>
    console.log(`time is up ${result}`));
```
Taip pat `Promise` gali būti atmestas. Tam naudojame reject funkciją.
```js
new Promise(function (resolve, reject) => {
    if (allIsOk) {
        resolve('ok good');
    } else {
        reject('not good');
    }
});
```
Reaguoti į `Promise` galime keliais būdais. Mums svarbiausi yra `then()` - kuomet `Promise` buvo išpildytas ir `catch()` - kuomet išpildyti nepavyko.
`then` ir `catch` taip pat grąžina `Promise` instance, tačiau `resolve` reikšmė yra tai, ką grąžina funkcija.
```js
const runNow = new Promise((resolve) => resolve(1));
runNow
    .then((value) => value + 5)
    .then((value) => value + 4)
    .then((value) => console.log(value));
    // 10
```

#### 1.2 fetch API
Fetch API viduje naudodamas `Promise` mums suteikia galimybę pasiekti [`response`](https://github.com/github/fetch#response-metadata) objektą.

Savo projektui mes naudosime JSON API iš https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md. Todėl mums reikės iš response pasiimti JSON. Būtinai reikia pasirūpinti nepavykusiais requestais.
```js
fetch('https://api.hnpwa.com/v0/news/1.json')
    .then(respone => response.json())
    .then(response => console.log(response))
    .catch(() => console.log('error'))
```

#### 1.3 Fetch API + React life cycle
Sujunkime `fetch` su `React`.
```js
componentDidMount() {
    this.fetchItems();
}

componentDidUpdate() {
    this.fetchItems();
}

fetchItems() {
    this.setState({ isFetching: true });
    fetch('https://api.hnpwa.com/v0/news/1.json')
        .then(respone => response.json())
        .then(items => this.setState({
            items,
            isFetching: false
        }))
        .catch((error) => this.setState({
            error,
            isFetching: false
        }))
}
```

### 2. <a name="conditional"></a> Sąlyginis renderinimas
Dažnai reikės vieną ar kitą komponentą renderinti priklausomai nuo tam tikrų sąlygų. Paprasčiausias scenarijus yra duomenų parsiuntimas. Kol duomenys siunčiami, vartotojui turi būti rodoma indikacija apie tai. Jeigu įvyko klaida, tai irgi turi kažkur atsispindėti. Rekomenduoju visuomet naudotis https://reactpatterns.com/. Imkime sąlyginio renderinimo pavyzdį.
```js
render() {
    return (
        <div>
            {isLoading && <LoadingIndicator />}
            {isLoading || (
                <Cards items={items}>)
            }
        </div>
    )
}
```
```js
render() {
    return (
        <div>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <Cards items={items}>)
            )}
        </div>
    )
}
```

### 3. <a name="hoc"></a> HOC
Turime susikūrę komponetą, kuris sau parsisiunčia duomenis ir juos atvaizduoja. Teisinga būtų atskirti šiuos aspektus. Geriausia būtų atskirti atvaizdavimą ir logiką.

#### 3.1 Container component
Šis pattern naudojamas tuomet, kai View komponentui norime priskirti kažkokią funkciją ar modelį. Laikykime, kad View komponentas mūsų atveju yra `Cards` o logiką būtų komponente `NewsItems`.
```js
class NewsItems extends React.Component {
    ...all logic
    render() {
        return <Cards items={this.props.items} />
    }
}
```
Tokiu būdu pasiektume, ką norėjome pasiekti. Tačiau Jeigu norėtume `NewsItems` logiką panaudoti kitam puslapiui kaip `comments` - negalėtume nes šie komponentai glaudžiai vienas su kitu surišti.

#### 3.2 HOF
High Order Function yra funkcija, kuri kaip argumentą priima funkciją ir grąžina kitą funkciją. Tai labai nesunkiai galima pritaikyti komponentams.

#### 3.3 HOC
High Order Component leidžia mums turėti funkciją, kuri sukuria komponentą, perduodant jai kitą komponentą.
```js
const NewsItems = withFetch(Cards)
```
Galima panaudoti daugiau argumentų
```js
const NewsItems = witchFetch(Cards, 'news');
```
Pats dažniausiai sutinkamas HOC
```js
function  withFetch(Component, dataType) {
    class WithFetch extends React.Component {

        render() {
            return (
                <Component
                    response={this.response}
                    {...this.props}
                />
        }
    }
    return WithFetch;
}
```
