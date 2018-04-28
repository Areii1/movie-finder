import React, { Component } from 'react';
import axios from 'axios';
import apikey from '../apikey';
import MainViewDiscoverMovieList from './MainViewDiscoverMovieList';
import './MainView.css';
import Button from './Button';

const language = 'en-us';
class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      discoverMoviesList: null,
      trendingMovieDetails: null,
      isLoading: true,
    };
  }

  componentWillMount() {
    const genresPromise = axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=${language}`,
    });

    const discoverPromise = axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    });

    axios.all([genresPromise, discoverPromise])
      .then(([genresResponse, discoverResponse]) => {
        this.setState({
          genres: genresResponse.data.genres,
          discoverMoviesList: discoverResponse.data.results,
          isLoading: false,
        });
        this.getTrendingMovieDetails();
      });
  }

  getTrendingMovieDetails() {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${this.state.discoverMoviesList[0].id}?api_key=${apikey}&language=${language}&append_to_response=videos`,
    }).then((response) => {
      this.setState({
        trendingMovieDetails: response.data,
      });
    });
  }

  getMainViewDiscoverList() {
    if (!this.state.isLoading && this.state.discoverMoviesList.length > 0) {
      return (
        <MainViewDiscoverMovieList list={this.state.discoverMoviesList} />
      );
    }
    return (
      <p>LOADING</p>
    );
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
    const trailerLinkBase = 'https://www.youtube.com/watch?v=';
    return (
      this.state.discoverMoviesList && (
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
                {this.state.trendingMovieDetails && (
                <div className="trending-buttons">
                  <Button
                    className="main-view-trailer-button"
                    type="primary"
                    link={trailerLinkBase + this.state.trendingMovieDetails.videos.results[0].key}
                    label="WATCH TRAILER"
                  />
                  <Button
                    type="secondary"
                    id={this.state.discoverMoviesList[0].id}
                    label="MORE INFO"
                  />
                </div>
                )}
              </div>
            </div>
          </div>
          <div className="main-view-browsing-options">
            {this.getMainViewDiscoverList()}
          </div>
        </div>
      )
    );
  }
}

export default MainView;
