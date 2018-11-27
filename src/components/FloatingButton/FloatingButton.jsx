import * as React from 'react';

import styles from './FloatingButton.scss';

export function FloatingButton({ to }) {
  return (
    <a href={to} className={`button is-danger is-large ${styles.plusButton}`}>
      <span className="icon">
        <i className="fa fa-plus" />
      </span>
    </a>
  );
}
