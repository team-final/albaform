import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzI3MjcxNDM3LCJleHAiOjE3MjcyNzg2Mzd9.OEMf3YBmp9qrXC3jFPTJYS2GlTSDiU_r3KrHuOQWHsU'

const basicAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default basicAxios
