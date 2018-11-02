import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import SideMenu from './components/SideMenu';
import { AuthorsForm, AuthorsTable } from './Author';

class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        {/*Side-menu*/}
        <SideMenu />

        <div id="main">
          <div className="header">
            <h1>Author</h1>
          </div>
        </div>

        <AuthorsForm />
        <AuthorsTable />
      </div>
    );
  }
}

export default App;
