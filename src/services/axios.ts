import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-motofrela.vercel.app/',
  withCredentials: true,
});
