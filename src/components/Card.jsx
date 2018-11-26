import * as React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const comments = [
    {
        id: 1,
        content: 'lorem ipsum',
        comments: [
            {
                id: 2,
                content: '2 asdasd ',
                comments: [
                    {
                        id: 5,
                        content: '5 asasdd ',
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        content: 'dolor',
    },
];

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleCommentsClick = this.handleCommentsClick.bind(this);
        this.state = {
            isCommentsVisible: false,
        };
    }

    render() {
        const { title, number, url, user, comments_count } = this.props;
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
                {this.state.isCommentsVisible && (
                    <div className="column">
                        <Comment comments={comments} />
                    </div>
                )}
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
    url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string,
    comments_count: PropTypes.number,
    number: PropTypes.number,
};

export default Card;
