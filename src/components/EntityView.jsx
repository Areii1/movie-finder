import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../apikey';
import './EntityView.css';
import playButton from '../media/play-button.png';
import CastMembersList from './CastMembersList';

class EntityView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: null,
      personInfo: [],
      entityType: '',
    };
  }

  componentWillMount() {
    window.scroll(0, 0);
    console.log(this);
    const { id: entityId } = this.props.match.params;
    const { entity: entityType } = this.props.match.params;
    this.getEntityDetails(entityType, entityId);
  }

  componentDidUpdate(prevProps) {
    window.scroll(0, 0);
    if (this.props.match.params.entity !== prevProps.match.params.entity) {
      this.getEntityDetails(this.props.match.params.entity, this.props.match.params.id);
    }
  }

  getEntityDetails(entity, id) {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/${entity}/${id}?api_key=${apikey}&language=en-US&append_to_response=videos,credits`,
    }).then((response) => {
      (entity === 'movie') ? this.setState({
        movieDetails: response.data,
        entityType: 'movie'
      }) :
      this.setState({
        personInfo: response.data,
        entityType: 'person'
      });
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
    return this.state.movieDetails.videos ? `https://www.youtube.com/watch?v=${this.state.movieDetails.videos.results[0].key}` : 'not found';
  }

  render() {
    const backdropHeaderUrl = 'https://image.tmdb.org/t/p/original';
    const backdropPosterUrl = 'https://image.tmdb.org/t/p/w342';

    const headerUrlStr = (this.state.entityType === 'movie') ?
      `url(${backdropHeaderUrl + this.state.movieDetails.backdrop_path}) center/cover no-repeat` :
      `url(${backdropHeaderUrl + this.state.personInfo.profile_path}) center/cover no-repeat`;

    const posterUrl = (this.state.entityType === 'movie') ?
      (backdropPosterUrl + this.state.movieDetails.poster_path) :
      (backdropPosterUrl + this.state.personInfo.profile_path);

    return (
      <div>
        { this.state.movieDetails || this.state.personInfo ?
          <div className="entity-view-content-wrapper">
            <div className="entity-img-section-wrapper" style={{ background: headerUrlStr }}>
              <div className="entity-img-section-gradient" >
                <div className="container entity-img-section-content-container" >
                  <h1 className="entity-headline" >
                    MOVIE-FINDER
                  </h1>
                  <div className="entity-title-item">
                    {this.state.entityType === 'movie' && (
                      <a target="_blank" href={this.getTrailerLink()}>
                        <img
                          className="play-button"
                          src={playButton}
                          alt="Play Button"
                        />
                      </a>
                    )}
                    <p className="entity-title">
                      {this.state.entityType === 'movie' ?
                      this.state.movieDetails.title : this.state.personInfo.name}
                    </p>
                  </div>
                  {this.state.entityType === 'movie' && (
                    <div className="entity-img-section-movie-info">
                      <div className="entity-info-block-container">
                        <p className="entity-info-label">
                          RELEASED
                        </p>
                        <p className="entity-info-item">
                          {this.getReleaseDateYear()}
                        </p>
                      </div>
                      <div className="entity-info-block-container">
                        <p className="entity-info-label">
                          DIRECTOR
                        </p>
                        <p className="entity-info-item">
                          {this.getDirector()}
                        </p>
                      </div>
                      <div className="entity-info-block-container">
                        <p className="entity-info-label">
                          GENRE
                        </p>
                        <p className="entity-info-item">
                          {this.getTopGenre()}
                        </p>
                      </div>
                      <div className="entity-info-block-container">
                        <p className="entity-info-label">
                          POSTER
                        </p>
                        <p className="entity-info-item">
                          <img
                            className="poster"
                            src={posterUrl}
                            alt="Movie poster"
                          />
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="container content-container">
              <div className="entity-overview-item">
                <h2 className="entity-overview-label">
                  {this.state.entityType === 'movie' ? 'OVERVIEW' : 'BIOGRAPHY'}
                </h2>
                <p className="entity-overview">
                  {this.state.entityType === 'movie' ?
                  this.state.movieDetails.overview :
                  this.state.personInfo.biography}
                </p>
              </div>
              {this.state.entityType === 'movie' && (
                <div className="cast-members-list">
                  <h2 className="cast-members-label">CAST</h2>
                  <div className="cast-members-item">
                    <CastMembersList movieDetails={this.state.movieDetails} />
                  </div>
                </div>
              )}
              {this.state.entityType === 'movie' && (
                <div className="information">
                  <h2 className="information-label">INFORMATION</h2>
                  <div>
                    <p>runtime: {`${this.state.movieDetails.runtime} minutes`}</p>
                    <p>rating: {this.state.movieDetails.vote_average}</p>
                    <p>budget: {`${this.state.movieDetails.budget} $`}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        : (<p className="loading">LOADING</p>)
        }
      </div>
    );
  }
}

EntityView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      entity: PropTypes.string,
    }),
  }).isRequired,
};

export default EntityView;
