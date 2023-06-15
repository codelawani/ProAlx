import axios from 'axios';
import localDataMgr from './localDataMgr';
const { VITE_API_URL: API } = import.meta.env;

const api = axios.create({
  baseURL: API
});

// add authorization token to api requests
api.interceptors.request.use(
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
export default api;
