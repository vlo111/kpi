import axios, { AxiosRequestConfig } from 'axios';
// import { PATHS } from '../helpers/constants';
// import { logOut } from '../helpers/utils';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token: string | null = JSON.parse(localStorage.getItem('token') as string);
    if (token != null) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error: any) => await Promise.reject(error)
);

// Add a response interceptor
client.interceptors.response.use(
  async function (response) {
    return response;
  }
  // async function (error) {
  //   if (error.response.status === 401) {
  //     logOut();
  //   }
  //   // if (error.response.status === 500) {
  //   //   window.location.href = `/${PATHS.ERROR_403}`;
  //   // }
  //   return Promise.reject(error);
  // }
);

export default client;
