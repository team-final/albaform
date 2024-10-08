// 사장 -> 지원자 현황 조회
import { useListApplicationsQuery } from '@/lib/queries/applicationDetailsQuery'
import {
  ApplicationProps,
  FORM_STATUS,
  FormStatusType,
} from '@/lib/types/formTypes'
import { formatMonth } from '@/lib/utils/dateFormatters'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReactModal from 'react-modal'

import styles from './ListApplications.module.scss'

interface ListModalProps {
  formId: number
  isOpen: boolean
  onRequestClose: () => void
}

export default function ListApplicationsModal({
  formId,
  isOpen,
  onRequestClose,
}: ListModalProps) {
  const router = useRouter()
  const { data: applicationList } = useListApplicationsQuery(Number(formId))
  const [isExperienceAscending, setIsExperienceAscending] = useState(true)
  const [isStatusAscending, setIsStatusAscending] = useState(true)

  const handleApplicationDetailsClick = (applicationId: number) => {
    router.push(`/form/${formId}/application/${applicationId}`)
  }

  const toggleExperienceSort = () => {
    setIsExperienceAscending(!isExperienceAscending)
  }

  const toggleStatusSort = () => {
    setIsStatusAscending(!isStatusAscending)
  }

  const sortedApplications =
    applicationList?.data &&
    [...applicationList.data]
      .sort((a, b) => {
        // 경력 정렬
        // 경력이 우선순위
        if (isExperienceAscending) {
          return a.experienceMonths - b.experienceMonths
        } else {
          return b.experienceMonths - a.experienceMonths
        }
      })
      .sort((a, b) => {
        // 상태 정렬
        const currentStatusA =
          a.status && FORM_STATUS[a.status as FormStatusType]
        const currentStatusB =
          b.status && FORM_STATUS[b.status as FormStatusType]

        if (isStatusAscending) {
          return currentStatusA > currentStatusB ? 1 : -1
        } else {
          return currentStatusA < currentStatusB ? 1 : -1
        }
      })

  const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles['modal-list-application-content']}
      overlayClassName={styles['modal-list-application-overlay']}
      ariaHideApp={false}
    >
      <div className={styles['list-title-container']}>
        <h1 className={styles['application-status-list']}>지원현황</h1>
        <button
          className={styles['application-details-close']}
          onClick={onRequestClose}
        >
          <Image
            src="/icons/ic-X.svg"
            alt="모달 닫기"
            width={36}
            height={36}
            className={styles['close-img']}
          />
        </button>
      </div>
      <div className={styles['list-description-container']}>
        <div className={styles['application-status-list-title-container']}>
          <div className={styles['name-number']}>
            <span>이름</span>
            <span>전화번호</span>
          </div>
          <div className={styles['month-status']}>
            <span className={styles['status-list-wrapper']}>
              경력
              <button
                className={styles['list-image-button']}
                onClick={toggleExperienceSort}
              >
                <Image
                  src={
                    isExperienceAscending
                      ? '/icons/ic-sort-ascending-outlined.svg'
                      : '/icons/ic-sort-descending-outlined.svg'
                  }
                  alt="정렬"
                  width={36}
                  height={36}
                  className={styles['ascending-img']}
                />
              </button>
            </span>
            <span className={styles['status-list-wrapper']}>
              상태
              <button
                className={styles['list-image-button']}
                onClick={toggleStatusSort}
              >
                <Image
                  src={
                    isStatusAscending
                      ? '/icons/ic-sort-ascending-outlined.svg'
                      : '/icons/ic-sort-descending-outlined.svg'
                  }
                  alt="정렬"
                  width={36}
                  height={36}
                  className={styles['ascending-img']}
                />
              </button>
            </span>
          </div>
        </div>
        <div
          className={styles['application-status-list-description-container']}
        >
          {sortedApplications?.length > 0 ? (
            sortedApplications.map((application: ApplicationProps) => {
              const currentStatus = application.status
              const statusText =
                currentStatus && FORM_STATUS[currentStatus as FormStatusType]
                  ? FORM_STATUS[currentStatus as FormStatusType]
                  : '알 수 없음'

              return (
                <div key={application.id} className={styles['list-map']}>
                  <div className={styles['list-name-number']}>
                    <span
                      className={styles['description-underline']}
                      onClick={() =>
                        handleApplicationDetailsClick(application.id)
                      }
                    >
                      {application.name}
                    </span>
                    <span>{formatPhoneNumber(application.phoneNumber)}</span>
                  </div>

                  <div className={styles['list-month-status']}>
                    <span>
                      {formatMonth.toExperience(application.experienceMonths)}
                    </span>
                    <span>{statusText}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <p>지원자가 없습니다</p>
          )}
        </div>
      </div>
    </ReactModal>
  )
}
