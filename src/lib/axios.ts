import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.garcho.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `DyTmbaDmUrfxAF3DCwgF8rCabG6dowJs5HWFJcqtb80`
  }
});

export default axiosInstance;