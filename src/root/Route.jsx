import * as React from 'react';
import { Route as ReactRoute } from 'react-router-dom';

export class Route extends React.Component {
  render() {
    const { component, layout, ...rest } = this.props;
    let routeComponent = props => React.createElement(component, props);

    if (layout) {
      routeComponent = props =>
        React.createElement(layout, props, React.createElement(component, props));
    }

    return <ReactRoute {...rest} render={routeComponent} />;
  }
}
