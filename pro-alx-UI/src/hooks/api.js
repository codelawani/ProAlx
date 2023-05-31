import axios from 'axios';
import localDataMgr from './localDataMgr';

export default axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

axios.interceptors.request.use(
  config => {
    const token = localDataMgr.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
