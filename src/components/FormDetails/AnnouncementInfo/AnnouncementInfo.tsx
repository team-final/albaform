import { FormDetailsProps } from '@/lib/types/types'

import styles from './AnnouncementInfo.module.scss'

const AnnouncementInfo = ({
  formDetails,
}: {
  formDetails: FormDetailsProps
}) => {
  const now = new Date()
  const recruitmentStartDate = new Date(
    formDetails?.recruitmentStartDate || new Date(),
  )
  const recruitmentEndDate = new Date(
    formDetails?.recruitmentEndDate || new Date(),
  )
  const isRecruiting = now >= recruitmentStartDate && now <= recruitmentEndDate
  const createdAtDate = new Date(formDetails?.createdAt || new Date())

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}. ${month}. ${day} ${hours}:${minutes}:${seconds} 등록`
  }

  const createdFormattedDate = formatDate(createdAtDate)

  return (
    <section className={styles['announcement-info']}>
      <div className={styles['announcement-info-status']}>
        <span className={styles['status-auth']}>
          {formDetails?.isPublic === true ? '공개' : '비공개'}
        </span>
        <span className={styles['status-auth']}>
          {isRecruiting ? '모집중' : '모집완료'}
        </span>
      </div>

      <p className={styles['announcement-info-date']}>{createdFormattedDate}</p>
    </section>
  )
}

export default AnnouncementInfo
