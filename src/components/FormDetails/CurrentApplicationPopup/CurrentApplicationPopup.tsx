import { FormDetailsProps } from '@/lib/types/types'
import Image from 'next/image'
import { useState } from 'react'

import styles from './CurrentApplicationPopup.module.scss'

const CurrentApplicationPopup = ({
  formDetails,
  isVisible,
}: {
  formDetails: FormDetailsProps
  isVisible: boolean
}) => {
  const [isClosing, setIsClosing] = useState(false)

  const handlePopupCloseClick = () => {
    setIsClosing(true)
  }

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
        <span className={styles['poopup-current-application']}>
          현재{' '}
          <span
            className={`${styles['poopup-current-application']} ${styles.count}`}
          >
            {formDetails?.applyCount}
          </span>
          명이 지원했어요!
        </span>
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

export default CurrentApplicationPopup
