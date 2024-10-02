import axios, { AxiosInstance } from 'axios'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mjc3NTM0ODMsImV4cCI6MTcyNzc2MDY4M30.JXcqR8O7I6GsNZshcAt67AWZMiyL9P2dpV_YZ2xcAd8'

const basicAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

export default basicAxios
