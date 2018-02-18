import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainView from './MainView';
import MovieView from './MovieView';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={MainView} />
        <Route path="/movieview/:id" component={MovieView} />
      </div>
    </Router>
  );
}

export default App;
