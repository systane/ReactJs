import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import SideMenu from './components/SideMenu';
import Home from './components/Home';
class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        <SideMenu />
        <Home />
        {this.props.children}
      </div>
    );
  }
}

export default App;
