'use client'

import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import MainButton from '@/components/MainButton/MainButton'
import { useFormDetailsQuery, useUsersMeQuery } from '@/lib/api/formDetails'
import Image from 'next/image'
import React from 'react'

import styles from './FormDetailsClient.module.scss'

interface FormDetailsClientProps {
  formId: number
}

const FormDetailsClient: React.FC<FormDetailsClientProps> = ({ formId }) => {
  const { data: userRole } = useUsersMeQuery()
  const { data: formDetails } = useFormDetailsQuery(Number(formId))
  console.log(formDetails)
  // 토큰이 없을 때 버튼 어떻게 할지

  const handleApplyClick = () => {}

  return (
    <>
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
            <FormDetailsInfo formDetails={formDetails} />
          </section>
          <section className={styles['schedule-contact-container']}>
            <WorkScheduleInfo formDetails={formDetails} />
            <ContactInfo formDetails={formDetails} />
          </section>
        </div>

        <div className={styles['location-requirements-container']}>
          <section className={styles['location-info']}>
            <Location formDetails={formDetails} />
          </section>
          <section className={styles['requirements-info']}>
            <Requirements formDetails={formDetails} />
          </section>
        </div>

        <div className={styles['button-container']}>
          {userRole === 'APPLICANT' ? (
            <>
              <MainButton
                type="solid"
                disabled={false}
                onClick={handleApplyClick}
              >
                <MainButton.Icon
                  src="/icons/ic-writing.svg"
                  altText="지원하기"
                />
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
      </div>
    </>
  )
}

export default FormDetailsClient
