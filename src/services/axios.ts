import axios from 'axios';

// https://api-motofrela.vercel.app/
export default axios.create({
  baseURL: '// https://api-motofrela.vercel.app/',
  withCredentials: true,
});
