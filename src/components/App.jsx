import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainView from './MainView';
import MovieView from './MovieView';
import PerformerView from './PerformerView';
import './Global.css';

function App() {
  return (
    <Router>
      <div className="app-router-wrapper">
        <Route exact path="/" component={MainView} />
        <Route exact path="/:searchTerm" component={MainView} />
        <Route exact path="/movie/:id" component={MovieView} />
        <Route exact path="/performer/:performer" component={PerformerView} />
      </div>
    </Router>
  );
}

export default App;
