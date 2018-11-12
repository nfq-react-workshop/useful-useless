import * as React from 'react';
import Menu from './Menu';
import Cards from './Cards';
import Footer from './Footer';
import Pager from './Pager';

const Layout = () => (
    <div>
        <Menu />
        <hr />
        <main>
            <Cards />
            <Pager />
        </main>
        <Footer />
    </div>
);

export default Layout;
