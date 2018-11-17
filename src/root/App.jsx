/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from './Route';

import { LandingPage } from '../pages/Landing/LandingPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { LandingLayout } from '../layouts/Landing/LandingLayout';
import { CleanLayout } from '../layouts/Clean/CleanLayout';

import 'bulma/bulma.sass';
import 'font-awesome/scss/font-awesome.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} layout={LandingLayout} />
          <Route component={NotFoundPage} layout={CleanLayout} />
        </Switch>
      </Router>
    );
  }
}
