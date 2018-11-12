import * as React from 'react';
import Card from './Card';

const items = [
    {
        title: 'Making rain simulation as real as possible',
        comments_count: 14,
        url: 'http://rainbowhunt.me/?plays',
        user: 'sazers',
    },
    {
        title: 'Show HN: Google Earth for live radios',
        comments_count: 1,
        url: 'http://radio.garden',
        user: 'jaoued',
    },
];

const Cards = () => (
    <div>
        {items.map((item, index) => (
            <Card key={item.url} {...item} number={index + 1} />
        ))}
    </div>
);

export default Cards;
