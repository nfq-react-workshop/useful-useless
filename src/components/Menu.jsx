import * as React from 'react';
import Nav from './Nav';

const Menu = () => (
    <nav className="navbar" role="navigation">
        <div className="navbar-brand">
            <a href="/" className="navbar-item has-text-primary">
                <i className="fab fa-hacker-news" />
                &nbsp;HN
            </a>
            <a href="#" role="button" className="navbar-burger burger">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
        <Nav />
    </nav>
);

export default Menu;
