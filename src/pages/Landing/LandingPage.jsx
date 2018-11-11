import * as React from 'react';

import { FloatingButton } from '../../components/FloatingButton/FloatingButton';
import { ItemList } from '../../components/ItemList/ItemList';

export class LandingPage extends React.Component {
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
    return (
      <React.Fragment>
        <ItemList items={this.mockItems} />
        <FloatingButton to="/item/create" />
      </React.Fragment>
    );
  }
}
