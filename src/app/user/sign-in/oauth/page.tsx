'use client'

import useOauth from '@/hooks/auth/useOauth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function OAuthHandler() {
  // 카카오
  const router = useRouter()
  const { oauthSignIn, isWatingKakao } = useOauth()
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code')

  // const errorMessage = {
  //   title: responseParams.get('error') || undefined,
  //   message: responseParams.get('error_description') || undefined,
  // }
  // const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      if (authorizeCode && responseParams) {
        if (!isWatingKakao) {
          const result = await oauthSignIn.mutateAsync({
            token: String(authorizeCode),
            provider: 'kakao',
            redirectUri: `http://localhost:3000/user/sign-in/oauth`,
          })
          if (result.status === 200) {
            router.replace('/forms')
          }
          if (result.status === 403) {
            router.replace('/user/sign-up')
          }
        }
      }
    }
    if (authorizeCode && responseParams && !isWatingKakao) {
      fetchToken().then()
    }
  }, [])

  // if (errorMessage) handleError(errorMessage)
  return <>please waiting...</>
}
