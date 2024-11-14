'use client'

import authAxios from '@/lib/api/authAxios'
import { AUTH_USER_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import handleError from '@/lib/utils/errorHandler'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

export default function useRefetchUser() {
  const { setUser } = useUserStore()

  const { refetch } = useQuery<void, AxiosError>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await authAxios.get('/users/me')
      const user = response.data
      setUser(user)
    },
    onError: (error: AxiosError) => {
      handleError(error, AUTH_USER_ERROR_MESSAGE)
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
    },
  } as UseQueryOptions<void, AxiosError>)
  return { refetchUser: refetch }
}
