import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  // baseURL: process.env.REACT_APP_URL_LOCAL,
});

export default api;