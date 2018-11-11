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
