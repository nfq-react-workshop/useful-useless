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

const Nav = () => <div>{items}</div>;

/**        <NavLink url="#new">new</NavLink>
        <NavLink url="#comments">comments</NavLink>
        <NavLink url="#show">show</NavLink>
        <NavLink url="#aks">aks</NavLink>
        <NavLink url="#jobs">span</NavLink>
         */

export default Nav;
