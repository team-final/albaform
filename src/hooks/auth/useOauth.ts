import basicAxios from '@/lib/api/basicAxios'
import { SIGN_UP_ERROR_MESSAGE } from '@/lib/data/messages'
// import { app } from '@/lib/firebase/clientSDK'
import { useUserStore } from '@/lib/stores/userStore'
import { UserRole } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import qs from 'qs'

// const provider = new GoogleAuthProvider()
// const auth = getAuth(app)
// auth.languageCode = 'ko'
// auth.useDeviceLanguage()

export default function useOauth() {
  const queryClient = useQueryClient()
  const { setUser } = useUserStore()
  const router = useRouter()

  // 알바폼 회원가입
  const signUpAlbaformWithExternalToken = useMutation({
    mutationFn: async ({
      role,
      name,
      token,
    }: {
      role: UserRole
      name: string
      token: string
    }) => {
      const response = await basicAxios.post('/oauth/sign-up/kakao', {
        role,
        name,
        token,
        redirectUri: 'http://localhost:3000/user/sign-up/oauth',
      })

      return response.data
    },
    onSuccess: (data: { accessToken: string | undefined }) => {
      const { accessToken: albaformAccessToken } = data
      if (!albaformAccessToken) {
        throw new Error('Albaform Access token is undefined') // undefined 처리
      }
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_UP_ERROR_MESSAGE)
    },
  })

  // 알바폼 로그인
  const signInAlbaformWithExternalToken = useMutation({
    mutationFn: async ({
      provider,
      redirectUri,
      token,
    }: {
      provider: string
      redirectUri: string
      token: string
    }) => {
      const response = await basicAxios.post(`/oauth/sign-in/${provider}`, {
        redirectUri,
        token,
      })

      return response.data
    },
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data
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

      queryClient.setQueryData(['user'], user) // 쿼리 캐시에 유저 정보 저장
      setUser(user) // Zustand 스토어에 유저 정보 저장

      router.replace('/forms')
    },
    onError: (error) => {
      // if error.status === 403
      console.error('error: ', error)
      router.push('/user/sign-up')
    },
  })

  // 구글 로그인하고 토큰 리턴
  // const getGoogleToken = useMutation({
  //   mutationFn: async () => {
  //     const result = await signInWithPopup(auth, provider)
  //     const credentials = await GoogleAuthProvider.credentialFromResult(result)
  //     const accessToken = String(credentials?.accessToken)
  //     const user = result.user
  //     const operationType = result.operationType
  //     return { accessToken, user, operationType }
  //   },
  // })

  const getKakaoToken = useMutation({
    mutationFn: async ({
      authorizeCode,
    }: {
      authorizeCode: string
      redirect: string
    }) => {
      // client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      // redirect_uri: 'http://124.59.38.46:3000/user/sign-in/oauth',

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        qs.stringify({
          grant_type: 'authorization_code',
          client_id: '5a62365f145152b3d34c8c44994671c1',
          redirect_uri: `http://localhost:3000/user/sign-in/oauth`,
          code: authorizeCode,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      console.log(response)
      console.log(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID)
      console.log(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI)
      // const { access_token: accessToken, refresh_token: refreshToken } =
      //   tokenResponse.data
      // return { accessToken, refreshToken }
      return response.data.access_token
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['kakaoCredentials'], data.accessToken)
    },
  })

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

  return {
    oauthSignUp: signUpAlbaformWithExternalToken,
    oauthSignIn: signInAlbaformWithExternalToken,
    isWatingKakao: signInAlbaformWithExternalToken.isPending,
    // signInGoogle: getGoogleToken,
    getKakaoToken,
  }
}
