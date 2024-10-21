import { useUserStore } from '@/lib/stores/userStore'
import { CurrentApplicationProps } from '@/lib/types/formTypes'
import Image from 'next/image'
import { useState } from 'react'

import styles from './CurrentApplicationPopup.module.scss'

export default function CurrentApplicationPopup({
  formDetails,
  isVisible,
  modalOpen,
}: {
  formDetails: CurrentApplicationProps
  isVisible: boolean
  modalOpen: () => void
}) {
  const user = useUserStore.getState().user
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const handlePopupCloseClick = () => {
    setIsClosing(true)
  }

  const showApplications =
    user?.id === formDetails?.ownerId ? (
      <button
        type={'button'}
        onClick={modalOpen}
        className={styles['show-applications']}
      >
        지원목록 보기
      </button>
    ) : (
      false
    )

  if (formDetails?.applyCount <= 0) return null

  return (
    <div
      className={`${styles['popup-container']} ${isClosing ? styles.closing : ''} ${
        isVisible ? styles['slide-in'] : ''
      }`}
    >
      <div className={styles['popup-img-container']}>
        <Image
          src="/icons/ic-user.svg"
          alt="사용자"
          width={36}
          height={36}
          className={styles['popup-image']}
        />
        <span className={styles['popup-current-application']}>
          현재&nbsp;
          <span
            className={`${styles['popup-current-application']} ${styles.count}`}
          >
            {formDetails?.applyCount}
          </span>
          명이 지원했어요!
        </span>
        {showApplications}
      </div>
      <button
        className={styles['popup-close-button']}
        onClick={handlePopupCloseClick}
      >
        <Image
          src="/icons/ic-X.svg"
          alt="닫기"
          width={36}
          height={36}
          className={styles['popup-close-img']}
        />
      </button>
    </div>
  )
}
