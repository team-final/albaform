'use client'

import { useUsersMeQuery } from '@/lib/queries/formDetailsQuery'
import { ContactInfoProps } from '@/lib/types/formTypes'
import { formatDate } from '@/lib/utils/dateFormatters'
import { formatPhoneNumber } from '@/lib/utils/formatDate'
import { useEffect, useState } from 'react'

import ActionButtons from '../ActionButtons/ActionButtons'
import styles from './ContactInfo.module.scss'

export default function ContactInfo({
  formDetails,
}: {
  formDetails: ContactInfoProps
}) {
  const { data: userRole } = useUsersMeQuery()
  const recruitmentStartDate = formatDate.toKorean(
    formDetails?.recruitmentStartDate,
  )
  const recruitmentEndDate = formatDate.toKorean(
    formDetails?.recruitmentEndDate,
  )
  const isRecruitmentActive =
    Boolean(formDetails?.recruitmentEndDate) &&
    new Date(formDetails.recruitmentEndDate) > new Date()
  const [statusMessage, setStatusMessage] = useState<string>('모집기간 계산 중')
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    if (recruitmentEndDate) {
      const endDate = new Date(recruitmentEndDate)
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      const days = Math.ceil(difference / (1000 * 3600 * 24))

      if (typeof days === 'number' && days <= -1) {
        setStatusMessage('모집 완료')
      } else {
        setStatusMessage(`D-${days}`)
      }
    }
  }, [recruitmentEndDate])

  const handleResize = () => {
    setIsTablet(window.innerWidth < 1024)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className={styles['contact-info']}>
      <div className={styles['contact-info-container']}>
        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-line']}`}
        >
          <div className={styles['contact-info-wrapper']}>
            <h3 className={styles['contact-info-title']}>모집기간</h3>
            <span className={styles['contact-info-date']}>{statusMessage}</span>
          </div>
          <p className={styles['contact-info-content']}>
            {recruitmentStartDate} ~ {recruitmentEndDate}
          </p>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-line']}`}
        >
          <h3 className={styles['contact-info-title']}>가게 전화번호</h3>
          <p className={styles['contact-info-content']}>
            {formatPhoneNumber(formDetails?.storePhoneNumber)}
          </p>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-no-line']}`}
        >
          <h3 className={styles['contact-info-title']}>사장님 전화번호</h3>
          <p className={styles['contact-info-content']}>
            {formatPhoneNumber(formDetails?.phoneNumber)}
          </p>
        </div>
      </div>

      <div className={styles['button-container']}>
        {!isTablet && (
          <ActionButtons
            userRole={userRole}
            isRecruitmentActive={isRecruitmentActive}
            formId={formDetails?.id}
            ownerId={formDetails?.ownerId}
          />
        )}
      </div>
    </section>
  )
}
