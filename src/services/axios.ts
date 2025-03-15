import axios from 'axios';

// https://api-motofrela.vercel.app/
export default axios.create({
  baseURL: 'http://localhost:9001/',
  withCredentials: true,
});
