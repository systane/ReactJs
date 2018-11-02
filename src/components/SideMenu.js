import React, {Component} from 'react';

export default class SideMenu extends Component {
    render() {
        return (
            <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="/">Company</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="/" className="pure-menu-link">Home</a></li>
                        <li className="pure-menu-item"><a href="/" className="pure-menu-link">Author</a></li>
                        <li className="pure-menu-item"><a href="/" className="pure-menu-link">Books</a></li>
                        <li className="pure-menu-item"><a href="/" className="pure-menu-link">Contact</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}