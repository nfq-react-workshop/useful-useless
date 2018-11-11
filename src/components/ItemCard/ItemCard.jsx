import * as React from 'react';

import styles from './ItemCard.scss';

export class ItemCard extends React.Component {
  render() {
    const {
      item: { id, title, image, description },
    } = this.props;

    return (
      <a href={`item/${id}`} className={`card ${styles.block}`}>
        <div className="card-image">
          <div className="image is-16by9">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            <h3>{title}</h3>
            <p>{description || 'No description...'}</p>
          </div>
        </div>
      </a>
    );
  }
}
