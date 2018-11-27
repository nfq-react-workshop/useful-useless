import * as React from 'react';
import axios from 'axios';

import { FloatingButton } from '../../components/FloatingButton/FloatingButton';
import { ItemList } from '../../components/ItemList/ItemList';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/items')
      .then(response => response.data)
      .then(data => {
        this.setState({
          items: data,
          loading: false,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <p>Loading... Please wait.</p>}
        {this.state.loading || <ItemList items={this.state.items} />}
        <FloatingButton to="/item/create" />
      </React.Fragment>
    );
  }
}
