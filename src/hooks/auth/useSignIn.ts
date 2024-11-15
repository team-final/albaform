import basicAxios from '@/lib/api/basicAxios'
import { SIGN_IN_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import {
  AuthProvider,
  AuthResponse,
  SignInValues,
  User,
} from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
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
}

const handleSignInSuccess = (
  queryClient: QueryClient,
  setUser: (user: User) => void,
  data: AuthResponse,
) => {
  const { user, accessToken, refreshToken } = data
  setAuthCookies(accessToken, refreshToken)
  setUser(user)
  queryClient.setQueryData(['user'], user)
  toast.success('로그인되었습니다.')
}

const handleSignInFailure = (error: AxiosError, router: AppRouterInstance) => {
  handleError(error, SIGN_IN_ERROR_MESSAGE)
  if (error.status === 403) {
    toast.error('회원정보가 없습니다. 회원가입 페이지로 이동합니다.')
    return router.push('/user/sign-up')
  }
}

export default function useSignIn() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setUser, setAuthService } = useUserStore()

  const signIn = useMutation({
    mutationFn: async ({ email, password }: SignInValues) => {
      const response: AxiosResponse<AuthResponse> = await basicAxios.post(
        '/auth/sign-in',
        {
          email,
          password,
        },
      )
      return response.data
    },
    onSuccess: (data) => {
      handleSignInSuccess(queryClient, setUser, data)
    },
    onError: (error: AxiosError) => {
      handleSignInFailure(error, router)
    },
  })

  const oauthSignIn = useMutation({
    mutationFn: async ({
      provider,
      redirectUri,
      providerToken,
    }: {
      provider: AuthProvider
      redirectUri?: string
      providerToken: string
    }) => {
      const response = await basicAxios.post(`/oauth/sign-in/${provider}`, {
        redirectUri,
        token: providerToken,
      })
      const { user, accessToken, refreshToken } = response.data
      return { user, accessToken, refreshToken, provider }
    },
    onSuccess: (data) => {
      handleSignInSuccess(queryClient, setUser, data)
      setAuthService(data.provider)
    },
    onError: (error: AxiosError) => {
      handleSignInFailure(error, router)
    },
  })

  return { signIn, oauthSignIn }
}
