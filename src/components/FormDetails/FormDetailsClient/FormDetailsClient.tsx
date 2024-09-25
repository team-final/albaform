'use client'

import FloatingButton from '@/components/FloatingButton/FloatingButton'
import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import MainButton from '@/components/MainButton/MainButton'
import Toastify from '@/components/Toastify/Toastify'
import {
  useFormDetailsQuery,
  useFormScrapDeleteMutation,
  useFormScrapMutation,
  useUsersMeQuery,
} from '@/lib/queries/formDetailsQuery'
// import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import CurrentApplicationPopup from '../CurrentApplicationPopup/CurrentApplicationPopup'
import ImageSlider from '../ImageSlider/ImageSlider'
import styles from './FormDetailsClient.module.scss'

interface FormDetailsClientProps {
  formId: number
}

declare global {
  interface Window {
    Kakao: any
  }
}

const FormDetailsClient: React.FC<FormDetailsClientProps> = ({ formId }) => {
  // const router = useRouter()
  const { data: userRole } = useUsersMeQuery()
  const { data: formDetails } = useFormDetailsQuery(Number(formId))
  const { mutate: scrapForm, isPending: isScrapLoading } =
    useFormScrapMutation()
  const { mutate: scrapDeleteForm, isPending: isDeleteLoading } =
    useFormScrapDeleteMutation()
  const [isScrapped, setIsScrapped] = useState(formDetails?.isScrapped || false)
  const [scrapCount, setScrapCount] = useState(0)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [showFirstButton, setShowFirstButton] = useState(false)
  const [showSecondButton, setShowSecondButton] = useState(false)
  const isRecruitmentActive =
    formDetails?.recruitmentEndDate &&
    new Date(formDetails.recruitmentEndDate) > new Date()
  const firstImageUrl = formDetails?.imageUrls?.[0]

  useEffect(() => {
    if (formDetails) {
      setIsScrapped(formDetails.isScrapped)
      setScrapCount(formDetails.scrapCount)
    }
  }, [formDetails]) // IsScrapped랑 ScrapCount 값 업데이트

  useEffect(() => {
    setIsPopupVisible(true)
  }, []) // 팝업 렌더링 될 때 보이게

  useEffect(() => {
    if (isMenuVisible) {
      setShowFirstButton(true)
      const timer = setTimeout(() => {
        setShowSecondButton(true)
      }, 70)
      return () => clearTimeout(timer)
    } else {
      setShowFirstButton(false)
      setShowSecondButton(false)
    }
  }, [isMenuVisible]) // 플로팅 메뉴 순차적으로

  const handleApplyClick = () => {
    // router.push(`form/${formId}/apply`)
  }

  const handleShowApplicationHistory = () => {
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

  const handleBookmarkClick = () => {
    setScrapCount((prevCount) => prevCount + 1)

    scrapForm(formId, {
      onSuccess: () => {
        setIsScrapped(true)
        toast.success('스크랩 하였습니다!')
      },
      onError: () => {
        setIsScrapped(false)
        setScrapCount((prevCount) => prevCount - 1)
        toast.error('스크랩에 실패하였습니다!')
      },
    })
  }

  const handleBookmarkDeleteClick = () => {
    setScrapCount((prevCount) => prevCount - 1)

    scrapDeleteForm(formId, {
      onSuccess: () => {
        setIsScrapped(false)
        toast.success('스크랩을 취소하였습니다!')
      },
      onError: () => {
        setIsScrapped(true)
        setScrapCount((prevCount) => prevCount + 1)
        toast.error('스크랩 취소에 실패하였습니다!')
      },
    })
  }

  const handletoggleMenuClick = () => {
    setIsMenuVisible((prev) => !prev)
  }

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('주소 복사 성공!')
  }

  const kakaoShareClick = () => {
    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendCustom({
        templateId: 112519,
        templateArgs: {
          img: firstImageUrl,
          title: formDetails.title,
          description: formDetails.description,
        },
      })
    } else {
      console.error('Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.')
    }
  }

  return (
    <div className={styles['form-details-client']}>
      <Toastify />
      <CurrentApplicationPopup
        formDetails={formDetails}
        isVisible={isPopupVisible}
      />
      <ImageSlider formDetails={formDetails} />
      <div className={styles['job-details-container']}>
        <div className={styles['job-details-content']}>
          <section className={styles['job-details-info']}>
            <FormDetailsInfo formDetails={formDetails} count={scrapCount} />
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

        <div className={styles['floating-button-container']}>
          {isScrapped ? (
            <FloatingButton
              mode="bookmark"
              onClick={handleBookmarkDeleteClick}
              disabled={isDeleteLoading}
            >
              <FloatingButton.Icon
                src="/icons/ic-bookmark.svg"
                altText="북마크"
              />
            </FloatingButton>
          ) : (
            <FloatingButton
              mode="bookmark"
              onClick={handleBookmarkClick}
              disabled={isScrapLoading}
            >
              <FloatingButton.Icon
                src="/icons/ic-bookmark-fill.svg"
                altText="북마크 취소"
              />
            </FloatingButton>
          )}

          <FloatingButton onClick={handletoggleMenuClick}>
            <FloatingButton.Icon
              src="/icons/ic-share2.svg"
              altText="공유"
              width={24}
              height={24}
            />
          </FloatingButton>

          {isMenuVisible && (
            <div
              className={`${styles['floating-menu-container']} ${isMenuVisible ? styles.visible : ''}`}
            >
              {showFirstButton && (
                <FloatingButton mode="bookmark" onClick={kakaoShareClick}>
                  <FloatingButton.Icon
                    src="/icons/ic-logo-kakao2.svg"
                    altText="카카오 공유"
                    width={24}
                    height={24}
                  />
                </FloatingButton>
              )}
              {showSecondButton && (
                <FloatingButton mode="bookmark" onClick={copyURL}>
                  <FloatingButton.Icon
                    src="/icons/ic-copy.svg"
                    altText="주소 복사"
                    width={24}
                    height={24}
                  />
                </FloatingButton>
              )}
            </div>
          )}
        </div>

        <div className={styles['button-container']}>
          {userRole === 'APPLICANT' ? (
            <>
              <MainButton
                buttonStyle="solid"
                disabled={!isRecruitmentActive}
                onClick={handleApplyClick}
              >
                <MainButton.Icon
                  src="/icons/ic-writing.svg"
                  altText="지원하기"
                />
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
    </div>
  )
}

export default FormDetailsClient
