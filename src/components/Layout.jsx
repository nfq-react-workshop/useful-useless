import * as React from 'react';
import Menu from './Menu';
import Cards from './Cards';
import Footer from './Footer';
import Pager from './Pager';

const Layout = () => (
    <div className="container">
        <Menu />
        <main>
            <section className="section">
                <Cards />
            </section>
            <section className="section">
                <Pager />
            </section>
        </main>
        <Footer />
    </div>
);

export default Layout;
