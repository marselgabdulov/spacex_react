import React from 'react';
import './LaunchesItem.css';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function LaunchesItem({ mission_name, mission_date, mission_success, id }) {
  return (
    <div className='launches-item'>
      <span>flight number: {id}</span>
      <span>mission name: {mission_name}</span>
      <span>
        date: <Moment format='HH:mm DD-MM-YYYY'>{mission_date}</Moment>
      </span>
      <span>
        Status:{' '}
        {mission_success ? (
          <span style={{ color: 'green', textTransform: 'uppercase' }}>
            success
          </span>
        ) : (
          <span style={{ color: 'red', textTransform: 'uppercase' }}>fail</span>
        )}
      </span>
      <Link to={`/launch/${id}`} className='detail-button'>
        Launch Details
      </Link>
    </div>
  );
}

export default LaunchesItem;
