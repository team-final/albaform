import Image from 'next/image'

import styles from './WorkScheduleInfo.module.scss'

const WorkScheduleInfo = () => {
  return (
    <section className={styles['work-schedule-info-container']}>
      <div className={styles['money-date-container']}>
        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-coins.svg"
              width={36}
              height={36}
              alt="시급 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>시급</h3>
            <span className={styles['info-content']}>10,000원</span>
          </div>
        </div>

        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-calendar-clock.svg"
              width={36}
              height={36}
              alt="기간 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>기간</h3>
            <div className={styles['info-content-container']}>
              <span className={styles['info-content']}>2024.06.01~</span>
              <span className={styles['info-content']}> 2024.12.31</span>
              {/* 반응형일 때 24.06.01 */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles['days-time-container']}>
        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-calendar2.svg"
              width={36}
              height={36}
              alt="요일 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>요일</h3>
            <span className={styles['info-content']}>요일협의</span>
          </div>
        </div>

        <div className={styles['work-schedule-info']}>
          <div className={styles['work-schedule-img-container']}>
            <Image
              src="/icons/ic-circle-clock.svg"
              width={36}
              height={36}
              alt="시간 아이콘"
              className={styles['work-schedule-img']}
            />
          </div>
          <div className={styles['work-schedule-info-auth']}>
            <h3 className={styles['info-text']}>시간</h3>
            <span className={styles['info-content']}>06:00~21:00</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkScheduleInfo
