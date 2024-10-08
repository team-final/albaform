'use client'

import ApplicationDetails from '@/components/FormDetails/ApplicationDetails/ApplicationDetails'
import MyApplicationModal from '@/components/Modal/MyApplication/MyApplication'
import { Params } from '@/lib/types/types'
import { useState } from 'react'

import styles from '../page.module.scss'

// 여긴 사장이 지원 상세 조회 / 상세 수정

export default function ApplicationDetailsPage({ params }: Params) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  const handleCloseClick = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <MyApplicationModal
        isOpen={isModalOpen}
        isOwner={true}
        applicationId={Number(params.applicationId)}
        onRequestClose={handleCloseClick}
      />
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
