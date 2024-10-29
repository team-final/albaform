'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

/**
 * signOut() 함수를 반환하는 hook
 */
export default function useSignOut() {
  const queryClient = useQueryClient() // Provider 안에서 쿼리 클라이언트 객체를 가져옴
  const { setUser, setAuthService } = useUserStore()
  const clearUserStorage = useUserStore.persist?.clearStorage

  const signOut = async () => {
    try {
      setUser(undefined)
      setAuthService(undefined)
      queryClient.removeQueries({ queryKey: ['user'] }) // 쿼리 캐시에서 user 쿼리 제거
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
      if (clearUserStorage) {
        clearUserStorage()
      }
      return toast.success('로그아웃되었습니다.')
    } catch (error) {
      console.error(error)
      return toast.error('로그아웃이 정상적으로 처리되지 않았습니다.')
    }
  }

  return { signOut }
}
