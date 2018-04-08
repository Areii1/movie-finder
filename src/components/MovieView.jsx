import React, { Component } from 'react';
import axios from 'axios';
import './MovieView.css';
import apikey from '../apikey';
import Button from './Button';

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: null,
    };
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    console.log(id);

    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US&append_to_response=videos,credits`,
    }).then((response) => {
      this.setState({ movieDetails: response.data });
    });
  }

  render() {
    const trailerLinkBase = 'https://www.youtube.com/watch?v=';
    const backdropHeaderUrl = 'https://image.tmdb.org/t/p/original';
    console.log(this.state.movieDetails, 'moviedetails');
    return (
      <div>
        {this.state.movieDetails && (
          <div className="movie-view-wrapper">
            <div className="movie-view-details-side">
              <div className="movie-view-details-side-content-wrapper">
                <h2 className="movie-title">
                  {this.state.movieDetails.title.toUpperCase()}
                </h2>
                <p className="movie-genre-runtime">
                  {`${this.state.movieDetails.genres[0].name.toUpperCase()}, ${this.state.movieDetails.genres[1].name.toUpperCase()}`}
                </p>
                <div className="movie-buttons">
                  <Button
                    type="primary"
                    link={trailerLinkBase + this.state.movieDetails.videos.results[0].key}
                    label="WATCH TRAILER"
                  />
                  <Button
                    type="secondary"
                    link=""
                    label="MORE INFO"
                  />
                </div>
                <div className="movie-overview-item">
                  <h3 className="movie-overview-label">OVERVIEW</h3>
                  <p className="movie-overview-text">{this.state.movieDetails.overview}</p>
                </div>
              </div>
            </div>
            <div
              className="movie-view-img-side"
              style={{
                background:
                `url(${backdropHeaderUrl + this.state.movieDetails.backdrop_path}) center/cover no-repeat`,
              }}
            >
              <div className="movie-view-img-side-content-container">
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieView;
