'use client'

import ApplicationDetails from '@/components/FormDetails/ApplicationDetails/ApplicationDetails'
import MyApplicationModal from '@/components/Modal/MyApplication/MyApplication'
import { Params } from '@/lib/types/types'
import { useState } from 'react'

import styles from './page.module.scss'

// 지원자 -> 지원내역 상세보기 페이지 - 이건 토큰 있어야만함

export default function MyApplicationsPage({ params }: Params) {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleCloseClick = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <MyApplicationModal
        isOpen={isModalOpen}
        formId={Number(params.formId)}
        isOwner={false}
        onRequestClose={handleCloseClick}
      />
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
