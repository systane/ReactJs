import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import App from './App';
import Home from './components/Home';
import AuthorBox from './components/Author';
import BookBox from './components/Book';

import './index.css';

const routes = (
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/author" component={AuthorBox} />
            <Route path="/book" component={BookBox} />
        </Switch>
    </App>
);

ReactDOM.render((
    <Router>
        {routes}
    </Router>

), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
