import React from 'react';
import PropTypes from 'prop-types';
import './CastMembersList.css';

const urlStart = 'https://image.tmdb.org/t/p/w92';

function CastMembersList(props) {
  const filteredList = props.movieDetails.credits.cast.filter((member, index) =>
    (index < 6)).filter(member => (!!member.profile_path));
  const list = filteredList.map(member => (
    <li
      className="cast-member-list-item"
      key={member.id}
    >
      <div
        className="cast-member-picture"
        style={{
          background:
          `url(${urlStart + member.profile_path}) center/cover no-repeat`,
        }}
        // src={urlStart + member.profile_path}
        alt={member.name}
      />
      <p className="cast-member-name">{member.name}</p>
    </li>
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
