import React from 'react';
import PropTypes from 'prop-types';
import './CastMembersList.css';
import QuestionMark from '../media/question-mark.png';

const urlStart = 'https://image.tmdb.org/t/p/w92';

function CastMembersList(props) {
  const list = props.movieDetails.credits.cast.map((member, index) => (
    <li
      className={(index % 2 === 0) ? 'even' : 'odd'}
      key={member.credit_id}
    >
      <img
        className="cast-member-picture"
        src={(member.profile_path) ? urlStart + member.profile_path : QuestionMark}
        alt={member.name}
      />

      <p className="cast-member-name">{member.name}</p>
      <p className="appearing-as-label">Appearing as</p>
      <p className="cast-member-character">{member.character}</p>
    </li>
  ));

  return (
    <ul>
      {list}
    </ul>
  );
}

CastMembersList.propTypes = {
  movieDetails: PropTypes.objectof(PropTypes.object).isRequired,
};

export default CastMembersList;
