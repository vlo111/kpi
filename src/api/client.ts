import axios from 'axios'
const { REACT_APP_BASE_URL_LOCAL } = process.env

const client = axios.create({
  baseURL: REACT_APP_BASE_URL_LOCAL
})

export default client
