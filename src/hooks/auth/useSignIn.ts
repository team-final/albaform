import basicAxios from '@/lib/api/basicAxios'
import { SIGN_IN_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import { AuthResponse, SignInValues, User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export default function useSignIn() {
  const queryClient = useQueryClient()
  const { setUser } = useUserStore()

  return useMutation({
    mutationFn: async ({ email, password }: SignInValues): Promise<User> => {
      const response: AxiosResponse<AuthResponse> = await basicAxios.post(
        '/auth/sign-in',
        {
          email,
          password,
        },
      )
      const { user, accessToken, refreshToken } = response.data
      // 쿠키에 토큰 저장
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
      queryClient.setQueryData(['user'], user) // 쿼리 캐시에 유저 정보 저장
      setUser(user) // Zustand 스토어에 유저 정보 저장
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_IN_ERROR_MESSAGE)
    },
  })
}
