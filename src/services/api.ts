import axios from 'axios';

const api = axios.create({
  baseURL: 'https://staging-purple-stock.herokuapp.com/api/v1',
});

export default api;
