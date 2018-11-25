import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const getCurrentClass = (page, currentPage) => (Number(currentPage) === page ? 'is-current' : '');

const getCurrentAttributes = (page, currentPage) =>
    Number(currentPage) === page
        ? {
              'aria-current': page,
          }
        : {};
class Pager extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    componentDidMount() {
        console.log('did mount');
    }

    componentWillUnmount() {
        console.log('will unmount');
    }

    shouldComponentUpdate(nextProps) {
        return this.props.page !== nextProps.page;
    }

    handleMouseOver(event) {
        console.log(`show notification for ${this.props.page}`);
    }

    render() {
        const { page } = this.props;
        return (
            <nav
                className="pagination"
                role="navigation"
                aria-label="pagination"
                onMouseOver={this.handleMouseOver}
            >
                <Link
                    to={`/news/${Math.max(Number(page) - 1, 1)}`}
                    className="pagination-previous"
                    title="This is the first page"
                    disabled={Number(page) <= 1}
                >
                    Previous
                </Link>
                <Link to={`/news/${Number(page) + 1}`} className="pagination-next">
                    Next page
                </Link>
                <ul className="pagination-list">
                    <li>
                        <Link
                            to="/news/1"
                            className={`pagination-link ${getCurrentClass(1, page)}`}
                            aria-label="Page 1"
                            {...getCurrentAttributes(1, page)}
                        >
                            1
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/news/2"
                            className={`pagination-link ${getCurrentClass(2, page)} `}
                            aria-label="Goto page 2"
                            {...getCurrentAttributes(2, page)}
                        >
                            2
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/news/3"
                            className={`pagination-link ${getCurrentClass(3, page)}`}
                            aria-label="Goto page 3"
                            {...getCurrentAttributes(3, page)}
                        >
                            3
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pager.defaultProps = {
    page: '1',
};

Pager.propTypes = {
    page: PropTypes.string,
};

export default Pager;
