import * as React from 'react';

export function withFetch(Component, dataType) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.fetchItems = this.fetchItems.bind(this);
            this.receiveItems = this.receiveItems.bind(this);

            this.state = {
                isFetching: true,
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
            return (
                <Component
                    items={this.state.items}
                    isFetching={this.state.isFetching}
                    {...this.props}
                />
            );
        }

        fetchItems() {
            const page = Number(this.props.match.params.page) || 1;
            this.setState({ isFetching: true });
            fetch(`https://api.hnpwa.com/v0/${dataType}/${page}.json`)
                .then(response => response.json())
                .then(this.receiveItems);
        }

        receiveItems(items) {
            this.setState({
                items,
                isFetching: false,
            });
        }
    };
}
