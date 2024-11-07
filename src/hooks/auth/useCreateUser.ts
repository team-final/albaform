import { setAuthCookies } from '@/hooks/auth/useSignIn'
import basicAxios from '@/lib/api/basicAxios'
import { SIGN_UP_ERROR_MESSAGE } from '@/lib/data/messages'
import {
  AuthProvider,
  AuthResponse,
  CreateUserValues,
  UserRole,
} from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export default function useCreateUser() {
  const signUp = useMutation({
    mutationFn: async (values: CreateUserValues): Promise<AuthResponse> => {
      const response: AxiosResponse<AuthResponse> = await basicAxios.post(
        '/auth/sign-up',
        values,
      )
      return response.data
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data
      setAuthCookies(accessToken, refreshToken)
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_UP_ERROR_MESSAGE)
    },
  })

  const oauthSignUp = useMutation({
    mutationFn: async ({
      role,
      name,
      providerToken,
      redirectUri,
      provider,
    }: {
      role: UserRole
      name: string
      providerToken?: string
      provider: AuthProvider
      redirectUri?: string
    }) => {
      const response = await basicAxios.post(`/oauth/sign-up/${provider}`, {
        role,
        name,
        token: providerToken,
        redirectUri,
      })

      return response.data
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_UP_ERROR_MESSAGE)
    },
  })

  return { signUp, oauthSignUp }
}
