import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainView from './MainView';
import EntityView from './EntityView';
import './Global.css';
import SearchView from './SearchView';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainViewYScrollPos: 0,
    };

    this.updateMainViewScrollPos = this.updateMainViewScrollPos.bind(this);
  }

  updateMainViewScrollPos(yPos) {
    this.setState({
      mainViewYScrollPos: yPos,
    });
  }

  render() {
    return (
      <Router>
        <div className="app-router-wrapper">
          <Route
            exact
            path="/"
            render={props => (
              <MainView
                {...props}
                updateScroll={this.updateMainViewScrollPos}
                scrollPos={this.state.mainViewYScrollPos}
              />
            )}
          />
          <Route path="/search/:searchTerm" component={SearchView} />
          <Route path="/entity/:entity/:id" component={EntityView} />
        </div>
      </Router>
    );
  }
}

export default App;
