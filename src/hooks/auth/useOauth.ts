import basicAxios from '@/lib/api/basicAxios'
import {
  SIGN_IN_ERROR_MESSAGE,
  SIGN_UP_ERROR_MESSAGE,
} from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import { OauthService, UserRole } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function useOauth() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setUser, setAuthService } = useUserStore()

  const oauthSignUp = useMutation({
    mutationFn: async ({
      role,
      name,
      token,
      redirectUri,
      provider,
    }: {
      role: UserRole
      name: string
      token: string | undefined
      redirectUri: string | undefined
      provider: OauthService
    }) => {
      if (!token) {
        throw new Error('OAuth credentials are undefined')
      }

      const response = await basicAxios.post(`/oauth/sign-up/${provider}`, {
        role,
        name,
        token,
        redirectUri,
      })

      return response.data
    },
    onSuccess: (data: { accessToken: string | undefined }) => {
      const { accessToken: albaformAccessToken } = data
      if (!albaformAccessToken) {
        throw new Error('Albaform access token is undefined') // undefined 처리
      }
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_UP_ERROR_MESSAGE)
    },
  })

  const oauthSignIn = useMutation({
    mutationFn: async ({
      provider,
      redirectUri,
      token,
    }: {
      provider: OauthService
      redirectUri: string | undefined
      token: string | undefined
    }) => {
      const response = await basicAxios.post(`/oauth/sign-in/${provider}`, {
        redirectUri,
        token,
      })
      return { response, provider }
    },
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data.response.data
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
      queryClient.setQueryData(['user'], user)
      setUser(user)
      setAuthService(data.provider)
      router.replace('/')
      toast.success('로그인되었습니다.')
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_IN_ERROR_MESSAGE)
      if (error.status === 403) {
        toast.error('회원정보가 없습니다. 회원가입 페이지로 이동합니다.')
        return router.push('user/sign-up')
      }
    },
  })

  return {
    oauthSignUp,
    oauthSignIn,
  }
}
