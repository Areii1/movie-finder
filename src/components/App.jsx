import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainView from './MainView';
import MovieView from './MovieView';
import './Global.css';

function App() {
  return (
    <Router>
      <div className="app-router-wrapper">
        <Route exact path="/" component={MainView} />
        <Route path="/movieview/:id" component={MovieView} />
      </div>
    </Router>
  );
}

export default App;
