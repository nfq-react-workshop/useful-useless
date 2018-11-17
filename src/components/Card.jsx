import * as React from 'react';
import PropTypes from 'prop-types';

const Card = ({ url, title, user, comments_count, number }) => (
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
            <a href="#comments">
                <span className="icon">
                    <i className="fas fa-comments" />
                </span>
                <span>{comments_count}</span>
            </a>
        </div>
    </div>
);

Card.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string,
    comments_count: PropTypes.number,
    number: PropTypes.number,
};

export default Card;
