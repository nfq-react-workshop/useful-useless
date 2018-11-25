import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import NewsPage from '../pages/News';
import NotFound from '../pages/NotFound';
import { content, body } from './Layout.scss';

const Layout = () => (
    <BrowserRouter>
        <div className={`container ${body}`}>
            <Menu />
            <div className={content}>
                <Switch>
                    <Redirect exact from="/" to="/news" />
                    <Route exact path="/" component={NewsPage} />
                    <Route path="/news/:page?" component={NewsPage} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </div>
    </BrowserRouter>
);

export default Layout;
