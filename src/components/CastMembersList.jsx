import React from 'react';
import PropTypes from 'prop-types';
import './CastMembersList.css';


function CastMembersList(props) {
  const list = props.movieDetails.credits.cast.map((member, index) =>
    (
      <li
        className={(index % 2 === 0) ? 'even' : 'odd'}
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

// CastMembersList.propTypes = {
//   movieDetails: PropTypes.objectOf(),
// };

export default CastMembersList;
