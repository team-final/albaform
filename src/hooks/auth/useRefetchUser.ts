import authAxios from '@/lib/api/authAxios'
import { AUTH_USER_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import { User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

/**
 * 최신 유저 정보 필요한 컴포넌트를 <DefaultQueryProvider>로 감싸고
 * const { refetch } = useReloadUser()
 */
export default function useReloadUser() {
  const { user, setUser, setUserRole } = useUserStore()
  const accessToken = Cookies.get('accessToken')
  const { refetch } = useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      if (!accessToken) {
        return null
      }
      const response = await authAxios.get('/users/me')
      const { user: refetchedUser } = response.data
      setUser(refetchedUser)
      setUserRole(refetchedUser.role)
      return refetchedUser
    },
    enabled: !user && !!accessToken,
    throwOnError: (error: Error) => {
      handleError(error, AUTH_USER_ERROR_MESSAGE)
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
      return false
    },
  })
  return { refetch }
}
