import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import MainView from './MainView';
import EntityView from './EntityView';
import './Global.css';
import './App.css';
import SearchView from './SearchView';
import SearchIcon from '../media/ios-search.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainViewYScrollPos: 0,
    };
  }

  render() {
    return (
      <Router>
        <div className="app-router-wrapper">
          <div className="navigation-wrapper">
            <Link
              to="/"
              className="home-link"
            >
              <h2 className="navigation-headline">MOVIES</h2>
            </Link>
            <div
              className="navigation-search-icon-area"
            >
              <Link to="/search">
                <img
                  className="navigation-search-icon"
                  src={SearchIcon}
                  alt="Search icon"
                />
              </Link>
            </div>
          </div>
          <Route
            exact
            path="/"
            render={props => (
              <MainView
                {...props}
                scrollPos={this.state.mainViewYScrollPos}
              />
            )}
          />
          <Route exact path="/search" component={SearchView} />
          <Route path="/search/:searchTerm" component={SearchView} />
          <Route path="/entity/:entity/:id" component={EntityView} />
        </div>
      </Router>
    );
  }
}

export default App;
