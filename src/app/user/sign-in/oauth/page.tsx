'use client'

import useOauth from '@/hooks/auth/useOauth'
import useHydration from '@/hooks/useHydration'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function OAuthHandler() {
  const isHydrated = useHydration()
  // 카카오
  const { oauthSignIn } = useOauth()
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code')

  // const errorMessage = {
  //   title: responseParams.get('error') || undefined,
  //   message: responseParams.get('error_description') || undefined,
  // }
  // const [isFetching, setIsFetching] = useState(false)

  const hanlder = useCallback(
    async (authorizeCode: string) => {
      await oauthSignIn.mutateAsync({
        provider: 'kakao',
        redirectUri: 'http://localhost:3000/user/sign-in/oauth',
        token: String(authorizeCode),
      })
    },
    [oauthSignIn],
  )

  useEffect(() => {
    if (isHydrated && authorizeCode) hanlder(authorizeCode)
  }, [isHydrated, authorizeCode, hanlder])

  // if (errorMessage) handleError(errorMessage)
  return <>please waiting...</>
}
