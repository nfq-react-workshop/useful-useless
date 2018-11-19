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
