import ApplicationStatus from '@/components/FormDetails/ApplicationStatus/ApplicationStatus'
import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import Image from 'next/image'

import styles from './page.module.scss'

export default function FormDetailsPage() {
  return (
    <div className={styles['job-details']}>
      <Image
        src="/icons/ic-plus.svg"
        alt="기본 이미지"
        className={styles['job-details-img']}
        width={100}
        height={30}
      />
      <div className={styles['job-details-container']}>
        <div className={styles['job-details-content']}>
          <div className={styles['job-details-info']}>
            <FormDetailsInfo />
          </div>
          <div className={styles['schedule-contact-container']}>
            <WorkScheduleInfo />
            <ContactInfo />
            <ApplicationStatus />
          </div>
        </div>

        <div className={styles['location-requirements-container']}>
          <div className={styles['location-info']}>
            <Location />
          </div>
          <div className={styles['requirements-info']}>
            <Requirements />
          </div>
        </div>

        <div className={styles['button-container']}>
          <button>지원하기</button>
          <button>내 지원 내역 보기</button>
        </div>
      </div>
    </div>
  )
}
