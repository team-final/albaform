'use client'

import AnnouncementInfo from '@/components/FormDetails/AnnouncementInfo/AnnouncementInfo'
import ApplicationStatus from '@/components/FormDetails/ApplicationStatus/ApplicationStatus'
import ImageSlider from '@/components/FormDetails/ImageSlider/ImageSlider'
import { useListApplicationDetailsQuery } from '@/lib/queries/applicationDetailsQuery'
import { useFormDetailsQuery } from '@/lib/queries/formDetailsQuery'
import { Params } from '@/lib/types/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './page.module.scss'

// 여긴 사장이 지원 상세 조회 / 상세 수정

export default function ApplicationDetailsPage({ params }: Params) {
  const { formId } = params
  const { data: formDetails } = useFormDetailsQuery(Number(formId))
  const [scrapCount, setScrapCount] = useState(0)
  const [applicationCount, setApplicationCount] = useState(0)
  const { applicationId } = params
  const { data: applicationDetails } = useListApplicationDetailsQuery(
    Number(applicationId),
  )

  useEffect(() => {
    if (formDetails) {
      setScrapCount(formDetails.scrapCount)
      setApplicationCount(formDetails.applyCount)
    }
  }, [formDetails])

  return (
    <>
      <div className={styles['application-details']}>
        <section className={styles['application-details-image']}>
          <ImageSlider formDetails={formDetails} noImageHeight={0} />
        </section>

        <div className={styles['application-details-info']}>
          <h1 className={styles['application-details-title']}>
            {formDetails?.title}
          </h1>

          <section className={styles['application-details-info-form']}>
            <AnnouncementInfo formDetails={formDetails} />

            <div>
              <div className={styles['job-details-header-container']}>
                <div className={styles['job-details-header']}>
                  <h2 className={styles['job-details-name']}>코드잇</h2>
                  <div className={styles['job-details-summary']}>
                    <span>서울 종로구</span>
                    <span>경력 무관</span>
                  </div>
                </div>

                <h1 className={styles['job-details-title']}>
                  {formDetails?.title}
                </h1>
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
                  <p className={styles['auth-content']}>{scrapCount}회</p>
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
                    현재까지 {applicationCount}명이 알바폼에 지원했어요!
                  </p>
                </div>
              </div>

              <p className={styles['job-details-description']}>
                {formDetails?.description}
              </p>
            </div>
          </section>

          <section className={styles['application-details-info-status']}>
            <ApplicationStatus
              formId={Number(formId)}
              formDetails={formDetails}
              applicationId={Number(applicationId)}
            />
          </section>
        </div>
      </div>

      <div>
        <h1 className={styles['application-details']}>제출 내용</h1>
        <div className={styles['application-details-container']}>
          <h2>이름</h2>
          <span>{applicationDetails?.name}</span>
        </div>
        <div className={styles['application-details-container']}>
          <h2>연락처</h2>
          <span>{applicationDetails?.phoneNumber}</span>
        </div>
        <div className={styles['application-details-container']}>
          <h2>경력</h2>
          <span>{applicationDetails?.experienceMonths}</span>
        </div>
        <div className={styles['application-details-container-column']}>
          <h2>이력서</h2>
          <span>{applicationDetails?.resumeName}</span>
        </div>
        <div className={styles['application-details-container-column']}>
          <h2>자기소개</h2>
          <span>{applicationDetails?.introduction}</span>
        </div>
      </div>
    </>
  )
}
