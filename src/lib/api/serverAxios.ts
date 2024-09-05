import axios, { AxiosInstance } from 'axios'

const serverAxios: AxiosInstance = axios.create({
  baseURL: process.env.PRIVATE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default serverAxios
