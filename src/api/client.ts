import axios from 'axios'
const { REACT_APP_BASE_URL } = process.env

const client = axios.create({
  baseURL: REACT_APP_BASE_URL
})

export default client
