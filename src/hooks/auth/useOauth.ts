import basicAxios from '@/lib/api/basicAxios'
import { app } from '@/lib/firebase/clientSDK'
import { useUserStore } from '@/lib/stores/userStore'
import {
  AuthCredentials,
  CompleteOauthSignUpValues,
} from '@/lib/types/userTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const provider = new GoogleAuthProvider()
const auth = getAuth(app)
auth.languageCode = 'ko'
// auth.useDeviceLanguage()

export default function useOauth() {
  const queryClient = useQueryClient()
  const { setUser } = useUserStore()
  const router = useRouter()

  // 알바폼 회원가입
  const signUpAlbaformWithExternalToken = useMutation({
    mutationFn: async (
      oauthSignUpValues: CompleteOauthSignUpValues,
    ): Promise<string> => {
      const response = await basicAxios.post(
        '/oauth/sign-up/google',
        oauthSignUpValues,
      )
      const { accessToken: albaformAccessToken } = response.data as {
        accessToken: string | undefined
      }
      if (!albaformAccessToken) {
        throw new Error('Albaform Access token is undefined') // undefined 처리
      }
      return String(albaformAccessToken)
    },
    // onError: (error: AxiosError) => {
    //   handleError(error, SIGN_UP_ERROR_MESSAGE)
    // },
  })

  // 알바폼 로그인
  const signInAlbaformWithExternalToken = useMutation({
    mutationFn: async ({
      token,
      provider,
    }: {
      token: string
      provider: string
    }) => {
      const response = await basicAxios.post(`/oauth/sign-in/${provider}`, {
        token,
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
      queryClient.setQueryData(['user'], user) // 쿼리 캐시에 유저 정보 저장
      setUser(user) // Zustand 스토어에 유저 정보 저장
      router.back()
    },
    // onError: (error: AxiosError) => {
    //   handleError(error, SIGN_IN_ERROR_MESSAGE)
    // },
  })

  // 구글 로그인하고 토큰 리턴
  // const getGoogleTokens = useQuery({
  //   queryKey: ['googleCredentials'],
  //   queryFn: async () => {
  //     const result = await signInWithPopup(auth, provider)
  //     const credentials = await GoogleAuthProvider.credentialFromResult(result)
  //     const accessToken = String(credentials?.accessToken)
  //     const user = result.user
  //     const operationType = result.operationType
  //     return { accessToken, user, operationType }
  //   },
  //   // throwOnError: (error: any) => {
  //   //   handleError(error, SIGN_IN_ERROR_MESSAGE)
  //   //   // The email of the user's account used.
  //   //   const email = error.customData.email
  //   //   if (email) {
  //   //     console.log(email)
  //   //   }
  //   //   // The AuthCredential type that was used.
  //   //   const oathCredential = GoogleAuthProvider.credentialFromError(error)
  //   //   if (oathCredential) {
  //   //     console.log(oathCredential)
  //   //   }
  //   //   return false
  //   // },
  // })

  const getGoogleToken = useMutation({
    mutationFn: async () => {
      const result = await signInWithPopup(auth, provider)
      const credentials = await GoogleAuthProvider.credentialFromResult(result)
      const accessToken = String(credentials?.accessToken)
      const user = result.user
      const operationType = result.operationType
      return { accessToken, user, operationType }
    },
  })

  // 카카오 로그인하고 토큰 리턴
  const appKey = process.env.NEXT_PUBLIC_KAKAO_APPKEY
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

  // const getKakaoTokens = useQuery({
  //   queryKey: ['kakaoCredentials'],
  //   queryFn: async (): Promise<AuthCredentials> => {
  //     let authorizeCode
  //     const codeResponse = await axios.get(
  //       `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`,
  //     )
  //     if (codeResponse.status === 302) {
  //       const location = String(codeResponse.headers.Location)
  //       const urlParams = new URLSearchParams(location?.split('?')[1])
  //       authorizeCode = urlParams.get('code') || undefined
  //       const errorMessage = {
  //         title: urlParams.get('error') || undefined,
  //         message: urlParams.get('error_description') || undefined,
  //       }
  //       // if (errorMessage) handleError(errorMessage)
  //     }
  //
  //     const tokenResponse = await axios.post(
  //       'https://kauth.kakao.com/oauth/token',
  //       {
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //         },
  //         grant_type: 'authorization_code',
  //         client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  //         redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  //         code: authorizeCode,
  //       },
  //     )
  //     const { access_token: accessToken, refresh_token: refreshToken } =
  //       tokenResponse.data
  //     return { accessToken, refreshToken }
  //   },
  //   // throwOnError: (error: AxiosError) => {
  //   //   handleError(error, SIGN_IN_ERROR_MESSAGE)
  //   //   return false
  //   // },
  // })

  const openKakaoLogin = useMutation({
    mutationFn: async () => {
      await axios.get(
        `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`,
      )
    },
  })

  const getKakaoToken = useMutation({
    mutationFn: async (authorizeCode: string): Promise<AuthCredentials> => {
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
          redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          code: authorizeCode,
        },
      )
      const { access_token: accessToken, refresh_token: refreshToken } =
        tokenResponse.data
      return { accessToken, refreshToken }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['kakaoCredentials'], data.accessToken)
    },
  })

  return {
    oauthSignUp: signUpAlbaformWithExternalToken,
    oauthSignIn: signInAlbaformWithExternalToken,
    signInGoogle: getGoogleToken,
    signInKakao: openKakaoLogin,
    getKakaoToken,
  }
}
