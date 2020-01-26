import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Loader/Loader';
import LaunchesItem from '../LauchesItem/LaunchesItem';
import { withRouter } from 'react-router-dom';
import './Launches.css';

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
  if (error) return <p>Error :</p>;

  return (
    <>
      <h1 className='launches__title'>SpaceX Launches</h1>
      <div className='launches'>
        {data.launchesPast.map(
          ({ id, mission_name, launch_date_local, launch_success }) => (
            <LaunchesItem
              key={id}
              id={id}
              mission_name={mission_name}
              mission_date={launch_date_local}
              mission_success={launch_success}
            />
          )
        )}
      </div>
    </>
  );
}

export default withRouter(Launches);
