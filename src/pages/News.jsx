import * as React from 'react';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import Pager from '../components/Pager';

const News = props => (
    <main>
        <section className="section">
            <Cards />
        </section>
        <section className="section">
            <Pager maxPages={10} dataType="news" page={props.match.params.page} />
        </section>
    </main>
);

News.propTypes = {
    match: PropTypes.any,
};

export default News;
