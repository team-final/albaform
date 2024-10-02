import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mjc4Njk5NzAsImV4cCI6MTcyNzg3NzE3MH0.nbWXKn7A_HCLLq19MnerX0coPxNiykocLjLQOZiLGYE'

const basicAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default basicAxios
