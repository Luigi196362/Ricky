import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $name: String!
    $image: String!
    $genre: String!
    $species: String!
    $status: String!
  ) {
    createCharacter(name: $name, image : $image, genre : $genre, species : $species, status : $status) {
      id
      name
      image
      genre
      species
      status
    }
  }
`;




const CreateLink = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: '',
    image: '',
    genre: '',
    species: '',
    status: '',
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      name: formState.name,
      image: formState.image,
      genre: formState.genre,
      species: formState.species,
      status: formState.status
    },
    onCompleted: () => navigate('/')
  });


  return (
    <div>
      <form
        onSubmit={(e) => {
          alert("enviando datos...");
          e.preventDefault();
          createLink();

        }}
      >
        <div className="flex flex-column mt3">

          <input
            className="mb2"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Nombre del personaje"
          />
          <input
            className="mb2"
            value={formState.image}
            onChange={(e) =>
              setFormState({
                ...formState,
                image: e.target.value
              })
            }
            type="text"
            placeholder="Url de imagen"
          />
          <input
            className="mb2"
            value={formState.genre}
            onChange={(e) =>
              setFormState({
                ...formState,
                genre: e.target.value
              })
            }
            type="text"
            placeholder="Genero del personaje"
          />
          <input
            className="mb2"
            value={formState.species}
            onChange={(e) =>
              setFormState({
                ...formState,
                species: e.target.value
              })
            }
            type="text"
            placeholder="Especie del personaje"
          />
          <input
            className="mb2"
            value={formState.status}
            onChange={(e) =>
              setFormState({
                ...formState,
                status: e.target.value
              })
            }
            type="text"
            placeholder="Estado"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;