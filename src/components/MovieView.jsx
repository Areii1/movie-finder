import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../apikey';

const language = 'en-us';

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: [],
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
    console.log(backdropUrl + this.state.movieDetails.backdrop_path);
    return (
      <div>
        <p> MOvie : {this.props.match.params.id} </p>
        {this.state.movieDetails && (
          <img src={backdropUrl + this.state.movieDetails.backdrop_path} alt="Movie header" />
        )}
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
