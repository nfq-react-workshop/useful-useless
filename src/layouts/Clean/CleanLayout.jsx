import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './CleanLayout.scss';

export class CleanLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar is-primary is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <img src="https://placehold.it/112x28?text=Logo" alt="Useful-useless" />
              </Link>

              <button type="button" className={`navbar-burger ${styles.burger}`}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to="/">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">{this.props.children}</div>
        </section>
      </React.Fragment>
    );
  }
}
