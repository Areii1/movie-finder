import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../apikey';
import './MovieView.css';
import prevButton from '../media/prev-button.png';

const language = 'en-us';

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: null,
      movieCredits: null,
    };
  }

  componentWillMount() {
    const movieId = this.props.match.params.id;
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&language=${language}`,
    }).then((response) => {
      this.setState({ movieDetails: response.data });
    });

    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`,
    }).then((response) => {
      this.setState({ movieCredits: response.data });
    });
  }

  getDirector() {
    const director = this.state.movieCredits.crew.filter((member) => {
      if (member.job === 'Director') {
        return member;
      }
      return null;
    });
    return director[0].name;
  }

  getTopGenre() {
    if (this.state.movieDetails.genres[0]) {
      return this.state.movieDetails.genres[0].name;
    }
    return 'not found';
  }

  getReleaseDateYear() {
    const yearReleased = this.state.movieDetails.release_date.slice(0, 4);
    console.log(yearReleased);
    return yearReleased;
  }

  render() {
    console.log(prevButton);
    if (this.state.movieCredits && this.state.movieDetails) {
      console.log(this.state.movieDetails.genres);
    }
    const backdropUrl = 'https://image.tmdb.org/t/p/original';
    return (
      <div>
        { this.state.movieDetails && this.state.movieCredits ?
          <div className="content-wrapper">
            <div className="img-section-wrapper" style={{ background: `url(${backdropUrl + this.state.movieDetails.backdrop_path}) center/cover no-repeat` }}>
              <div className="img-section-gradient" >
                <div className="img-section-content-container">
                  <div className="header">
                    <Link to="/">
                      <img
                        className="prev-button"
                        src={prevButton}
                        alt="Previous Button"
                      />
                    </Link>
                    <h1 className="headline" >
                      MOVIE-FINDER
                    </h1>
                  </div>
                  <p className="movie-title">
                    {this.state.movieDetails.title}
                  </p>
                  <div className="img-section-movie-info">
                    <div
                      className="movie-info-block-container"
                      id="movie-release-date-container"
                    >
                      <p
                        className="movie-info-label"
                        id="movie-release-date-label"
                      >
                        RELEASED
                      </p>
                      <p
                        className="movie-info-item"
                        id="movie-release-date"
                      >
                        {this.getReleaseDateYear()}
                      </p>
                    </div>
                    <div
                      className="movie-info-block-container"
                      id="movie-director-info"
                    >
                      <p
                        className="movie-info-label"
                        id="movie-director-label"
                      >
                        DIRECTOR
                      </p>
                      <p
                        className="movie-info-item"
                        id="movie-director"
                      >
                        {this.getDirector()}
                      </p>
                    </div>
                    <div
                      className="movie-info-block-container"
                      id="movie-genre-info"
                    >
                      <p
                        className="movie-info-label"
                        id="movie-genre-label"
                      >
                        GENRE
                      </p>
                      <p
                        className="movie-info-item"
                        id="movie-genres"
                      >
                        {this.getTopGenre()}
                      </p>
                    </div>
                    <div
                      className="movie-info-block-container"
                      id="movie-poster-info"
                    >
                      <p
                        className="movie-info-label"
                        id="movie-poster-label"
                      >
                        POSTER
                      </p>
                      <p
                        className="movie-info-item"
                        id="movie-poster"
                      >
                        <img
                          className="poster"
                          src={backdropUrl + this.state.movieDetails.poster_path}
                          alt="Movie poster"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-container">
              <p className="movie-overview Label">
                OVERVIEW
              </p>
              <p className="movie-overview"> {this.state.movieDetails.overview} </p>
            </div>
          </div>
        : (<p>...</p>)
        }
      </div>
    );
  }
}

MovieView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieView;
