import * as React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { withRouter } from 'react-router';

class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.fetchItems = this.fetchItems.bind(this);
        this.receiveItems = this.receiveItems.bind(this);

        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            this.fetchItems();
        }
    }

    render() {
        return this.state.isFetching ? (
            <div>is loading</div>
        ) : (
            <div className="">
                {this.state.items.map((item, index) => (
                    <Card key={item.url} {...item} number={index + 1} />
                ))}
            </div>
        );
    }

    fetchItems() {
        const page = Number(this.props.match.params.page) || 1;
        this.setState({ isFetching: true });
        fetch(`https://api.hnpwa.com/v0/news/${page}.json`)
            .then(response => response.json())
            .then(this.receiveItems);
    }

    receiveItems(items) {
        this.setState({
            items,
            isFetching: false,
        });
    }
}

Cards.propTypes = {
    match: PropTypes.any,
    location: PropTypes.any,
    history: PropTypes.any,
};

export default withRouter(Cards);
