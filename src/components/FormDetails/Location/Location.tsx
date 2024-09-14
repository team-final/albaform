import fav from '../../public/favicon.ico'
import styles from './Location.module.scss'

const Location = () => {
  return (
    <div className={styles['location-info']}>
      <span className={styles['location-title']}>근무 지역</span>
      <div className={styles['location-map-container']}>
        <div className={styles['location-details']}>
          <span className={styles['location-text']}>
            서울특별시 중구 청계천로 100 시그니쳐타워 동관 1층 코드잇 스터디카페
          </span>
          <button className={styles['location-copy']}>복사</button>
        </div>
        <img src={fav.src} className={styles['location-map']} />
      </div>
    </div>
  )
}

export default Location
