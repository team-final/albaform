import styles from './ApplicationStatus.module.scss'

const ApplicationStatus = () => {
  return (
    <div className={styles['application-status']}>
      <div
        className={`${styles['application-status-info']} ${styles['info-line']}`}
      >
        <div className={styles['application-status-info-wrapper']}>
          <span className={styles['info-title']}>지원일시</span>
          <span className={styles['info-date']}>D-10</span>
        </div>
        <span className={styles['info-content']}>2024년 5월 29일 10:15</span>
      </div>

      <div
        className={`${styles['application-status-info']} ${styles['info-no-line']}`}
      >
        <span className={styles['info-title']}>진행 상태</span>
        <span className={styles['info-content']}>면접 대기</span>
      </div>
    </div>
  )
}

export default ApplicationStatus
