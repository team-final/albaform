import Image from 'next/image'
import { useState } from 'react'

import styles from './ApplicationStatus.module.scss'

const ApplicationStatus = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleTooltipCloseClick = () => {
    setIsVisible(false)
    console.log(isVisible)
  }

  return (
    <section className={styles['application-status']}>
      <div
        className={`${styles['application-status-info']} ${styles['info-line']}`}
      >
        <div className={styles['application-status-info-wrapper']}>
          <h3 className={styles['info-title']}>지원일시</h3>
          <span className={styles['info-date']}>D-10</span>
        </div>
        <p className={styles['info-content']}>2024년 5월 29일 10:15</p>
      </div>

      <div
        className={`${styles['application-status-info']} ${styles['info-no-line']}`}
      >
        <div className={styles['application-status-button-container']}>
          <h3 className={styles['info-title']}>진행 상태</h3>
          <button className={styles['status-button']}>
            <Image
              src="/icons/ic-edit.svg"
              alt="진행 상태 편집"
              width={36}
              height={36}
            />
          </button>

          <div
            className={`${styles['application-status-tooltip']} ${isVisible ? '' : styles['tooltip-isvisible-false']}`}
          >
            <div className={styles['application-status-tooltip-container']}>
              <Image
                src="/icons/ic-info.svg"
                alt="정보"
                width={36}
                height={36}
                className={styles['stauts-button-image']}
              />
              <span className={styles['application-status-tooltip-text']}>
                알바폼 현재 진행상태를 변경할 수 있어요!
              </span>
            </div>
            <button
              className={styles['status-button']}
              onClick={handleTooltipCloseClick}
            >
              <Image
                src="/icons/ic-X.svg"
                alt="닫기"
                width={36}
                height={36}
                className={styles['stauts-button-image']}
              />
            </button>
          </div>
        </div>
        <p className={styles['info-content']}>면접 대기</p>
      </div>
    </section>
  )
}

export default ApplicationStatus
