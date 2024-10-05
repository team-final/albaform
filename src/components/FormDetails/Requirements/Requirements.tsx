import { RequirementsProps } from '@/lib/types/formTypes'

import styles from './Requirements.module.scss'

export default function Requirements({
  formDetails,
}: {
  formDetails: RequirementsProps
}) {
  const formattedNumberOfPositions = formDetails?.numberOfPositions
    ? formDetails.numberOfPositions.toString().padStart(2, '0')
    : '00'
  return (
    <section className={styles['requirements-info']}>
      <h1 className={styles['requirements-info-title']}>모집 조건</h1>

      <div className={styles['requirements-container']}>
        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>모집인원</h3>
          <div className={styles['details-people-wrapper']}>
            <p className={styles['details-content']}>
              {formattedNumberOfPositions}명
            </p>
            {formattedNumberOfPositions === '00' && (
              <span className={styles['details-content-people']}>
                (인원미정)
              </span>
            )}
          </div>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>성별</h3>
          <p className={styles['details-content']}>{formDetails?.gender}</p>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>학력</h3>
          <p className={styles['details-content']}>{formDetails?.education}</p>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>연령</h3>
          <p className={styles['details-content']}>{formDetails?.age}</p>
        </div>

        <div className={styles['requirements-details']}>
          <h3 className={styles['details-title']}>우대사항</h3>
          <p className={styles['details-content']}>{formDetails?.preferred}</p>
        </div>
      </div>
    </section>
  )
}
