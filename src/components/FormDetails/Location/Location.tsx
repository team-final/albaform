import { FormDetailsProps } from '@/lib/types/types'

import styles from './Location.module.scss'

const Location = ({ formDetails }: { formDetails: FormDetailsProps }) => {
  return (
    <section className={styles['location-info']}>
      <h1 className={styles['location-title']}>근무 지역</h1>
      <div className={styles['location-map-container']}>
        <div className={styles['location-details']}>
          <span className={styles['location-text']}>
            {formDetails?.location}
          </span>
          <button className={styles['location-copy']}>복사</button>
        </div>
        <section className={styles['location-map']}>이건 지도야</section>
      </div>
    </section>
  )
}

export default Location
