import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
    if (this.props.match.params.searchTerm) {
      this.getMovieListResponseFromUrlParams();
    } else {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
      this.getMovieListResponseFromUrlParams();
    }
  }

  getMovieListResponseFromUrlParams() {
    this.setState({ isLoading: true });
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
    return this.state.isLoading ?
      <p className="search-view-loading">LOADING</p> :
      <SearchMovieList list={this.state.movieListResponse} />;
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
              placeholder="search movies"
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

SearchView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchTerm: PropTypes.string,
    }),
  }).isRequired,
};

export default SearchView;
