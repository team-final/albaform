'use client'

import MainButton from '@/components/MainButton/MainButton'
import { useUsersMeQuery } from '@/lib/api/formDetails'
import { FormDetailsProps } from '@/lib/types/types'
import { useEffect, useState } from 'react'

import styles from './ContactInfo.module.scss'

const formateDate = (dateString?: string) => {
  const date = new Date(dateString || new Date())
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const ContactInfo = ({ formDetails }: { formDetails: FormDetailsProps }) => {
  const { data: userRole } = useUsersMeQuery()
  const recruitmentStartDate = formateDate(formDetails?.recruitmentStartDate)
  const recruitmentEndDate = formateDate(formDetails?.recruitmentEndDate)
  const [statusMessage, setStatusMessage] = useState<string>('모집기간 계산 중')

  useEffect(() => {
    if (recruitmentEndDate) {
      const endDate = new Date(recruitmentEndDate)
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      const days = Math.ceil(difference / (1000 * 3600 * 24))

      if (days <= -1) {
        setStatusMessage('모집 완료')
      } else {
        setStatusMessage(`D-${days}`)
      }
    }
  }, [recruitmentEndDate])

  const handleApplyClick = () => {}
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
            {formDetails?.storePhoneNumber}
          </p>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-no-line']}`}
        >
          <h3 className={styles['contact-info-title']}>사장님 전화번호</h3>
          <p className={styles['contact-info-content']}>
            {formDetails?.phoneNumber}
          </p>
        </div>
      </div>

      <div className={styles['button-container']}>
        {userRole === 'APPLICANT' ? (
          <>
            <MainButton
              type="solid"
              disabled={false}
              onClick={handleApplyClick}
            >
              <MainButton.Icon src="/icons/ic-writing.svg" altText="지원하기" />
              <MainButton.Text>지원하기</MainButton.Text>
            </MainButton>
            <MainButton
              type="outline"
              disabled={false}
              onClick={handleApplyClick}
            >
              <MainButton.Icon
                src="/icons/ic-apply-list.svg"
                altText="지원하기"
              />
              <MainButton.Text>내 지원내역 보기</MainButton.Text>
            </MainButton>
          </>
        ) : (
          <>
            <MainButton
              type="solid"
              disabled={false}
              onClick={handleApplyClick}
            >
              <MainButton.Icon src="/icons/ic-edit2.svg" altText="수정하기" />
              <MainButton.Text>수정하기</MainButton.Text>
            </MainButton>
            <MainButton
              type="outline"
              disabled={false}
              onClick={handleApplyClick}
            >
              <MainButton.Icon
                src="/icons/ic-trash-can.svg"
                altText="삭제하기"
              />
              <MainButton.Text>삭제하기</MainButton.Text>
            </MainButton>
          </>
        )}
      </div>
    </section>
  )
}

export default ContactInfo
