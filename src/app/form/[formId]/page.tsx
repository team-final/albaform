import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import Image from 'next/image'

import styles from './page.module.scss'

// 정적 생성 함수

const FormDetailsPage = async () => {
  return (
    <main className={styles['job-details']}>
      <Image
        src="/icons/ic-circle-clock.svg"
        alt="기본 이미지"
        className={styles['job-details-img']}
        width={100}
        height={30}
      />
      <div className={styles['job-details-container']}>
        <div className={styles['job-details-content']}>
          <section className={styles['job-details-info']}>
            <FormDetailsInfo />
          </section>
          <section className={styles['schedule-contact-container']}>
            <WorkScheduleInfo />
            <ContactInfo />
          </section>
        </div>

        <div className={styles['location-requirements-container']}>
          <section className={styles['location-info']}>
            <Location />
          </section>
          <section className={styles['requirements-info']}>
            <Requirements />
          </section>
        </div>

        <div className={styles['button-container']}></div>
      </div>
    </main>
  )
}

export default FormDetailsPage
