'use client'

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import useSignOut from '@/hooks/auth/useSignOut'
import useHydration from '@/hooks/useHydration'
import { useUserStore } from '@/lib/stores/userStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function KakaoSignOutHandler() {
  const router = useRouter()
  const isHydrated = useHydration()
  const { user, authService } = useUserStore()
  const { signOut } = useSignOut()

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ isHydrated KakaoSignOutHandler:', isHydrated)

    if (isHydrated && router) {
      if (user && authService === 'kakao') {
        signOut().then()
      }
      if (!user) {
        router.push('/user/sign-in')
      }
      if (authService !== 'kakao') {
        router.push('/')
      }
    }
  }, [isHydrated, user, authService, router])

  return <LoadingSpinner full />
}
