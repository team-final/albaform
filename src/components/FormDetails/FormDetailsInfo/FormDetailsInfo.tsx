import { CombinedFormDetailsProps } from '@/lib/types/formTypes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import AnnouncementInfo from '../AnnouncementInfo/AnnouncementInfo'
import ContactInfo from '../ContactInfo/ContactInfo'
import WorkScheduleInfo from '../WorkScheduleInfo/WorkScheduleInfo'
import styles from './FormDetailsInfo.module.scss'

export default function FormDetailsInfo({
  formDetails,
  count,
  showAdditionalInfo,
}: {
  formDetails: CombinedFormDetailsProps
  count: number
  showAdditionalInfo: boolean
}) {
  const [applicationStatus, setApplicationStatus] = useState(0)

  useEffect(() => {
    if (formDetails) {
      setApplicationStatus(formDetails.applyCount ?? 0)
    }
  }, [formDetails])

  const getLocationSecondSpace = (location: string) => {
    const secondSpaceIndex = location?.indexOf(' ', location.indexOf(' ') + 1)
    return secondSpaceIndex !== -1
      ? location?.slice(0, secondSpaceIndex)
      : location
  }

  return (
    <section
      className={
        showAdditionalInfo
          ? styles['job-details-info']
          : styles['application-details-info-form']
      }
    >
      <AnnouncementInfo formDetails={formDetails} />

      <div className={styles['job-details-container']}>
        <div className={styles['job-details-header-container']}>
          <div className={styles['job-details-header']}>
            <h2 className={styles['job-details-name']}>
              {formDetails?.storeName}
            </h2>
            <div className={styles['job-details-summary']}>
              <span>{getLocationSecondSpace(formDetails?.location)}</span>
            </div>
          </div>

          <h1 className={styles['job-details-title']}>{formDetails?.title}</h1>
        </div>

        <div className={styles['job-details-status-container']}>
          <div className={styles['job-details-status-auth']}>
            <div className={styles['job-details-auth-item']}>
              <Image
                src="/icons/ic-bookmark.svg"
                alt="스크랩"
                width={36}
                height={36}
                className={styles['job-details-auth-item-img']}
              />
              <h3 className={styles['auth-title']}>스크랩</h3>
            </div>
            <p className={styles['auth-content']}>{count}회</p>
          </div>

          <div className={styles['job-details-status-auth']}>
            <div className={styles['job-details-auth-item']}>
              <Image
                src="/icons/ic-user2.svg"
                alt="기본 이미지"
                width={36}
                height={36}
                className={styles['job-details-auth-item-img']}
              />
              <h3 className={styles['auth-title']}>지원현황</h3>
            </div>
            <p className={styles['auth-content']}>
              현재까지 {applicationStatus}명이 알바폼에 지원했어요!
            </p>
          </div>
        </div>

        {showAdditionalInfo && (
          <div className={styles['tablet-schedule-contact']}>
            <div className={styles['tablet-workschedule-info']}>
              <WorkScheduleInfo formDetails={formDetails} />
            </div>

            <div className={styles['tablet-contact-info']}>
              <ContactInfo formDetails={formDetails} />
            </div>
          </div>
        )}

        <p className={styles['job-details-description']}>
          {formDetails?.description}
        </p>
      </div>
    </section>
  )
}
