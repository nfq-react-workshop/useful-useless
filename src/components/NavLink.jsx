import * as React from 'react';
import PropTypes from 'prop-types';

const NavLink = props => <a href={props.url}>{props.children}</a>;

NavLink.propTypes = {
    url: PropTypes.string,
    children: PropTypes.string.isRequired,
};

export default NavLink;
