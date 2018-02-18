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
  }

  render() {
    const backdropUrl = 'https://image.tmdb.org/t/p/original';
    return (
      <div>
        { this.state.movieDetails ?
          <div className="content-wrapper">
            <div className="header-img" style={{ background: `url(${backdropUrl + this.state.movieDetails.backdrop_path}) center/cover no-repeat` }} />
            <div className="text-content-wrapper">
              <p className="movie-description">
                {this.state.movieDetails.overview}
              </p>
            </div>
          </div>
        : (<p>...</p>)
        }
        <Link to="/">back to the main page </Link>
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
