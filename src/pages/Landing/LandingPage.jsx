import * as React from 'react';

import { FloatingButton } from '../../components/FloatingButton/FloatingButton';
import { ItemList } from '../../components/ItemList/ItemList';

import mock from '../../mocks/data';

export class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ItemList items={mock.items} />
        <FloatingButton to="/item/create" />
      </React.Fragment>
    );
  }
}
