import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjcyNDM0OTcsImV4cCI6MTcyNzI1MDY5N30.eRvwzpzJzw2TlKF3eQUZaF8qkWDHOhcpZjOBltQZhQk'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default apiClient
