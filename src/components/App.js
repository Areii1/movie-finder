import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hello: 'hello',
    }
  }

  render() {
    return (
      <div>
        <h1>movie-finder</h1>
      </div>
    )
  }
}

export default App;