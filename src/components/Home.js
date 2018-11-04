import React, { Component } from 'react';

//css
import '../css/pure-min.css';
import '../css/side-menu.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Welcome</h1>
        </div>
        <div className="content" id="content">
        </div>
      </div>
    );
  }
}


