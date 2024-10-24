'use client'

import useOauth from '@/hooks/auth/useOauth'
import useHydration from '@/hooks/useHydration'
import handleError from '@/lib/utils/errorHandler'
import { useSearchParams } from 'next/navigation'
import process from 'process'
import { Suspense, useCallback, useEffect, useRef } from 'react'

function KakaoSignInHandler() {
  const isHydrated = useHydration()
  const { oauthSignIn } = useOauth()
  const responseParams = useSearchParams()
  const codeRef = useRef<string | undefined>(undefined)

  const authorizeCode = responseParams.get('code')
  const errorMessage = {
    title: responseParams.get('error'),
    message: responseParams.get('error_description'),
  }

  if (errorMessage) handleError(errorMessage)

  const hanldeKakaoSignIn = useCallback(
    async (authorizeCode: string | undefined) => {
      await oauthSignIn.mutateAsync({
        provider: 'kakao',
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI,
        token: authorizeCode,
      })
      console.log('useCallback')
    },
    [oauthSignIn],
  )

  useEffect(() => {
    if (isHydrated && authorizeCode) {
      codeRef.current = authorizeCode
      hanldeKakaoSignIn(codeRef.current)
      console.log('useEffect')
    }
  }, [isHydrated, authorizeCode, hanldeKakaoSignIn])

  return (
    <>
      <div>please waiting...</div>
    </>
  )
}

export default function OAuthSignInPage() {
  return (
    <Suspense fallback={<div>please waiting...</div>}>
      <KakaoSignInHandler />
    </Suspense>
  )
}
