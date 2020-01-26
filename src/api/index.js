import axios from 'axios';

const api = axios.create({
  baseUrl: 'https://api.spacex.land/graphql'
});

export default api;
