import authAxios from '@/lib/api/authAxios'
import { AUTH_USER_ERROR_MESSAGE } from '@/lib/data/constants'
import { User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export default function useAuthUser() {
  const accessToken = Cookies.get('accessToken')
  return useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      if (!accessToken) {
        return null
      }
      const response = await authAxios.get('/users/me')
      return response.data
    },
    enabled: !!accessToken,
    throwOnError: (error: Error) => {
      handleError(error, AUTH_USER_ERROR_MESSAGE)
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
      return false
    },
  })
}