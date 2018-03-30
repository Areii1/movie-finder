import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainView from './MainView';
import EntityView from './EntityView';
import './Global.css';

function App() {
  return (
    <Router>
      <div className="app-router-wrapper">
        <Route exact path="/" component={MainView} />
        <Route exact path="/:searchTerm" component={MainView} />
        <Route exact path="/:entity/:id" component={EntityView} />
      </div>
    </Router>
  );
}

export default App;
