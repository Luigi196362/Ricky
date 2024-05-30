import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { useMutation, gql } from '@apollo/client';

const VOTE_MUTATION = gql`
  mutation VoteMutation($characterId: Int!) {
    createVote(characterId: $characterId) {
      user {
        id
        username
      }
      character {
        id
        name
      }
    }
  }
`;

const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      characterId: link.id,
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={vote}

          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div class='container'>
          <div>Nombre: {link.name}</div> <img src={link.image} width={'20%'}/> <div>Genero: {link.genre}</div> <div>Especie: {link.species}</div> <div>Estado: {link.status}</div>
        </div>
        {(
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.username : 'Unknown'}{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;
