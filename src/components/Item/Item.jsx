import * as React from 'react';

import { WindowTools } from '../../services/Utils/WindowTools';
import styles from './Item.scss';

import './Cover.scss';

export class Item extends React.Component {
  componentDidMount() {
    WindowTools.setBodyImage(this.props.item.image);
  }

  componentWillUnmount() {
    WindowTools.setBodyImage(null);
  }

  onSpacerClick() {
    WindowTools.invertBodyImage();
  }

  render() {
    const {
      item: { title, subtitle, description },
    } = this.props;

    return (
      <div>
        <div className={styles.imageSpacer} onClick={this.onSpacerClick} />
        <h1 className={`title ${styles.isSuper}`}>{title}</h1>
        <p className={`subtitle ${styles.isHighlighted}`}>{subtitle}</p>
        <div className={`card ${styles.spacedBottom}`}>
          <div className="card-content">
            <div className="content">
              <div>{description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
