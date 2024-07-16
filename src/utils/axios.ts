import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://72f9-31-146-6-457.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;
