import * as React from 'react';
import PropTypes from 'prop-types';
import NavLink from './NavLink';

const menuItems = [
    {
        url: '/news',
        label: 'new',
    },
    {
        url: '/comments',
        label: 'comments',
    },
    {
        url: '/show',
        label: 'show',
    },
    {
        url: '/ask',
        label: 'ask',
    },
    {
        url: '/jobs',
        label: 'jobs',
    },
];

const items = menuItems.map(function(item) {
    return (
        <NavLink key={item.url} url={item.url}>
            {item.label}
        </NavLink>
    );
});

const Nav = ({ isActive }) => (
    <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">{items}</div>
    </div>
);

Nav.propTypes = {
    isActive: PropTypes.bool.isRequired,
};

export default Nav;
