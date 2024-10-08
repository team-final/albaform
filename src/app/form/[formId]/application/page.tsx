'use client'

import ApplicationDetails from '@/components/FormDetails/ApplicationDetails/ApplicationDetails'
import { useUserStore } from '@/lib/stores/userStore'
import { Params } from '@/lib/types/types'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

// 지원자 -> 지원내역 상세보기 페이지 - 이건 토큰 있어야만함

export default function MyApplicationsPage({ params }: Params) {
  const user = useUserStore.getState().user
  const router = useRouter()

  switch (user?.role) {
    case undefined:
      router.replace('/user/sign-in')
      return null
  }

  return (
    <>
      <div className={styles['application-details']}>
        <ApplicationDetails
          isApplicationDetailsPage={false}
          params={params}
          isOwner={false}
        />
      </div>
    </>
  )
}
