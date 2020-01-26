import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import Loader from '../Loader/Loader';

function Launch(props) {
  let launch_id = props.location.pathname.split('/').slice(-1)[0];

  const GET_LAUNCH = id => gql`
    {
      launch(id: "${id}") {
        launch_success
        launch_date_local
        id
        details
        links {
          flickr_images
        }
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LAUNCH(launch_id));
  console.log(data);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <div className='launch'>
      hello
      <p>{data.launch.id}</p>
      <p>{data.launch.launch_success}</p>
      <p>{data.launch.launch_date_local}</p>
      <p>{data.launch.details}</p>
      <p>{data.launch.mission_name}</p>
      <p>{data.launch.rocket_name}</p>
      <p>{data.launch.rocket_type}</p>
      <p>{data.launch.links.flickr_images}</p>
    </div>
  );
}

export default withRouter(Launch);
