import styles from './ApplicationStatus.module.scss'

const ApplicationStatus = () => {
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
        <h3 className={styles['info-title']}>진행 상태</h3>
        <p className={styles['info-content']}>면접 대기</p>
      </div>
    </section>
  )
}

export default ApplicationStatus
