import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../apikey';
import './MovieView.css';

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
    console.log(director[0].name);
    return director[0].name;
  }


  render() {
    const backdropUrl = 'https://image.tmdb.org/t/p/original';
    return (
      <div>
        { this.state.movieDetails && this.state.movieCredits ?
          <div className="content-wrapper">
            <div className="img-section-wrapper" style={{ background: `url(${backdropUrl + this.state.movieDetails.backdrop_path}) center/cover no-repeat` }}>
              <div className="img-section-content-container">
                <h1 className="headline" >
                  Movie-finder
                </h1>
                <p className="movie-title">
                  {this.state.movieDetails.title}
                </p>
                <div className="img-section-movie-info">
                  <div id="movie-release-date-container">
                    <p
                      className="movie-info-label"
                      id="movie-release-date-label"
                    >
                      Release date:
                    </p>
                    <p
                      className="movie-info-item"
                      id="movie-release-date"
                    >
                      {this.state.movieDetails.release_date}
                    </p>
                  </div>
                  <div id="movie-director-info">
                    <p
                      className="movie-info-label"
                      id="movie-director-label"
                    >
                      director:
                    </p>
                    <p
                      className="movie-info-item"
                      id="movie-director"
                    >
                      {this.getDirector()}
                    </p>
                  </div>
                  <div id="movie-genre-info">
                    <p
                      className="movie-info-label"
                      id="movie-genre-label"
                    >
                      genres:
                    </p>
                    <p
                      className="movie-info-item"
                      id="movie-genres"
                    >
                      drama + blaa blaa
                    </p>
                  </div>
                  <div id="movie-poster-info">
                    <p
                      className="movie-info-label"
                      id="movie-poster-label"
                    >
                      poster:
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
            <div className="content-container">
              <p className="movie-overview"> {this.state.movieDetails.overview} </p>
              
              <Link to="/">back to the main page </Link>
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
