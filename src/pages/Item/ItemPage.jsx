import * as React from 'react';

import { ItemContainer } from '../../containers/Item/ItemContainer';

export class ItemPage extends React.Component {
  render() {
    const { match } = this.props;

    return <ItemContainer itemId={match.params.id} />;
  }
}
