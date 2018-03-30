import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
      isLoading: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieListResponseFromUrlParams = this.getMovieListResponseFromUrlParams.bind(this);
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=${language}`,
    }).then((response) => {
      this.setState({
        genres: response.data.genres,
      });
    });

    if (!this.props.match.params.searchTerm) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
      }).then((response) => {
        this.setState({
          discoverMoviesList: response.data.results,
          isLoading: false,
        });
      });
    } else {
      this.getMovieListResponseFromUrlParams();
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.scrollPos, 'inside update');
    window.scroll(this.props.scrollPos.x, this.props.scrollPos.y);
    if (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
      this.getMovieListResponseFromUrlParams();
    }
  }

  getMovieListResponseFromUrlParams() {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=${language}&query=${this.props.match.params.searchTerm}&page=1&include_adult=true`,
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
      if ((!(this.state.discoverMoviesList.length === 0) ||
      !(this.state.movieListResponse.length === 0))) {
        return (
          <MovieList
            list={
              this.state.movieListResponse.length === 0 ?
              this.state.discoverMoviesList :
              this.state.movieListResponse
            }
            searchTerm={this.state.searchTerm}
            genres={this.state.genres}
            displayMode={
              this.state.movieListResponse.length === 0 ?
              'discover' :
              'search'
            }
            updateScroll={this.props.updateScroll}
          />
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
      this.props.history.push(`/${this.state.searchTerm}`);
      this.setState({ isLoading: true });
    }
  }

  handleSearchBarChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="main-view-header">
          <h1 className="main-view-title">MOVIE-FINDER</h1>
          <form className="main-view-search-bar-field" onSubmit={event => this.handleSubmit(event)}>
            <input
              className="main-view-search-bar"
              type="search"
              value={this.state.searchTerm}
              onChange={event => this.handleSearchBarChange(event)}
            />
          </form>
        </div>
        {this.getMovieList()}
      </div>
    );
  }
}

MainView.propTypes = {
  updateScroll: PropTypes.func.isRequired,
  scrollPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchTerm: PropTypes.string,
    }),
  }).isRequired,
};

export default MainView;
