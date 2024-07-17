import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.garcho.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `z8PXp9LcUcfDHQgFqVRLtRxJcOzjHHswkn7Gkz8gS0w`
  }
});

export default axiosInstance;