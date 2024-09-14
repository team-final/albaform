import styles from './ContactInfo.module.scss'

const ContactInfo = () => {
  return (
    <section className={styles['contact-info']}>
      <div className={styles['contact-info-container']}>
        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-line']}`}
        >
          <div className={styles['contact-info-wrapper']}>
            <h3 className={styles['contact-info-title']}>모집기간</h3>
            <span className={styles['contact-info-date']}>D-10</span>
          </div>
          <p className={styles['contact-info-content']}>
            2024.05.04 ~ 2024.05.17
          </p>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-line']}`}
        >
          <h3 className={styles['contact-info-title']}>가게 전화번호</h3>
          <p className={styles['contact-info-content']}>02-1234-5678</p>
        </div>

        <div
          className={`${styles['contact-info-auth']} ${styles['contact-info-no-line']}`}
        >
          <h3 className={styles['contact-info-title']}>사장님 전화번호</h3>
          <p className={styles['contact-info-content']}>010-1234-5678</p>
        </div>
      </div>

      <div className={styles['button-container']}></div>
    </section>
  )
}

export default ContactInfo
