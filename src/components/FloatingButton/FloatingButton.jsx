import * as React from 'react';

import styles from './FloatingButton.scss';

export class FloatingButton extends React.Component {
  render() {
    const { to } = this.props;

    return (
      <a href={to} className={`button is-danger is-large ${styles.plusButton}`}>
        <span className="icon">
          <i className="fa fa-plus" />
        </span>
      </a>
    );
  }
}
