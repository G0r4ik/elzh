import axios from 'axios'

const server =
  process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000'
const token = localStorage.getItem('authToken')

const instance = axios.create({
  baseURL: server,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export default instance
