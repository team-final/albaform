import { UserStore, useUserStore } from '@/lib/stores/userStore'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

/**
 * signOut() 함수를 반환하는 hook
 */

const useSignOut = () => {
  const queryClient = useQueryClient() // Provider 안에서 쿼리 클라이언트 객체를 가져옴
  const setUser = useUserStore((state: UserStore) => state.setUser) // 스토어의 현재 상태를 인자로 받아, 그 상태에서 setUser 메서드를 추출

  const signOut = () => {
    Cookies.remove('accessToken', { path: '/' })
    Cookies.remove('refreshToken', { path: '/' })
    setUser(null)
    queryClient.removeQueries({ queryKey: ['user'] }) // 쿼리 캐시에서 user 쿼리 제거
    window.location.reload() // 페이지 새로고침
  }

  return signOut
}

export default useSignOut
