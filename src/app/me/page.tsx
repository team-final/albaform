'use client'

import ProtectedContent from '@/app/me/ProtectedContent'
import withAuth from '@/components/HOC/withAuth'

function MyPage() {
  return <ProtectedContent />
}

export default withAuth(MyPage)
