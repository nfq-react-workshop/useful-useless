import * as React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { withFetch } from '../hoc/withFetch';
import { withRouter } from 'react-router';

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

const Comments = ({ itemId, items }) => (
    <div className="column">
        <Comment comments={items.comments} />
    </div>
);

export default withRouter(withFetch(Comments, ({ itemId }) => `/item/${itemId}.json`));
