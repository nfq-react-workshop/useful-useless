import * as React from 'react';
import PropTypes from 'prop-types';
import { commentsClass } from './Comment.scss';

const Comment = ({ content, comments }) => (
    <ul className={commentsClass}>
        <small
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
        <br />
        {comments &&
            comments.map(({ content, comments: childComments, id }) => (
                <React.Fragment key={`comment-${id}`}>
                    <li>
                        <Comment content={content} comments={childComments} />
                    </li>
                </React.Fragment>
            ))}
    </ul>
);

const commentType = {
    content: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape(commentType)),
};

Comment.propTypes = commentType;

export default Comment;
