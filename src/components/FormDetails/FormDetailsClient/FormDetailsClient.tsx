'use client'

import FloatingButton from '@/components/Button/FloatingButton/FloatingButton'
import MainButton from '@/components/Button/MainButton/MainButton'
import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import AlertModal from '@/components/Modal/Alert/AlertModal'
import ListApplicationsModal from '@/components/Modal/ListApplications/ListApplications'
import Toastify from '@/components/Toastify/Toastify'
import {
  useDeleteFormQuery,
  useFormDetailsQuery,
  useFormScrapDeleteMutation,
  useFormScrapMutation,
  useUsersMeQuery,
} from '@/lib/queries/formDetailsQuery'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const { data: userRole } = useUsersMeQuery()
  const { data: formDetails } = useFormDetailsQuery(Number(formId))
  const { mutate: scrapForm, isPending: isScrapLoading } =
    useFormScrapMutation()
  const { mutate: scrapDeleteForm, isPending: isDeleteLoading } =
    useFormScrapDeleteMutation()
  const { mutate: deleteForm } = useDeleteFormQuery()
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasModalBeenOpened, setHasModalBeenOpened] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (formDetails) {
      setIsScrapped(formDetails.isScrapped)
      setScrapCount(formDetails.scrapCount)
    }
  }, [formDetails]) // IsScrapped랑 ScrapCount 값 업데이트

  useEffect(() => {
    setIsPopupVisible(true)
    if (formDetails?.recruitmentEndDate) {
      const endDate = new Date(formDetails?.recruitmentEndDate)
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      const days = Math.ceil(difference / (1000 * 3600 * 24))
      if (days <= -1) {
        setIsModalOpen(true)
        setHasModalBeenOpened(true)
      }
    }
  }, [isRecruitmentActive, hasModalBeenOpened, formDetails?.recruitmentEndDate]) // 팝업 렌더링 될 때 보이게 & 모집 마감 된 폼 -> 모달 띄움

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
    router.push(`form/${formId}/apply`)
  }

  const handleShowApplicationHistory = () => {
    router.push(`/form/${formId}/application`)
    // 지원자 -> 제출 내용 보기
  }

  const handleEditClick = () => {
    router.push(`form/${formId}/edit`)
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
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

  const handleConfirm = () => {
    router.push('/')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    deleteForm(Number(formDetails?.id), {
      onSuccess: () => {
        router.push('/')
        // 페이지네이션 목록으로 가기
      },
      onError: () => {
        console.log('폼 삭제에 실패했습니다.')
      },
    })
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <div className={styles['form-details-client']}>
        <Toastify />
        <CurrentApplicationPopup
          formDetails={formDetails}
          isVisible={isPopupVisible}
        />
        <ImageSlider formDetails={formDetails} noImageHeight={100} />
        {isModalOpen && (
          <AlertModal
            AlertmodalType="done"
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            onConfirm={handleConfirm}
          />
        )}
        {isDeleteModalOpen && (
          <AlertModal
            AlertmodalType="delete"
            isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            onConfirm={handleDeleteConfirm}
          />
        )}
        {userRole === 'OWNER' && <ListApplicationsModal />}
        <div className={styles['job-details-container']}>
          <div className={styles['job-details-content']}>
            <section className={styles['job-details-info']}>
              <FormDetailsInfo
                formDetails={formDetails}
                count={scrapCount}
                showAdditionalInfo={true}
              />
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
              <div className={styles['owner-button-container']}>
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
                  <MainButton.Text className={styles['button-hide-text']}>
                    삭제하기
                  </MainButton.Text>
                </MainButton>
                <MainButton
                  buttonStyle="solid"
                  disabled={false}
                  onClick={handleEditClick}
                >
                  <MainButton.Icon
                    src="/icons/ic-edit2.svg"
                    altText="수정하기"
                  />
                  <MainButton.Text>수정하기</MainButton.Text>
                </MainButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FormDetailsClient
