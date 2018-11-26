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

const Comments = ({ itemId }) => (
    <div className="column">
        <Comment comments={comments} />
    </div>
);

export default Comments;
