import basicAxios from '@/lib/api/basicAxios'
import { SIGN_UP_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import { UserRole } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function useOauth() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setUser } = useUserStore()

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
      provider: string
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
      provider: string
      redirectUri: string | undefined
      token: string | undefined
    }) => {
      const response = await basicAxios.post(`/oauth/sign-in/${provider}`, {
        redirectUri,
        token,
      })
      return response
    },
    onSuccess: (response) => {
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

      // 쿼리 캐시에 유저 정보 저장
      queryClient.setQueryData(['user'], user)
      // Zustand 스토어에 유저 정보 저장
      setUser(user)
      router.replace('/')
    },
    onError: (error: AxiosError) => {
      // handleError(error, SIGN_IN_ERROR_MESSAGE)
      // 회원 정보 없음
      if (error.status === 403) {
        router.replace('/user/sign-up')
      }
    },
  })

  return {
    oauthSignUp,
    oauthSignIn,
  }
}
