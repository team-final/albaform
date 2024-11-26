'use client'

import FloatingButton from '@/components/Button/FloatingButton/FloatingButton'
import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import AlertModal from '@/components/Modal/AlertModal/AlertModal'
import ListApplicationsModal from '@/components/Modal/ListApplications/ListApplications'
import {
  useFormDetailsQuery,
  useFormScrapDeleteMutation,
  useFormScrapMutation,
} from '@/lib/queries/formDetailsQuery'
import { useUserStore } from '@/lib/stores/userStore'
import handleError from '@/lib/utils/errorHandler'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import ActionButtons from '../ActionButtons/ActionButtons'
import CurrentApplicationPopup from '../CurrentApplicationPopup/CurrentApplicationPopup'
import ImageSlider from '../ImageSlider/ImageSlider'
import styles from './FormDetailsClient.module.scss'

interface FormDetailsClientProps {
  formId: number
}

export default function FormDetailsClient({ formId }: FormDetailsClientProps) {
  const user = useUserStore.getState().user
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: formDetails, isLoading } = useFormDetailsQuery(Number(formId))
  const { mutate: scrapForm } = useFormScrapMutation()
  const { mutate: scrapDeleteForm } = useFormScrapDeleteMutation()
  const [isScrapPending, setIsScrapPending] = useState<boolean>(false)
  const [isScrapped, setIsScrapped] = useState(formDetails?.isScrapped || false)
  const [scrapCount, setScrapCount] = useState(0)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const isInRecruitPeriod =
    Boolean(formDetails?.recruitmentEndDate) &&
    new Date(formDetails.recruitmentEndDate) > new Date()
  const firstImageUrl = formDetails?.imageUrls?.[0]
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [hasModalBeenOpened, setHasModalBeenOpened] = useState<boolean>(false)
  const [isListApplicationsModalOpen, setIsListApplicationsModalOpen] =
    useState<boolean>(false)

  useEffect(() => {
    if (formDetails) {
      setIsScrapped(formDetails.isScrapped)
      setScrapCount(formDetails.scrapCount)
    }
  }, [formDetails]) // IsScrapped랑 ScrapCount 값 업데이트

  useEffect(() => {
    setIsPopupVisible(true)
    if (formDetails?.recruitmentEndDate) {
      const endDate = new Date(formDetails.recruitmentEndDate)

      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      const days = Math.ceil(difference / (1000 * 3600 * 24))

      if (days <= 0) {
        setIsModalOpen(true)
        setHasModalBeenOpened(true)
      }
    }
  }, [isInRecruitPeriod, hasModalBeenOpened, formDetails?.recruitmentEndDate]) // 팝업 렌더링 될 때 보이게 & 모집 마감 된 폼 -> 모달 띄움

  const handleBookmarkClick = async () => {
    if (isScrapPending) return
    setIsScrapPending(true)

    if (user) {
      setScrapCount((prevCount) => prevCount + 1)
      setIsScrapped(true)

      scrapForm(formId, {
        onSuccess: () => {
          toast.success('스크랩 하였습니다!')
          setIsScrapPending(false)
          queryClient.invalidateQueries()
        },
        onError: () => {
          setIsScrapped(false)
          setScrapCount((prevCount) => prevCount - 1)
          toast.error('스크랩에 실패하였습니다!')
          setIsScrapPending(false)
        },
      })
    } else {
      router.push('/user/sign-in')
    }
  }

  const handleBookmarkDeleteClick = () => {
    if (isScrapPending) return
    setIsScrapPending(true)
    setScrapCount((prevCount) => prevCount - 1)
    setIsScrapped(false)

    scrapDeleteForm(formId, {
      onSuccess: () => {
        toast.success('스크랩을 취소하였습니다!')
        setIsScrapPending(false)
        queryClient.invalidateQueries()
      },
      onError: () => {
        setIsScrapped(true)
        setScrapCount((prevCount) => prevCount + 1)
        toast.error('스크랩 취소에 실패하였습니다!')
        setIsScrapPending(false)
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

  // useEffect(() => {
  //   if (window.Kakao) {
  // if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_APPKEY)
  //   }
  // }, [])

  const kakaoShareClick = () => {
    if (window.kakao && window.kakao.Share) {
      window.kakao.Share.sendCustom({
        // templateId: 112519,
        templateId: 113891,
        templateArgs: {
          img: firstImageUrl,
          title: formDetails.title,
          description: formDetails.description,
          id: formId,
        },
      })
    } else {
      handleError(new Error('Kakao SDK 오류'), {
        title: 'Kakao 공유 실패',
        message: 'Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.',
      })
    }
  }

  const handleConfirm = () => {
    router.push('/')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeListApplicationsModal = () => {
    setIsListApplicationsModalOpen(false)
  }

  if (isLoading) return <LoadingSpinner full />

  return (
    <div className={styles['form-details-client']}>
      <CurrentApplicationPopup
        formDetails={formDetails}
        isVisible={isPopupVisible}
        modalOpen={() => setIsListApplicationsModalOpen(true)}
      />
      <ImageSlider formDetails={formDetails} noImageHeight={100} />

      {isModalOpen && (
        <AlertModal
          contentType="done"
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}

      {user?.id === formDetails?.ownerId && ( // 로그인한 사용자와 조회하는 폼의 작성자 아이디가 같을 때
        <ListApplicationsModal
          formId={formId}
          isOpen={isListApplicationsModalOpen}
          onRequestClose={closeListApplicationsModal}
        />
      )}
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
          {user &&
            (isScrapped ? (
              <FloatingButton
                mode="bookmark"
                onClick={handleBookmarkDeleteClick}
              >
                <FloatingButton.Icon
                  src="/icons/ic-bookmark.svg"
                  altText="북마크"
                />
              </FloatingButton>
            ) : (
              <FloatingButton mode="bookmark" onClick={handleBookmarkClick}>
                <FloatingButton.Icon
                  src="/icons/ic-bookmark-fill.svg"
                  altText="북마크 취소"
                />
              </FloatingButton>
            ))}

          <FloatingButton onClick={handletoggleMenuClick}>
            <FloatingButton.Icon
              src="/icons/ic-share2.svg"
              altText="공유"
              width={24}
              height={24}
            />
          </FloatingButton>

          <div
            className={classNames(styles['floating-menu-container'], {
              [styles.visible]: isMenuVisible,
            })}
          >
            <FloatingButton mode="bookmark" onClick={kakaoShareClick}>
              <FloatingButton.Icon
                src="/icons/ic-logo-kakao2.svg"
                altText="카카오 공유"
                width={24}
                height={24}
              />
            </FloatingButton>
            <FloatingButton mode="bookmark" onClick={copyURL}>
              <FloatingButton.Icon
                src="/icons/ic-copy.svg"
                altText="주소 복사"
                width={24}
                height={24}
              />
            </FloatingButton>
          </div>
        </div>

        <div className={styles['button-container']}>
          <ActionButtons
            // isApplied={isApplied}
            isInRecruitPeriod={isInRecruitPeriod}
            formId={formId}
            ownerId={formDetails?.ownerId}
            formTitle={formDetails?.title}
          />
        </div>
      </div>
    </div>
  )
}
