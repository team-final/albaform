import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzI3MzI4MjM1LCJleHAiOjE3MjczMzU0MzV9.6aqOJeoC9nr1kjvPyuZxB9xg_bBjscIPfmsaZdOhwf4'

const basicAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default basicAxios
