import React, { Component } from 'react';
import axios from 'axios';
import apikey from '../apikey';
import SearchMovieList from './SearchMovieList';
import './SearchView.css';

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      movieListResponse: [],
      isLoading: true,
    };

    this.getMovieListResponseFromUrlParams = this.getMovieListResponseFromUrlParams.bind(this);
  }

  componentWillMount() {
    this.getMovieListResponseFromUrlParams();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
      this.getMovieListResponseFromUrlParams();
    }
  }

  getMovieListResponseFromUrlParams() {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-us&query=${this.props.match.params.searchTerm}&page=1&include_adult=true`,
    }).then((response) => {
      this.setState({
        movieListResponse: response.data.results,
        searchTerm: this.props.match.params.searchTerm,
        isLoading: false,
      });
    });
  }

  getMovieList() {
    if (!this.state.isLoading) {
      if (!(this.state.movieListResponse.length === 0)) {
        return (
          <SearchMovieList list={this.state.movieListResponse} />
        );
      }
    } else {
      return (
        <p>LOADING</p>
      );
    }
    return undefined;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchTerm !== this.props.match.params.searchTerm) {
      this.props.history.push(`/search/${this.state.searchTerm}`);
    }
  }

  handleSearchBarChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div className="search-view-wrapper">
        <div className="search-view-header">
          <form
            className="search-view-search-bar-field"
            onSubmit={event => this.handleSubmit(event)}
          >
            <input
              className="search-view-search-bar"
              type="search"
              value={this.state.searchTerm}
              onChange={event => this.handleSearchBarChange(event)}
            />
          </form>
        </div>
        <div className="search-view-content">
          {this.getMovieList()}
        </div>
      </div>
    );
  }
}

export default SearchView;
