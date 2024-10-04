import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjgwNTQzODAsImV4cCI6MTcyODA2MTU4MH0.0PlSqD2sGUJlDesTWJZgTTY9f2Hg6EhYCNYo-b1ph-U'

const basicAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default basicAxios
