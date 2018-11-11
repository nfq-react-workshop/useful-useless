import * as React from 'react';

import { ItemCard } from '../ItemCard/ItemCard';

export class ItemList extends React.Component {
  render() {
    const { items } = this.props;

    if (!items) {
      return false;
    }

    return (
      <div className="columns is-multiline">
        {items.map((item, index) => (
          <div key={index} className="column is-one-third">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    );
  }
}
