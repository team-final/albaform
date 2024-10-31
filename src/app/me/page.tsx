import MyPageData from '@/components/MyPageData/MyPageData'
import { getUserInfo } from '@/lib/api/getUserInfo'
import { User } from '@/lib/types/userTypes'
import { cookies } from 'next/headers'

export default async function MyPage() {
  const accessToken = cookies().get('accessToken')?.value
  const user: User = await getUserInfo(accessToken)

  if (!accessToken) {
    return <p>Redirecting...</p> // 인증이 없다면 미들웨어가 리다이렉트
  }

  return <MyPageData user={user} />
}
