import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Loader from '../Loader/Loader';
import tesla from './tesla.jpg';
import './Launch.css';

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
      {data.launch.links.flickr_images.length > 0 ? (
        <img
          src={data.launch.links.flickr_images[0]}
          alt='launch'
          className='launch__image'
        />
      ) : (
        <img src={tesla} alt='tesla' className='launch__image' />
      )}
      <div className='launch__info'>
        <h2>Mission number {data.launch.id}</h2>
        <span>
          <b>Status:</b>{' '}
          {data.launch.launch_success ? (
            <span style={{ color: 'green', textTransform: 'uppercase' }}>
              success
            </span>
          ) : (
            <span style={{ color: 'red', textTransform: 'uppercase' }}>
              fail
            </span>
          )}
        </span>

        <p>
          <b>Mission name:</b> {data.launch.mission_name}
        </p>
        <p>
          <b>Rocken name:</b> {data.launch.rocket.rocket_name}
        </p>
        <p>
          <b>Rocket type:</b> {data.launch.rocket.rocket_type}
        </p>

        <p>
          <b>Date:</b>{' '}
          <Moment format='HH:mm DD-MM-YYYY'>
            {data.launch.launch_date_local}
          </Moment>
        </p>
        <p>
          <b>Details: </b>
          {data.launch.details}
        </p>
      </div>
    </div>
  );
}

export default withRouter(Launch);
