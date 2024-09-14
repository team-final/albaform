import Image from 'next/image'

import styles from './Location.module.scss'

const Location = () => {
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
        <Image
          src="icons/ic-plus.svg"
          alt="기본 이미지"
          className={styles['location-map']}
          width={100}
          height={50}
        />
      </div>
    </section>
  )
}

export default Location
