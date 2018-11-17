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
    <footer className="footer">
        <div className="content">
            {links.map(({ url, title }) => (
                <React.Fragment key={url}>
                    <a href={url}>{title}</a>
                    <br />
                </React.Fragment>
            ))}
        </div>
    </footer>
);

export default Footer;
