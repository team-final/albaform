import { FormDetailsProps } from '@/lib/types/formTypes'
import { formatDetailedDate } from '@/lib/utils/formatDate'

import styles from './AnnouncementInfo.module.scss'

export default function AnnouncementInfo({
  formDetails,
}: {
  formDetails: FormDetailsProps
}) {
  const now = new Date()
  const recruitmentStartDate = new Date(
    formDetails?.recruitmentStartDate || new Date(),
  )
  const recruitmentEndDate = new Date(
    formDetails?.recruitmentEndDate || new Date(),
  )
  const isRecruiting = now >= recruitmentStartDate && now <= recruitmentEndDate
  const createdAtDate = formDetails?.createdAt
    ? new Date(formDetails.createdAt)
    : undefined
  const createdFormattedDate = formatDetailedDate(createdAtDate)

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
