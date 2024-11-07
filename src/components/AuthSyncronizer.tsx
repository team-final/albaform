'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useEffect } from 'react'

export default function AuthSyncronizer() {
  const { setUser, setAuthService } = useUserStore.getState()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user') {
        if (event.newValue) {
          // 다른 창에 로그인 업데이트
          const { user, authService } = JSON.parse(event.newValue)
          setUser(user)
          setAuthService(authService)
        } else {
          // 다른 창에 로그아웃 업데이트
          setUser(undefined)
          setAuthService(undefined)
        }
      }
    }

    // storage 이벤트 리스너 추가
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [setUser, setAuthService])

  return null
}
