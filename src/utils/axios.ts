import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://72f9-31-146-6-47.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `z8PXp9LcUcfDHQgFqVRLtRxJcOzjHHswkn7Gkz8gS0w`
  }
});

export default axiosInstance;
