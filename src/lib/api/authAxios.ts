import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const authAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

authAxios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = Cookies.get('refreshToken')
      if (!refreshToken) {
        return Promise.reject(error)
      }
      try {
        const response = await authAxios.post('/auth/refresh', {
          refreshToken,
        })
        const accessToken = response.data.accessToken
        Cookies.set('accessToken', accessToken)
        return authAxios(originalRequest)
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError)
        return Promise.reject(refreshError)
      }
    }
  },
)

export default authAxios
