import * as React from 'react';
import PropTypes from 'prop-types';
import { commentsClass } from './Comment.scss';

const Comment = ({ content, comments }) => (
    <ul className={commentsClass}>
        {content}
        {comments &&
            comments.map(({ content, comments: childComments, id }) => (
                <li key={id}>
                    <Comment content={content} comments={childComments} />
                </li>
            ))}
    </ul>
);

const commentType = {
    content: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape(commentType)),
};

Comment.propTypes = commentType;

export default Comment;
