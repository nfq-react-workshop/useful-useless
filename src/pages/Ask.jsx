import * as React from 'react';
import PropTypes from 'prop-types';
import CardsAnswers from '../components/CardsAnswers';
import Pager from '../components/Pager';

const News = props => (
    <main>
        <section className="section">
            <CardsAnswers />
        </section>
        <section className="section">
            <Pager maxPages={2} dataType="ask" page={props.match.params.page} />
        </section>
    </main>
);

News.propTypes = {
    match: PropTypes.any,
};

export default News;
