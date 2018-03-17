import React, { Component } from 'react';
import axios from 'axios';
import apikey from '../apikey';
import MovieList from './MovieList';
import './MainView.css';

const language = 'en-us';
class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      movieListResponse: [],
      genres: [],
      discoverMoviesList: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=${language}`,
    }).then((response) => {
      this.setState({ genres: response.data.genres });
    });

    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    }).then((response) => {
      this.setState({ discoverMoviesList: response.data.results });
    });
  }

  handleSearchBarChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=${language}&query=${this.state.searchTerm}&page=1&include_adult=true`,
    }).then((response) => {
      this.setState({ movieListResponse: response.data.results });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="main-view-header">
          <h1 className="main-view-title">MOVIE-FINDER</h1>
          <form className="main-view-search-bar-field" onSubmit={event => this.handleSubmit(event)}>
            <input
              className="main-view-search-bar"
              onChange={event => this.handleSearchBarChange(event)}
            />
          </form>
        </div>
        {!(this.state.discoverMoviesList.length === 0) && (
          <MovieList
            list={
              this.state.movieListResponse.length === 0 ?
              this.state.discoverMoviesList :
              this.state.movieListResponse
            }
            genres={this.state.genres}
            displayMode={
              this.state.movieListResponse.length === 0 ?
              'discover' :
              'search'
            }
          />
        )}
      </div>
    );
  }
}

export default MainView;
