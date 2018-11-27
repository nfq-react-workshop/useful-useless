import * as React from 'react';
import axios from 'axios';

export function withData(Component, mappedProps) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      Object.keys(mappedProps).forEach(key => {
        const source =
          mappedProps[key] instanceof Function ? mappedProps[key](this.props) : mappedProps[key];

        axios
          .get(`http://localhost:3000/${source}`)
          .then(response => response.data)
          .then(data => {
            this.setState({
              [key]: data,
              loading: false,
            });
          })
          .catch(() => {
            this.setState({
              [key]: false,
              loading: false,
            });
          });
      });
    }

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  };
}
