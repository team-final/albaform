'use client'

import ApplicationDetails from '@/components/FormDetails/ApplicationDetails/ApplicationDetails'
import { useUserStore } from '@/lib/stores/userStore'
import { Params } from '@/lib/types/types'
import { useRouter } from 'next/navigation'

import styles from '../page.module.scss'

// 여긴 사장이 지원 상세 조회 / 상세 수정

export default function ApplicationDetailsPage({ params }: Params) {
  const user = useUserStore.getState().user
  const router = useRouter()

  switch (user?.role) {
    case undefined:
      router.replace('/user/sign-in')
      break
    case 'APPLICANT':
      router.back()
  }

  return (
    <>
      <div className={styles['application-details']}>
        <ApplicationDetails
          isApplicationDetailsPage={true}
          params={params}
          isOwner={true}
        />
      </div>
    </>
  )
}
