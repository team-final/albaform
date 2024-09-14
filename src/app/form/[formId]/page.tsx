'use client'

import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import MainButton from '@/components/MainButton/MainButton'
import Image from 'next/image'

import styles from './page.module.scss'

export default function FormDetailsPage() {
  const handleApplyClick = () => {
    console.log('클릭')
  }

  return (
    <main className={styles['job-details']}>
      <Image
        src="/icons/ic-plus.svg"
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

        <div className={styles['button-container']}>
          <MainButton type="solid" disabled={false} onClick={handleApplyClick}>
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
        </div>
      </div>
    </main>
  )
}
