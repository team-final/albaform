import styles from './ContactInfo.module.scss'

const ContactInfo = () => {
  return (
    <div className={styles['contact-info']}>
      <div className={styles['contact-info-container']}>
        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-line']}`}
        >
          <div className={styles['contact-info-wrapper']}>
            <span className={styles['contact-info-title']}>모집기간</span>
            <span className={styles['contact-info-date']}>D-10</span>
          </div>
          <span className={styles['contact-info-content']}>
            2024.05.04 ~ 2024.05.17
          </span>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-line']}`}
        >
          <span className={styles['contact-info-title']}>가게 전화번호</span>
          <span className={styles['contact-info-content']}>02-1234-5678</span>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-no-line']}`}
        >
          <span className={styles['contact-info-title']}>사장님 전화번호</span>
          <span className={styles['contact-info-content']}>010-1234-5678</span>
        </div>
      </div>

      <div className={styles['button-container']}>
        <button>지원하기</button>
        <button>내 지원 내역 보기</button>
      </div>
    </div>
  )
}

export default ContactInfo
