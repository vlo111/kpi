import * as axios from 'axios'
import useAuth from './hooks/useAuth'

const { REACT_APP_BASE_URL } = process.env;

// @ts-ignore
const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.defaults.baseURL = process.env.REACT_APP_BASE_URL

api.interceptors.request.use(
  (config: any) => {

    if (!config.headers.Authorization) {
      const { auth } = useAuth()

      if (auth?.token !== null) {
        config.headers.Authorization = `Bearer ${auth.token}`
      }
    }

    return config
  },
  async (error: any) => await Promise.reject(error)
)

class Api {
  static getMyAccount() {
    return api.get('/users/me');
  }
}

export default Api;
