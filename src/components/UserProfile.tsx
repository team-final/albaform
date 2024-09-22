import useAuthUser from '@/hooks/auth/useAuthUser'
import { useUserStore } from '@/lib/stores/userStore'
import { useEffect } from 'react'

const UserProfile = () => {
  const { setUser } = useUserStore()
  const { data: user, error, isLoading } = useAuthUser()

  useEffect(() => {
    if (user) {
      setUser(user) // 사용자 정보가 있을 때 Zustand 스토어에 저장
    } else {
      setUser(null) // 사용자 정보가 없으면 null로 설정
    }
  }, [user, setUser])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user data.</div>

  return (
    <>{user ? <div>Welcome, {user.name}!</div> : <div>Please log in.</div>}</>
  )
}

export default UserProfile
