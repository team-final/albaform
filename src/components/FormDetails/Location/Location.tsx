import { FormDetailsProps } from '@/lib/types/types'

import styles from './Location.module.scss'

const Location = ({ formDetails }: { formDetails: FormDetailsProps }) => {
  console.log(formDetails)
  return (
    <section className={styles['location-info']}>
      <h1 className={styles['location-title']}>근무 지역</h1>
      <div className={styles['location-map-container']}>
        <div className={styles['location-details']}>
          <span className={styles['location-text']}>
            서울특별시 중구 청계천로 100 시그니쳐타워 동관 1층 코드잇 스터디카페
          </span>
          <button className={styles['location-copy']}>복사</button>
        </div>
        <section className={styles['location-map']}>이건 지도야</section>
      </div>
    </section>
  )
}

export default Location
