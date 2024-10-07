import basicAxios from '@/lib/api/basicAxios'
import {
  AUTH_USER_ERROR_MESSAGE,
  SIGN_IN_ERROR_MESSAGE,
  SIGN_UP_ERROR_MESSAGE,
} from '@/lib/data/constants'
import { app } from '@/lib/firebase/clientSDK'
import { useUserStore } from '@/lib/stores/userStore'
import { CompleteOauthSignUpValues, User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
} from 'firebase/auth'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const provider = new GoogleAuthProvider()
const auth = getAuth(app)
auth.languageCode = 'ko'
// auth.useDeviceLanguage()

export default function useGoogleAuth() {
  const queryClient = useQueryClient()
  const { setUser, setUserRole } = useUserStore()

  // 구글 로그인하고 구글 토큰 리턴
  const getGoogleToken = useMutation({
    mutationFn: async () => {
      // 사용자 정보로 구글 앱 팝업 열기 user login & consent
      // Start a sign in process for an unauthenticated user
      const result = await signInWithPopup(auth, provider)
      // After returning from the redirect when your app initializes you can obtain the result
      // 구글 액세스 토큰 받기 authorization code
      const credentials = GoogleAuthProvider.credentialFromResult(result)
      const accessToken = credentials?.accessToken
      const user = result.user
      const operationType = result.operationType
      return { accessToken, user, operationType }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['googleUser'], data) // 구글 user 저장
      console.log('Logged in user:', data.user)
      console.log('Access Token:', data.accessToken)
      getGoogleUser.refetch().then()
    },
    onError: (error: any) => {
      handleError(error, SIGN_IN_ERROR_MESSAGE)
      // 구글 로그인 에러 처리용 변수
      // // The email of the user's account used.
      // const email = error.customData.email
      // // The AuthCredential type that was used.
      // const oathCredential = GoogleAuthProvider.credentialFromError(error)
    },
  })

  // 알바폼 회원가입
  const signUpAlbaformWithExternalToken = useMutation({
    mutationFn: async (
      oauthSignUpValues: CompleteOauthSignUpValues,
    ): Promise<User> => {
      const response = await basicAxios.post(
        '/auth/sign-up/google',
        oauthSignUpValues,
      )
      const {
        user,
        accessToken: albaformAccessToken,
        refreshToken,
      } = response.data

      Cookies.set('accessToken', albaformAccessToken, {
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

  // 알바폼 로그인
  const signInAlbaformWithExternalToken = useMutation({
    mutationFn: async (token: string) => {
      const response = await basicAxios.post('/auth/sign-in/google', {
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
      setUserRole(user.role)
    },
    onError: (error: AxiosError) => {
      handleError(error, SIGN_IN_ERROR_MESSAGE)
    },
  })

  // const getAlbaformUser = useQuery<any, AxiosError>({
  //   queryKey: ['user'],
  //   queryFn: async () => {
  //     const accessToken = signInGoogleGetToken.data?.accessToken
  //     if (!accessToken) throw new Error('No access token')
  //     return signInAlbaformWithExternalToken.mutateAsync(accessToken)
  //   },
  //   enabled: !!signInGoogleGetToken.data?.accessToken, // 토큰이 있을 때만 쿼리 실행
  //   onSuccess: (data: any) => {
  //     queryClient.setQueryData(['user'], data)
  //   },
  //   onError: (error: AxiosError) => {
  //     handleError(error, AUTH_USER_ERROR_MESSAGE)
  //   },
  // } as UseQueryOptions<any, AxiosError>)

  // const createAlbaformUser = useMutation<any, AxiosError, string>({
  //   mutationFn: async () => {
  //     const accessToken = signInGoogleGetToken.data?.accessToken
  //     if (!accessToken) throw new Error('No access token')
  //     // const response =
  //     //   await signUpAlbaformWithExternalToken.mutateAsync(accessToken)
  //     // return response.data
  //     return signUpAlbaformWithExternalToken.mutateAsync(accessToken)
  //   },
  //   // enabled: !!signInGoogle.data?.accessToken, // 토큰이 있을 때만 쿼리 실행
  //   onError: (error: AxiosError) => {
  //     handleError(error)
  //   },
  // })

  const getGoogleUser = useQuery<any, AxiosError>({
    queryKey: ['googleUser'],
    queryFn: async () => {
      const accessToken = getGoogleToken.data?.accessToken
      if (!accessToken) throw new Error('No access token')
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      console.log(response.data)
      return response.data
    },
    enabled: !!getGoogleToken.data?.accessToken, // 토큰이 있을 때만 쿼리 실행
    onSuccess: (data: any) => {
      queryClient.setQueryData(['googleUser'], data)
    },
    onError: (error: AxiosError) => {
      handleError(error, AUTH_USER_ERROR_MESSAGE)
    },
  } as UseQueryOptions<any, AxiosError>)

  // Redirect 결과 처리
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          // const credential = GoogleAuthProvider.credentialFromResult(result)
          // const accessToken = credential?.accessToken
          // const user = result.user

          // 로그인 후 사용자 정보 가져오기
          await getGoogleUser.refetch().then() // 사용자 정보 쿼리 다시 가져오기
        }
      } catch (error) {
        handleError(error, AUTH_USER_ERROR_MESSAGE)
      }
    }
    fetchRedirectResult().then()
  }, [getGoogleUser])

  return {
    signInGoogle: getGoogleToken,
    oauthSignUp: signUpAlbaformWithExternalToken.mutateAsync,
    oauthSignIn: signInAlbaformWithExternalToken.mutateAsync,
    // albaformUser: getAlbaformUser.data,
    // userLoading: getAlbaformUser.isLoading,
    // userError: getAlbaformUser.error,
    // googleUser: getGoogleUser.data,
    // userLoading: getGoogleUser.isLoading,
    // userError: getGoogleUser.error,
  }
}
