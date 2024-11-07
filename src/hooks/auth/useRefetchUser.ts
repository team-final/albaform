'use client'

import authAxios from '@/lib/api/authAxios'
import { AUTH_USER_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import handleError from '@/lib/utils/errorHandler'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export default function useRefetchUser() {
  const { setUser } = useUserStore()
  const { refetch } = useQuery<void>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await authAxios.get('/users/me')
      const user = response.data
      setUser(user)
    },
    onError: (error: Error) => {
      handleError(error, AUTH_USER_ERROR_MESSAGE)
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
    },
  })
  return { refetchUser: refetch }
}
