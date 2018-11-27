import * as React from 'react';

import { WindowTools } from '../../services/Utils/WindowTools';
import styles from './Item.scss';

import './Cover.scss';

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };

    this.onSpacerClick = this.onSpacerClick.bind(this);
  }

  componentDidMount() {
    WindowTools.setBodyImage(this.props.item.image);
  }

  componentWillUnmount() {
    WindowTools.setBodyImage(null);
  }

  onSpacerClick() {
    this.setState(prevState => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const {
      item: { title, subtitle, description },
    } = this.props;

    return (
      <div>
        <div
          className={`${styles.imageSpacer} ${this.state.collapsed ? styles.collapsed : ''}`}
          onClick={this.onSpacerClick}
          role="presentation"
        />
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
