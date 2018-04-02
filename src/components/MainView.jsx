import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import apikey from '../apikey';
import MainViewDiscoverMovieList from './MainViewDiscoverMovieList';
import './MainView.css';

const language = 'en-us';
class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      genres: [],
      discoverMoviesList: null,
      isLoading: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    }).then((response) => {
      this.setState({
        discoverMoviesList: response.data.results,
        isLoading: false,
      }, () => this.scrollAfterDataReceived());
    });
  }

  getMainViewDiscoverList() {
    if (!this.state.isLoading) {
      if (!(this.state.discoverMoviesList.length === 0)) {
        return (
          <MainViewDiscoverMovieList list={this.state.discoverMoviesList} />
        );
      }
    } else {
      return (
        <p>LOADING</p>
      );
    }
    return undefined;
  }

  scrollAfterDataReceived() {
    window.scroll(0, this.props.scrollPos);
    this.props.updateScroll(0);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchTerm !== this.props.match.params.searchTerm) {
      this.props.history.push(`/search/${this.state.searchTerm}`);
      this.setState({ isLoading: true });
    }
  }

  handleSearchBarChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  renderFeatureMovieGenres() {
    // eslint-disable-next-line camelcase
    return this.state.discoverMoviesList[0].genre_ids.map(genre_id =>
      this.state.genres.find(genre =>
      // eslint-disable-next-line camelcase
        genre_id === genre.id).name.toUpperCase()).join(', ');
  }

  render() {
    const backdropHeaderUrl = 'https://image.tmdb.org/t/p/original';
    return (
      <div className="main-view-wrapper">
        <div className="main-view-header-wrapper">
          <div>
            <h2 className="main-view-header-headline">MOVIES</h2>
          </div>
          <div className="main-view-header-searchbar">
            <form
              className="main-view-search-bar-field"
              onSubmit={event => this.handleSubmit(event)}
            >
              <input
                className="main-view-search-bar"
                type="search"
                value={this.state.searchTerm}
                onChange={event => this.handleSearchBarChange(event)}
              />
            </form>
          </div>
        </div>
        {this.state.discoverMoviesList && (
          <div className="main-view-content-wrapper">
            <div
              className="main-view-trending"
              style={{
                background:
                `url(${backdropHeaderUrl + this.state.discoverMoviesList[0].backdrop_path}) center/cover no-repeat`,
              }}
            >
              <div className="main-view-trending-info">
                <div className="main-view-trending-info-content-wrapper">
                  <p className="trending-label">TRENDING</p>
                  <h2 className="trending-title">
                    {this.state.discoverMoviesList[0].title.toUpperCase()}
                  </h2>
                  <p className="trending-genre-runtime">
                    {this.renderFeatureMovieGenres()}
                  </p>
                  <div className="trending-buttons">
                    <button className="trending-button watch-trailer-btn">WATCH TRAILER</button>
                    <button className="trending-button more-info-btn">MORE INFO</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-view-browsing-options">
              {this.getMainViewDiscoverList()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

MainView.propTypes = {
  updateScroll: PropTypes.func.isRequired,
  scrollPos: PropTypes.number.isRequired,
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
