import React from 'react';
import PropTypes from 'prop-types';
import './CastMembersList.css';

const urlStart = 'https://image.tmdb.org/t/p/original';

function CastMembersList(props) {
  console.log(props.movieDetails);
  const list = props.movieDetails.credits.cast.map((member, index) =>
    (
      <li
        className={(index % 2 === 0) ? 'even' : 'odd'}
        key={member.credit_id}
      >
        <img
          className="cast-member-picture"
          src={urlStart + member.profile_path}
          alt={member.name}
        />

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
