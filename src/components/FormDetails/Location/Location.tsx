import Toastify from '@/components/Toastify/Toastify'
import { FormDetailsProps } from '@/lib/types/formTypes'
import { toast } from 'react-toastify'

import styles from './Location.module.scss'

export default function Location({
  formDetails,
}: {
  formDetails: FormDetailsProps
}) {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('복사 성공!')
    } catch (error) {
      console.log(error)
      toast.error('복사 실패!')
    }
  }

  const location = formDetails?.location || ''

  return (
    <>
      <Toastify />
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
    </>
  )
}
