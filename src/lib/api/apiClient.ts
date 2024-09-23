import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzI3MDkwOTEwLCJleHAiOjE3MjcwOTgxMTB9.Rmhd13AHgCbkY7ObbQh7ugUXLyAeSKVVJEWM2dKfRhU'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default apiClient
