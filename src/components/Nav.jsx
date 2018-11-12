import * as React from 'react';
import NavLink from './NavLink';

const menuItems = [
    {
        url: '#new',
        label: 'new',
    },
    {
        url: '#comments',
        label: 'comments',
    },
    {
        url: '#show',
        label: 'show',
    },
    {
        url: '#aks',
        label: 'aks',
    },
    {
        url: '#jobs',
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

const Nav = () => (
    <div className="navbar-menu">
        <div className="navbar-start">{items}</div>
    </div>
);

export default Nav;
