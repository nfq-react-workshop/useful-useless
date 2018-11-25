import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavLink = props => (
    <Link className="navbar-item" to={props.url}>
        {props.children}
    </Link>
);

NavLink.propTypes = {
    url: PropTypes.string,
    children: PropTypes.string.isRequired,
};

export default NavLink;
