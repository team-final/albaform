import basicAxios from '@/lib/api/basicAxios'
import handleError from '@/lib/api/errorHandler'
import { useUserStore } from '@/lib/stores/userStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const useSignIn = () => {
  const queryClient = useQueryClient()
  const { setUser } = useUserStore()
  const LOGIN_FAILED_MESSAGE = '로그인에 실패했습니다.'

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      const response = await basicAxios.post('/auth/sign-in', {
        email,
        password,
      })
      const { user, accessToken, refreshToken } = response.data
      Cookies.set('accessToken', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
      })
      Cookies.set('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
      })
      return user
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user) // 쿼리 캐시에 저장
      setUser(user) // Zustand 스토어에 저장
    },
    onError: (error: AxiosError) => {
      handleError(error, { message: LOGIN_FAILED_MESSAGE })
    },
  })
}

export default useSignIn
