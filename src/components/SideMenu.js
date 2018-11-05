import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class SideMenu extends Component {
    render() {
        return (
            <div id="menu">
                <div className="pure-menu">
                    <Link className="pure-menu-heading" to="/company">Company</Link>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><Link to="/home" className="pure-menu-link">Home</Link></li>
                        <li className="pure-menu-item"><Link to="/author" className="pure-menu-link">Author</Link></li>
                        <li className="pure-menu-item"><Link to="/book" className="pure-menu-link">Books</Link></li>
                        <li className="pure-menu-item"><Link to="/contact" className="pure-menu-link">Contact</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}