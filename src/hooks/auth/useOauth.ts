import basicAxios from '@/lib/api/basicAxios'
// import { app } from '@/lib/firebase/clientSDK'
import { useUserStore } from '@/lib/stores/userStore'
import { UserRole } from '@/lib/types/userTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
      const { accessToken: albaformAccessToken } = response.data as {
        accessToken: string | undefined
      }
      if (!albaformAccessToken) {
        throw new Error('Albaform Access token is undefined') // undefined 처리
      }
      return response.data
    },
    // onError: (error: AxiosError) => {
    //   handleError(error, SIGN_UP_ERROR_MESSAGE)
    // },
  })

  // 알바폼 로그인
  const signInAlbaformWithExternalToken = useMutation({
    mutationFn: async ({
      provider,
      redirectUri,
      token,
    }: {
      provider: string
      redirectUri?: string
      token: string
    }) => {
      const response = await basicAxios.post(`/oauth/sign-in/${provider}`, {
        token,
        redirectUri,
      })
      if (response.status === 403) {
        router.push('/user/sign-up')
      }
      if (response.status === 204) {
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
      }
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user) // 쿼리 캐시에 유저 정보 저장
      setUser(user) // Zustand 스토어에 유저 정보 저장
    },
    // onError: (error) => {
    //   if error.status === 403
    // },
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

  // 카카오 로그인 설정
  const appKey = process.env.NEXT_PUBLIC_KAKAO_APPKEY
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

  // localhost, netlify에서 카카오 인증 서버로 카카오 로그인 요청
  // redirectUri로 인가 코드 전달
  const openKakaoLogin = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`,
      )
      window.location.href = response.headers.Location
      // router.replace(response.headers.Location)
      // let authorizeCode
      // if (response.status === 302) {
      //   const location = String(response.headers.Location)
      //   const urlParams = new URLSearchParams(location?.split('?')[1])
      //   authorizeCode = urlParams.get('code') || undefined
      //   const errorMessage = {
      //     title: urlParams.get('error') || undefined,
      //     message: urlParams.get('error_description') || undefined,
      //   }
      //   if (errorMessage) handleError(errorMessage)
      //   router.prefetch(location)
      //   router.replace(location)
      //   return authorizeCode
      //   }
      // },
      // onSuccess: (data) => {
      //   queryClient.setQueryData(['kakaoAuthorizeCode'], data)
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
    openKakaoLogin,
    isOpeningKakao: openKakaoLogin.isPending,
    getKakaoToken,
  }
}
