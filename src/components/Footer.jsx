import * as React from 'react';

const links = [
    {
        url: '#faq',
        title: 'FAQ',
    },
    {
        url: '#support',
        title: 'Support',
    },
    {
        url: '#careers',
        title: 'Careers',
    },
];

const Footer = () => (
    <footer>
        {links.map(({ url, title }) => (
            <a key={url} href={url}>
                {title}
            </a>
        ))}
    </footer>
);

export default Footer;
