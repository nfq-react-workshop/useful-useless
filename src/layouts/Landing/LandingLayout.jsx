import * as React from 'react';

export class LandingLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Useful-Useless</h1>
              <h2 className="subtitle">A garbage collector</h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">{this.props.children}</div>
        </section>
      </React.Fragment>
    );
  }
}
