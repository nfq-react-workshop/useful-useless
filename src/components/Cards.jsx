import * as React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { withFetch } from '../hoc/withFetch';
import { withRouter } from 'react-router';

class Cards extends React.Component {
    render() {
        return this.props.isFetching ? (
            <div>is loading</div>
        ) : (
            <div className="">
                {this.props.items.map((item, index) => (
                    <Card key={item.url} {...item} number={index + 1} />
                ))}
            </div>
        );
    }
}

Cards.propTypes = {
    match: PropTypes.any,
    location: PropTypes.any,
    history: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.any),
    isFetching: PropTypes.bool,
};

export default withRouter(withFetch(Cards, 'news'));
