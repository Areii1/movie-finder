import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainView from './MainView';
import EntityView from './EntityView';
import './Global.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainViewScrollPos: { x: 0, y: 0 },
    };

    this.updateMainViewScrollPos = this.updateMainViewScrollPos.bind(this);
  }

  updateMainViewScrollPos(xPos, yPos) {
    this.setState({
      mainViewScrollPos: { x: xPos, y: yPos },
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
                scrollPos={this.state.mainViewScrollPos}
                hello={this.hello}
              />
            )}
          />
          <Route
            exact
            path="/:searchTerm"
            render={props => (
              <MainView
                {...props}
                updateScroll={this.updateMainViewScrollPos}
                scrollPos={this.state.mainViewScrollPos}
                hello={this.hello}
              />
            )}
          />
          <Route exact path="/:entity/:id" component={EntityView} />
        </div>
      </Router>
    );
  }
}

export default App;
