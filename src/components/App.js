import React, { Component } from 'react';
import apikey from '../apikey';
import axios from 'axios';
import MovieList from './MovieList';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      movieListResponse: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchBarChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method:'get',

      url:'https://api.themoviedb.org/3/search/movie?api_key=' + 
      apikey + 
      '&language=en-US&query=' + 
      this.state.searchTerm + 
      '&page=1&include_adult=true',
    })
      .then((response) => {
        this.setState({movieListResponse: response.data.results});
      });
  }

  render() {
    return (
      <div>
        <h1>movie-finder</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input className="searchbar" 
            onChange={(event) => this.handleSearchBarChange(event)}></input>
        </form>
        <MovieList list={this.state.movieListResponse}/>      
      </div>
    )
  }
}

export default App;