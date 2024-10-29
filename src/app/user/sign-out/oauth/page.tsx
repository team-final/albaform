'use client'

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import useSignOut from '@/hooks/auth/useSignOut'
import useHydration from '@/hooks/useHydration'
import { useUserStore } from '@/lib/stores/userStore'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function KakaoSignOutHandler() {
  const router = useRouter()

  const { user, authService } = useUserStore()
  const isHydrated = useHydration()

  if (!user) {
    router.push('/user/sign-in')
  }
  if (authService !== 'kakao') {
    router.push('/')
  }

  const { signOut } = useSignOut()
  const handleSignOut = useCallback(async () => {
    signOut()
  }, [])

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ isHydrated:', isHydrated)
    if (isHydrated) handleSignOut()
  }, [isHydrated, handleSignOut])

  return <LoadingSpinner full />
}
