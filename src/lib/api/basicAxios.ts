import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzI3ODU5MDU0LCJleHAiOjE3Mjc4NjYyNTR9.MsoDkhNsXOyWe1Cz37B8xvcZ-qZrt3uWNID6f8j0oHk'

const basicAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default basicAxios
