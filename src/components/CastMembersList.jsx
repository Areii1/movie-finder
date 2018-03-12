import React from 'react';
import PropTypes from 'prop-types';
import './CastMembersList.css';


function CastMembersList(props) {
  const list = props.movieDetails.credits.cast.map(member =>
    (
      <li
        className="cast-member-item"
        key={member.credit_id}
      >
        <p className="cast-member-name">{member.name}</p>
        <p className="appearing-as-label">Appearing as</p>
        <p className="cast-member-character">{member.character}</p>
      </li>
    ),
  );

  return (
    <ul>
      {list}
    </ul>
  );
}

CastMembersList.propTypes = {
  movieDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CastMembersList;
