import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../apikey';
import './PerformerView.css';

class PerformerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performerInfo: [],
    };
  }

  componentWillMount() {
    const performerId = this.props.match.params.id;
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/person/${performerId}?api_key=${apikey}&language=en-US`,
    }).then((response) => {
      this.setState({
        performerInfo: response.data,
      });
    });
  }

  render() {
    const backdropHeaderUrl = 'https://image.tmdb.org/t/p/original';

    console.log(this.state.performerInfo, 'info');
    return (
      <div>
        { this.state.performerInfo ?
          <div className="performer-view-content-wrapper">
            <div className="performer-img-section-wrapper" style={{ background: `url(${backdropHeaderUrl + this.state.performerInfo.profile_path}) center/cover no-repeat` }}>
              <div className="performer-img-section-gradient" >
                <div className="container performer-img-section-content-container" >
                  <h1 className="performer-headline" >
                    MOVIE-FINDER
                  </h1>
                  <p className="performer-name">
                    {this.state.performerInfo.name ?
                    this.state.performerInfo.name : '...'}
                  </p>
                </div>
              </div>
            </div>
            <div className="container content-container">
              <div className="performer-biography-item">
                <h2 className="performer-biography-label">
                  BIOGRAPHY
                </h2>
                <p className="performer-biography"> {this.state.performerInfo.biography} </p>
              </div>
              {/* <div className="information">
                <h2 className="information-label">INFORMATION</h2>
                <div>
                  <p>runtime: {`${this.state.movieDetails.runtime} minutes`}</p>
                  <p>rating: {this.state.movieDetails.vote_average}</p>
                  <p>budget: {`${this.state.movieDetails.budget} $`}</p>
                </div>
              </div> */}
            </div>
          </div>
        : (<p className="performer-loading">LOADING</p>)
        }
      </div>
    );
  }
}


PerformerView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default PerformerView;
