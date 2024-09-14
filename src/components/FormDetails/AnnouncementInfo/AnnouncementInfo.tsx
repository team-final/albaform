import styles from './AnnouncementInfo.module.scss'

const AnnouncementInfo = () => {
  return (
    <section className={styles['announcement-info']}>
      <div className={styles['announcement-info-status']}>
        <span className={styles['status-auth']}>공개</span>
        <span className={styles['status-auth']}>모집중</span>
      </div>

      <p className={styles['announcement-info-date']}>
        2024.09.07 12:30:54 등록
      </p>
    </section>
  )
}

export default AnnouncementInfo
