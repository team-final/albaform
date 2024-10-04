import {
  useListApplicationDetailsQuery,
  useMyApplicationQuery,
} from '@/lib/queries/applicationDetailsQuery'
import {
  FORM_STATUS,
  FormDetailsProps,
  FormStatusType,
} from '@/lib/types/formTypes'
import { formatApplicationDate, formatKoreanDate } from '@/lib/utils/formatDate'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import styles from './ApplicationStatus.module.scss'

interface ApplicationDetailsProps {
  formId?: number
  formDetails: FormDetailsProps
  applicationId?: number
  isOwner: boolean
}

export default function ApplicationStatus({
  formId,
  formDetails,
  applicationId,
  isOwner,
}: ApplicationDetailsProps) {
  const { data: myApplication } = useMyApplicationQuery(Number(formId), {
    enabled: !isOwner,
  })
  const { data: ownerApplication } = useListApplicationDetailsQuery(
    Number(applicationId),
    { enabled: isOwner },
  )
  const [isVisible, setIsVisible] = useState(true)
  const [datestatusMessage, setDateStatusMessage] = useState<string>('계산 중')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const recruitmentEndDate = formatKoreanDate(formDetails?.recruitmentEndDate)

  const application = isOwner ? ownerApplication : myApplication
  const applicationDate = formatApplicationDate(application?.createdAt)

  const handleTooltipCloseClick = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    if (recruitmentEndDate) {
      const endDate = new Date(recruitmentEndDate)
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      const days = Math.ceil(difference / (1000 * 3600 * 24))

      if (days <= -1) {
        setDateStatusMessage('지원 마감')
      } else {
        setDateStatusMessage(`D-${days}`)
      }
    }
  }, [recruitmentEndDate])

  useEffect(() => {
    const currentStatus = application?.status

    if (currentStatus && FORM_STATUS[currentStatus as FormStatusType]) {
      setStatusMessage(FORM_STATUS[currentStatus as FormStatusType])
    } else {
      setStatusMessage('알 수 없음')
    }
  }, [application?.status])

  return (
    <section className={styles['application-status']}>
      <div
        className={`${styles['application-status-info']} ${styles['info-line']}`}
      >
        <div className={styles['application-status-info-wrapper']}>
          <h3 className={styles['info-title']}>지원일시</h3>
          <span className={styles['info-date']}>{datestatusMessage}</span>
        </div>
        <p className={styles['info-content']}>{applicationDate}</p>
      </div>

      <div
        className={`${styles['application-status-info']} ${styles['info-no-line']}`}
      >
        <div className={styles['application-status-button-container']}>
          <h3 className={styles['info-title']}>진행 상태</h3>
          {isOwner && (
            <>
              <button className={styles['status-button']}>
                <Image
                  src="/icons/ic-edit.svg"
                  alt="진행 상태 편집"
                  width={36}
                  height={36}
                />
              </button>

              <div
                className={`${styles['application-status-tooltip']} ${isVisible ? '' : styles['tooltip-isvisible-false']}`}
              >
                <div className={styles['application-status-tooltip-container']}>
                  <Image
                    src="/icons/ic-info.svg"
                    alt="정보"
                    width={36}
                    height={36}
                    className={styles['stauts-button-image']}
                  />
                  <span className={styles['application-status-tooltip-text']}>
                    알바폼 현재 진행상태를 변경할 수 있어요!
                  </span>
                </div>
                <button
                  className={styles['status-button']}
                  onClick={handleTooltipCloseClick}
                >
                  <Image
                    src="/icons/ic-X.svg"
                    alt="닫기"
                    width={36}
                    height={36}
                    className={styles['stauts-button-image']}
                  />
                </button>
              </div>
            </>
          )}
        </div>

        <p className={styles['info-content']}>
          {statusMessage || '상태를 가져오는 중'}
        </p>
      </div>
    </section>
  )
}
