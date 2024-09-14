import styles from './Requirements.module.scss'

const Requirements = () => {
  return (
    <section className={styles['requirements-info']}>
      <h1 className={styles['requirements-info-title']}>모집 조건</h1>

      <div className={styles['requirements-container']}>
        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>모집인원</h3>
          <div className={styles['details-people-wrapper']}>
            <p className={styles['details-content']}>00명</p>
            <span className={styles['details-content-people']}>(인원미정)</span>
          </div>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>성별</h3>
          <p className={styles['details-content']}>성별무관</p>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>학력</h3>
          <p className={styles['details-content']}>학력무관</p>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>연령</h3>
          <p className={styles['details-content']}>연력무관</p>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>우대사항</h3>
          <p className={styles['details-content']}>
            업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대
          </p>
        </div>
      </div>
    </section>
  )
}

export default Requirements
