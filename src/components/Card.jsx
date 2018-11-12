import * as React from 'react';
import PropTypes from 'prop-types';

const Card = ({ url, title, user, comment_count, number }) => (
    <article>
        <span>{number}.</span>
        <a href={url}>{title}</a>
        <div>
            <a href={`#by${user}`}>{`by ${user}`}</a>
            <a href="#comments">{`${comment_count} comment`}</a>
        </div>
        <hr />
    </article>
);

Card.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string,
    comment_count: PropTypes.number,
    number: PropTypes.number,
};

export default Card;
