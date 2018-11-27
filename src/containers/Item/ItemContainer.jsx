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
