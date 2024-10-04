import basicAxios from '@/lib/api/basicAxios'
import { SIGN_UP_ERROR_MESSAGE } from '@/lib/data/constants'
import { CompleteSignUpValues, User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

export default function useSignUp() {
  return useMutation({
    mutationFn: async (signUpValues: CompleteSignUpValues): Promise<User> => {
      const response = await basicAxios.post('/auth/sign-up', signUpValues)
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
    onError: (error: AxiosError) => {
      handleError(error, SIGN_UP_ERROR_MESSAGE)
    },
  })
}
