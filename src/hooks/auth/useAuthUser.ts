import authAxios from '@/lib/api/authAxios'
import { User } from '@/lib/types/userTypes'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

const useAuthUser = () => {
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
    throwOnError: (error: unknown) => {
      console.error('사용자 정보를 불러오는 중 에러 발생:', error)
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
      return false
    },
  })
}

export default useAuthUser
