'use client'

import MainButton from '@/components/MainButton/MainButton'
import { useUsersMeQuery } from '@/lib/queries/formDetailsQuery'
import { FormDetailsProps } from '@/lib/types/types'
import { formatKoreanDate } from '@/utils/formatDate'
import { useEffect, useState } from 'react'

import styles from './ContactInfo.module.scss'

// import { useRouter } from 'next/navigation'

const ContactInfo = ({ formDetails }: { formDetails: FormDetailsProps }) => {
  // const router = useRouter()
  const { data: userRole } = useUsersMeQuery()
  const recruitmentStartDate = formatKoreanDate(
    formDetails?.recruitmentStartDate,
  )
  const recruitmentEndDate = formatKoreanDate(formDetails?.recruitmentEndDate)
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

  const handleApplyClick = () => {
    console.log('지원하기')
    // router.push(`form/${formId}/apply`)
  }

  const handleShowApplicationHistory = () => {
    console.log('내 지원내역 보기')
    // router.push(`form/${formId}/application/${applicationId}`)
    // 얘는 모달로
  }

  const handleEditClick = () => {
    console.log('수정하기')
    // router.push(`form/${formId}/edit`)
  }

  const handleDeleteClick = () => {
    // 얘는 모달로
  }

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
              onClick={handleShowApplicationHistory}
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
            <MainButton type="solid" disabled={false} onClick={handleEditClick}>
              <MainButton.Icon src="/icons/ic-edit2.svg" altText="수정하기" />
              <MainButton.Text>수정하기</MainButton.Text>
            </MainButton>
            <MainButton
              type="outline"
              disabled={false}
              onClick={handleDeleteClick}
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
