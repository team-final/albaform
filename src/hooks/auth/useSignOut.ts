import { useUserStore } from '@/lib/stores/userStore'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

/**
 * signOut() 함수를 반환하는 hook
 */
export default function useSignOut() {
  const queryClient = useQueryClient() // Provider 안에서 쿼리 클라이언트 객체를 가져옴
  const router = useRouter()
  const { setUser } = useUserStore()
  const clearUserStorage = useUserStore.persist.clearStorage

  const signOut = () => {
    Cookies.remove('accessToken', { path: '/' })
    Cookies.remove('refreshToken', { path: '/' })
    queryClient.removeQueries({ queryKey: ['user'] }) // 쿼리 캐시에서 user 쿼리 제거
    clearUserStorage()
    setUser(undefined)
    router.push('/')
    if (typeof document !== 'undefined') {
      toast.success('로그아웃되었습니다.')
    }
  }

  return signOut
}
