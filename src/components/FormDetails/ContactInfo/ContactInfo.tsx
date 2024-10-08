'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import AlertModal from '@/components/Modal/Alert/AlertModal'
import {
  useDeleteFormQuery,
  useUsersMeQuery,
} from '@/lib/queries/formDetailsQuery'
import { ContactInfoProps } from '@/lib/types/formTypes'
import handleError from '@/lib/utils/errorHandler'
import { formatPhoneNumber } from '@/lib/utils/formatDate'
import { formatDate } from '@/lib/utils/dateFormatters'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './ContactInfo.module.scss'

export default function ContactInfo({
  formDetails,
}: {
  formDetails: ContactInfoProps
}) {
  const router = useRouter()
  const { data: userRole } = useUsersMeQuery()
  const { mutate: deleteForm } = useDeleteFormQuery()
  const recruitmentStartDate = formatDate.toKorean(
    formDetails?.recruitmentStartDate,
  )
  const recruitmentEndDate = formatDate.toKorean(
    formDetails?.recruitmentEndDate,
  )
  const isRecruitmentActive =
    formDetails?.recruitmentEndDate &&
    new Date(formDetails.recruitmentEndDate) > new Date()
  const [statusMessage, setStatusMessage] = useState<string>('모집기간 계산 중')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

  const handleApplyClick = () => {
    router.push(`/form/${formDetails.id}/apply`)
  }

  const handleShowApplicationHistory = () => {
    router.push(`/form/${formDetails?.id}/application`)
    // 지원자 -> 제출 내용 보기
  }

  const handleEditClick = () => {
    router.push(`form/${formDetails.id}/edit`)
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirm = () => {
    deleteForm(Number(formDetails?.id), {
      onSuccess: () => {
        router.push('/')
        // 페이지네이션 목록으로 가기
      },
      onError: () => {
        handleError(new Error('폼 삭제 실패'))
      },
    })
  }

  return (
    <section className={styles['contact-info']}>
      {isModalOpen && (
        <AlertModal
          AlertmodalType="delete"
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
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
        {userRole === 'APPLICANT' ? (
          <>
            <MainButton
              buttonStyle="solid"
              disabled={!isRecruitmentActive}
              onClick={handleApplyClick}
            >
              <MainButton.Icon src="/icons/ic-writing.svg" altText="지원하기" />
              <MainButton.Text>지원하기</MainButton.Text>
            </MainButton>
            <MainButton
              buttonStyle="outline"
              disabled={!isRecruitmentActive}
              onClick={handleShowApplicationHistory}
            >
              <MainButton.Icon
                src="/icons/ic-apply-list.svg"
                altText="내 지원내역 보기"
              />
              <MainButton.Text>내 지원내역 보기</MainButton.Text>
            </MainButton>
          </>
        ) : (
          <>
            <MainButton
              buttonStyle="solid"
              disabled={false}
              onClick={handleEditClick}
            >
              <MainButton.Icon src="/icons/ic-edit2.svg" altText="수정하기" />
              <MainButton.Text>수정하기</MainButton.Text>
            </MainButton>
            <MainButton
              buttonStyle="outline"
              disabled={false}
              onClick={handleDeleteClick}
              color="gray"
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
