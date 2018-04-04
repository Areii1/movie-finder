import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CastMembersList.css';

const urlStart = 'https://image.tmdb.org/t/p/w92';

function CastMembersList(props) {
  const filteredList = props.movieDetails.credits.cast.filter((member, index) =>
    (index < 15)).filter(member => (!!member.profile_path));
  const list = filteredList.map((member, index) => (
    <Link
      to={`/person/${member.id}`}
      className="person-link"
      key={member.credit_id}
    >
      <li
        className={(index % 2 === 0) ? 'even' : 'odd'}
      >
        <img
          className="cast-member-picture"
          src={urlStart + member.profile_path}
          alt={member.name}
        />
        <p className="cast-member-name">{member.name}</p>
        <p className="cast-member-middle-block" />
        <p className="cast-member-character">{member.character}</p>
      </li>
    </Link>
  ));

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
