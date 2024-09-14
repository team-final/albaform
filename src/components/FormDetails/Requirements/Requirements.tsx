import styles from './Requirements.module.scss'

const Requirements = () => {
  return (
    <div className={styles['requirements-info']}>
      <span className={styles['requirements-info-title']}>모집 조건</span>

      <div className={styles['requirements-container']}>
        <div className={styles['requirements-details']}>
          <span className={styles['details-title']}>모집인원</span>
          <div className={styles['details-people-wrapper']}>
            <span className={styles['details-content']}>00명</span>
            <span className={styles['details-content-people']}>(인원미정)</span>
          </div>
        </div>

        <div className={styles['requirements-details']}>
          <span className={styles['details-title']}>성별</span>
          <span className={styles['details-content']}>성별무관</span>
        </div>

        <div className={styles['requirements-details']}>
          <span className={styles['details-title']}>학력</span>
          <span className={styles['details-content']}>학력무관</span>
        </div>

        <div className={styles['requirements-details']}>
          <span className={styles['details-title']}>연령</span>
          <span className={styles['details-content']}>연력무관</span>
        </div>

        <div className={styles['requirements-details']}>
          <span className={styles['details-title']}>우대사항</span>
          <span className={styles['details-content']}>
            업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대
          </span>
        </div>
      </div>
    </div>
  )
}

export default Requirements
