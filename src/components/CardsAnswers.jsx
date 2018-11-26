import * as React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { withFetch } from '../hoc/withFetch';
import { withRouter } from 'react-router';

const CardsAnswers = ({ isFetching, items, match }) =>
    isFetching ? (
        <div>is loading</div>
    ) : (
        <div className="ask">
            {items.map((item, index) => (
                <Card
                    key={item.url}
                    {...item}
                    number={index + ((Number(match.params.page) || 1) - 1) * 30 + 1}
                />
            ))}
        </div>
    );

CardsAnswers.propTypes = {
    match: PropTypes.any,
    location: PropTypes.any,
    history: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.any),
    isFetching: PropTypes.bool,
};

export default withRouter(
    withFetch(CardsAnswers, ({ match }) => `/ask/${match.params.page || 1}.json`),
);
