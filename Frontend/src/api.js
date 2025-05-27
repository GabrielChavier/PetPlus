import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  // Não colocar Authorization aqui
});

export default api;
