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
    return (
      <div>
        {this.state.performerInfo && (
          <p>{this.state.performerInfo.name} is a {this.state.performerInfo.gender === 2 ? 'boy' : 'girl'}</p>
        )}
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
