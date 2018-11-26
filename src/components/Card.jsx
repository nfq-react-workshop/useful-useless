import * as React from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleCommentsClick = this.handleCommentsClick.bind(this);
        this.state = {
            isCommentsVisible: false,
        };
    }

    render() {
        const { id, title, number, url, user, comments_count } = this.props;
        return (
            <div className="columns">
                <div className="columns is-mobile">
                    <div className="column is-narrow">
                        <span className="tag is-rounded is-large">{number}</span>
                    </div>
                    <div className="column">
                        <div className="columns">
                            <div className="column">
                                <strong>
                                    <a rel="noopener noreferrer" target="_blank" href={url}>
                                        {title}
                                    </a>
                                </strong>
                            </div>
                            <div className="column">
                                some time ago&nbsp;
                                <a href={`#by${user}`}>{`by ${user}`}</a>
                            </div>
                        </div>
                    </div>
                    <div className="column is-narrow">
                        <a onClick={this.handleCommentsClick}>
                            <span className="icon">
                                <i className="fas fa-comments" />
                            </span>
                            <span>{comments_count}</span>
                        </a>
                    </div>
                </div>
                {this.state.isCommentsVisible && <Comments itemId={id} />}
            </div>
        );
    }

    handleCommentsClick() {
        this.setState({
            isCommentsVisible: !this.state.isCommentsVisible,
        });
    }
}

Card.propTypes = {
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string,
    comments_count: PropTypes.number,
    number: PropTypes.number,
};

export default Card;
