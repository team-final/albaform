import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzI2OTAyMTY5LCJleHAiOjE3MjY5MDkzNjl9.hWtbCWKnQ4UfDaW6F-UqTlBEc-bDos_uO1xIghRft0M'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default apiClient
