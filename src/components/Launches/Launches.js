import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../Loader/Loader';

const GET_LAUNCHES = gql`
  {
    launchesPast {
      mission_name
      launch_date_local
      launch_success
      id
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return data.launchesPast.map(
    ({ id, mission_name, launch_date_local, launch_success }) => (
      <div key={id}>
        <p>{mission_name}</p>
        <p>{launch_date_local}</p>
        <p>{launch_success}</p>
        <Link to={`/launch/${id}`} className='detail-button'>
          Launch Details
        </Link>
      </div>
    )
  );
}

export default withRouter(Launches);
