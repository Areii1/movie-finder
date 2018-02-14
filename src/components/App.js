import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    }
  }

  handleSearchBarChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  render() {
    return (
      <div>
        <h1>movie-finder</h1>
        <input className="searchbar" 
          onChange={(event) => this.handleSearchBarChange(event)}></input>
        <p>{this.state.searchTerm}</p>
      </div>
    )
  }
}

export default App;