import * as React from 'react';
import PropTypes from 'prop-types';

const Card = ({ url, title, user, comments_count, number }) => (
    <article className="card">
        <div className="card-content">
            <div className="content">
                <a rel="noopener noreferrer" target="_blank" href={url}>{`${number}. ${title}`}</a>
            </div>
        </div>

        <footer className="card-footer">
            <a href={`#by${user}`} className="card-footer-item">
                {`by ${user}`}
            </a>
            <a href="#comments" className="card-footer-item">
                {`${comments_count} comments`}
            </a>
        </footer>
    </article>
);

Card.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string,
    comments_count: PropTypes.number,
    number: PropTypes.number,
};

export default Card;
