'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useRouter } from 'next/navigation'

export default function MyApplicationsPage() {
  const user = useUserStore.getState().user
  const router = useRouter()

  switch (user?.role) {
    case 'APPLICANT':
      router.back()
      break
    case undefined:
      router.replace('/user/sign-in')
      break
  }

  return <></>
}
