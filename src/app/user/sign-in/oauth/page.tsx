'use client'

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import useSignIn from '@/hooks/auth/useSignIn'
import useHydration from '@/hooks/useHydration'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function KakaoSignInHandler() {
  const isHydrated = useHydration()
  const { oauthSignIn } = useSignIn()
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code') ?? ''
  const router = useRouter()

  const handleKakaoSignIn = useCallback(async () => {
    console.log('🚀 ~ KakaoSignInHandler ~ authorizeCode:', authorizeCode)
    await oauthSignIn.mutateAsync({
      provider: 'kakao',
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI,
      providerToken: authorizeCode,
    })
    router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isHydrated) handleKakaoSignIn().then()
  }, [isHydrated, handleKakaoSignIn])

  return <LoadingSpinner full />
}
