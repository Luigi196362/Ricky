import React from 'react';
import Link from './Link';

import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  {
      characters {
        id
        name
        image
        genre
        species
        status
        votes {
          id  
        }
        
        postedBy {
          username
        } 

      }
 
  }
`
;

const LinkList = () => {

  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
    {data && (
      <>
        {data.characters.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </>
     )}
   </div>
  );
};

export default LinkList;