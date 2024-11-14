'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export default function useSignOut() {
  const queryClient = useQueryClient()
  const { setUser, setAuthService } = useUserStore.getState()

  const signOut = async () => {
    try {
      setUser(undefined)
      setAuthService(undefined)
      Cookies.remove('accessToken', { path: '/' })
      Cookies.remove('refreshToken', { path: '/' })
      queryClient.removeQueries({ queryKey: ['user'] })

      toast.success('로그아웃되었습니다.')
    } catch (error) {
      console.error(error)
      toast.error('정상적으로 로그아웃되지 않았습니다.')
    }
  }

  return { signOut }
}
