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

    shouldComponentUpdate(nextProps) {
        return this.props.page !== nextProps.page;
    }

    handleMouseOver(event) {
        console.log(`show notification for ${this.props.page}`);
    }

    render() {
        const { page, dataType, maxPages } = this.props;
        return (
            <nav
                className="pagination"
                role="navigation"
                aria-label="pagination"
                onMouseOver={this.handleMouseOver}
            >
                <Link
                    to={`/${dataType}/${Math.max(Number(page) - 1, 1)}`}
                    className="pagination-previous"
                    title="This is the first page"
                    disabled={Number(page) <= 1}
                >
                    Previous
                </Link>
                <Link to={`/${dataType}/${Number(page) + 1}`} className="pagination-next">
                    Next page
                </Link>
                <ul className="pagination-list">
                    {[...Array(maxPages)].map((i, n) => (
                        <li key={n + 1}>
                            <Link
                                to={`/${dataType}/${n + 1}`}
                                className={`pagination-link ${getCurrentClass(n + 1, page)}`}
                                aria-label={`Page ${n + 1}`}
                                {...getCurrentAttributes(n + 1, page)}
                            >
                                {n + 1}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

Pager.defaultProps = {
    page: '1',
    dataType: 'news',
};

Pager.propTypes = {
    page: PropTypes.string,
    dataType: PropTypes.string,
    maxPages: PropTypes.number,
};

export default Pager;
