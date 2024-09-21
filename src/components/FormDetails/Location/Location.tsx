import SimpleToast from '@/components/Toastify/SimpleToast/SimpleToast'
import { FormDetailsProps } from '@/lib/types/types'
import { toast } from 'react-toastify'

import styles from './Location.module.scss'

const Location = ({ formDetails }: { formDetails: FormDetailsProps }) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast(<SimpleToast message="복사 완료!" />)
    } catch (error) {
      alert('복사 실패!')
      console.log(error)
    }
  }

  const location = formDetails?.location || ''

  return (
    <section className={styles['location-info']}>
      <h1 className={styles['location-title']}>근무 지역</h1>
      <div className={styles['location-map-container']}>
        <div className={styles['location-details']}>
          <span className={styles['location-text']}>{location}</span>
          <button
            className={styles['location-copy']}
            onClick={() => handleCopyClipBoard(location)}
            disabled={!location}
          >
            복사
          </button>
        </div>
        <section className={styles['location-map']}>이건 지도야</section>
      </div>
    </section>
  )
}

export default Location
