'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useRouter } from 'next/navigation'

export default function CreatedFormsPage() {
  const user = useUserStore.getState().user
  const router = useRouter()

  switch (user?.role) {
    case undefined:
      router.replace('/user/sign-in')
      break
    case 'APPLICANT':
      router.replace('/')
      break
  }

  return <></>
}
