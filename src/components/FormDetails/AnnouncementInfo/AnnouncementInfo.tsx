import styles from './AnnouncementInfo.module.scss'

const AnnouncementInfo = () => {
  return (
    <div className={styles['announcement-info']}>
      <div className={styles['announcement-info-status']}>
        <span className={styles['status-auth']}>공개</span>
        <span className={styles['status-auth']}>모집중</span>
      </div>

      <span className={styles['announcement-info-date']}>
        2024.09.07 12:30:54 등록
      </span>
    </div>
  )
}

export default AnnouncementInfo
