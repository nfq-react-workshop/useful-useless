import * as React from 'react';
import Nav from './Nav';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { isActive } = this.state;
        this.setState({
            isActive: !isActive,
        });
    }

    render() {
        return (
            <nav className="navbar" role="navigation">
                <div className="navbar-brand">
                    <a href="/" className="navbar-item has-text-primary">
                        <i className="fab fa-hacker-news" />
                        &nbsp;HN
                    </a>
                    <a
                        onClick={this.handleClick}
                        role="button"
                        className={`navbar-burger burger ${this.state.isActive ? 'is-active' : ''}`}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>
                <Nav isActive={this.state.isActive} />
            </nav>
        );
    }
}

export default Menu;
