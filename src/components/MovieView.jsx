import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../apikey';
import './MovieView.css';
import playButton from '../media/play-button.png';
import CastMembersList from './CastMembersList';

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: null,
    };
  }

  componentWillMount() {
    const movieId = this.props.match.params.id;
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&append_to_response=videos,credits,`,
    }).then((response) => {
      this.setState({ movieDetails: response.data });
    });
  }

  getDirector() {
    const director = this.state.movieDetails.credits.crew.find(member =>
      (member.job === 'Director'));
    if (director) {
      return director.name;
    }
    return 'not found';
  }

  getTopGenre() {
    if (this.state.movieDetails.genres[0]) {
      return this.state.movieDetails.genres[0].name;
    }
    return 'not found';
  }

  getReleaseDateYear() {
    return this.state.movieDetails.release_date.slice(0, 4);
  }

  getTrailerLink() {
    return `https://www.youtube.com/watch?v=${this.state.movieDetails.videos.results[0].key}`;
  }

  render() {
    const backdropUrl = 'https://image.tmdb.org/t/p/original';
    return (
      <div>
        { this.state.movieDetails ?
          <div className="movie-view-content-wrapper">
            <div className="img-section-wrapper" style={{ background: `url(${backdropUrl + this.state.movieDetails.backdrop_path}) center/cover no-repeat` }}>
              <div className="img-section-gradient" >
                <div className="container img-section-content-container" >
                  <h1 className="headline" >
                    MOVIE-FINDER
                  </h1>
                  <div className="movie-title-item">
                    {this.state.movieDetails.videos.results[0] ?
                      <a target="_blank" href={this.getTrailerLink()}>
                        <img
                          className="play-button"
                          src={playButton}
                          alt="Play Button"
                        />
                      </a>
                    :
                      <img
                        className="play-button"
                        src={playButton}
                        alt="Play Button"
                      />
                    }
                    <p className="movie-title">
                      {this.state.movieDetails.title ?
                      this.state.movieDetails.title : '...'}
                    </p>
                  </div>
                  <div className="img-section-movie-info">
                    <div className="movie-info-block-container">
                      <p className="movie-info-label">
                        RELEASED
                      </p>
                      <p className="movie-info-item">
                        {this.getReleaseDateYear()}
                      </p>
                    </div>
                    <div className="movie-info-block-container">
                      <p className="movie-info-label">
                        DIRECTOR
                      </p>
                      <p className="movie-info-item">
                        {this.getDirector()}
                      </p>
                    </div>
                    <div className="movie-info-block-container">
                      <p className="movie-info-label">
                        GENRE
                      </p>
                      <p className="movie-info-item">
                        {this.getTopGenre()}
                      </p>
                    </div>
                    <div className="movie-info-block-container">
                      <p className="movie-info-label">
                        POSTER
                      </p>
                      <p className="movie-info-item">
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
            <div className="container content-container">
              <div className="movie-overview-item">
                <h2 className="movie-overview-label">
                  OVERVIEW
                </h2>
                <p className="movie-overview"> {this.state.movieDetails.overview} </p>
              </div>
              <div className="cast-members-list">
                <h2 className="cast-members-label">CAST</h2>
                <div className="cast-members-item">
                  <CastMembersList movieDetails={this.state.movieDetails} />
                </div>
              </div>
              <div className="information">
                <h2 className="information-label">INFORMATION</h2>
                <div>
                  <p>runtime: {`${this.state.movieDetails.runtime} minutes`}</p>
                  <p>rating: {this.state.movieDetails.vote_average}</p>
                  <p>budget: {`${this.state.movieDetails.budget} $`}</p>
                </div>
              </div>
            </div>
          </div>
        : (<p className="loading">LOADING</p>)
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
