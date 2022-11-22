import axios, { AxiosRequestConfig } from 'axios';
import { PATHS } from '../helpers/constants';
import { logOut } from '../helpers/utils';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = JSON.parse(localStorage.getItem('token') as any) || '';
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Add a response interceptor
client.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      logOut();
    }
    // if (error.response.status === 500) {
    //   window.location.href = `/${PATHS.ERROR_403}`;
    // }
    return Promise.reject(error);
  }
);

export default client;
