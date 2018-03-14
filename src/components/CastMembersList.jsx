import React from 'react';
import PropTypes from 'prop-types';
import './CastMembersList.css';
import QuestionMark from '../media/question-mark.png';

const urlStart = 'https://image.tmdb.org/t/p/w92';

function CastMembersList(props) {
  const list = props.movieDetails.credits.cast.map((member, index) => {
    if (index < 15) {
      return (
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
          <p className="cast-member-middle-block" />
          <p className="cast-member-character">{member.character}</p>
        </li>
      );
    }
    return null;
  });

  return (
    <ul>
      {list}
    </ul>
  );
}

CastMembersList.propTypes = {
  movieDetails: PropTypes.shape({
    credits: PropTypes.shape({
      cast: PropTypes.arrayOf(PropTypes.shape({
        credit_id: PropTypes.string,
        profile_path: PropTypes.string,
        name: PropTypes.string,
        character: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default CastMembersList;
