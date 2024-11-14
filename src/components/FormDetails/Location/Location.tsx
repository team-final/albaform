import KakaoMap from '@/components/KakaoMap/KakaoMap'
import { LocationProps } from '@/lib/types/formTypes'
import { toast } from 'react-toastify'

import styles from './Location.module.scss'

export default function Location({
  formDetails,
}: {
  formDetails: LocationProps
}) {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('복사 성공!')
    } catch {
      toast.error('복사 실패!')
    }
  }

  const location = {
    address: formDetails?.location || '',
    name: formDetails?.storeName || '',
  }

  return (
    <>
      <section className={styles['location-info']}>
        <h1 className={styles['location-title']}>근무 지역</h1>
        <div className={styles['location-map-container']}>
          <div className={styles['location-details']}>
            <span className={styles['location-text']}>{location.address}</span>
            <button
              className={styles['location-copy']}
              onClick={() => handleCopyClipBoard(location.address)}
              disabled={!location}
            >
              복사
            </button>
          </div>
          <section className={styles['location-map']}>
            <KakaoMap location={location} />
          </section>
        </div>
      </section>
    </>
  )
}
