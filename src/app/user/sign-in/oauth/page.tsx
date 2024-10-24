'use client'

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import useOauth from '@/hooks/auth/useOauth'
import useHydration from '@/hooks/useHydration'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function KakaoSignInHandler() {
  const isHydrated = useHydration()
  const { oauthSignIn } = useOauth()
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code') ?? ''
  const router = useRouter()

  const hanldeKakaoSignIn = useCallback(async () => {
    console.log('🚀 ~ KakaoSignInHandler ~ authorizeCode:', authorizeCode)
    const res = await oauthSignIn.mutateAsync({
      provider: 'kakao',
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI,
      token: authorizeCode,
    })
    router.replace('/')
    console.log('🚀 ~ hanldeKakaoSignIn ~ res:', res)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ isHydrated:', isHydrated)
    if (isHydrated) hanldeKakaoSignIn()
  }, [isHydrated, hanldeKakaoSignIn])

  return <LoadingSpinner full />
}
