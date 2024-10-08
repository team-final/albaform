import { ChildrenProps } from '@/lib/types/types'
import classNames from 'classnames'
import Image from 'next/image'

import styles from './PostsCard.module.scss'

interface ParagraphWithIconProps extends ChildrenProps {
  data: {
    id: number
    resumeId: number
    resumeName: string
    createdAt: string
    updatedAt: string
    status: 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED'
    form: {
      id: number
      title: string
      description: string
      recruitmentStartDate: string
      recruitmentEndDate: string
      owner: {
        id: number
        storeName: string
        imageUrl: string
      }
    }
  }
  className?: string
}

export default function PostsCard({ data, className }: ParagraphWithIconProps) {
  let status: string = ''
  switch (data.status) {
    case 'INTERVIEW_PENDING':
      status = '면접대기'
      break
    case 'INTERVIEW_COMPLETED':
      status = '면접 완료'
      break
    case 'HIRED':
      status = '채용 완료'
      break
    default:
      status = '거절'
      break
  }

  const recruitmentStatus: string =
    new Date(data.form.recruitmentEndDate) > new Date()
      ? '모집 중'
      : '모집 마감'

  return (
    <article className={classNames(styles.card, className)}>
      <div className={styles['card-inner']}>
        <section className={styles['card-head']}>
          <div className={styles['card-info']}>
            <p className={styles['card-created-text']}>지원일시</p>
            <p
              className={classNames(
                styles['card-created-text'],
                styles['card-created-date'],
              )}
            >
              {data.createdAt}
            </p>
          </div>
          <div className={styles['card-resume']}>
            <button type="button" className={styles['card-resume-button']}>
              이력서 보기
            </button>
          </div>
        </section>

        <section className={styles['card-body']}>
          <div className={styles['card-store']}>
            <div className={styles['card-store-image']}>
              <Image
                src={data.form.owner.imageUrl}
                alt={`${data.form.owner.storeName} 이미지`}
                fill
                priority
              />
            </div>
            <div className={styles['card-store-name']}>
              {data?.form.owner.storeName}
            </div>
          </div>
          <p className={styles['card-title']}>{data.form.title}</p>
          <p className={styles['card-description']}>{data.form.description}</p>
        </section>

        <section className={styles['card-foot']}>
          <p className={styles['card-tag']}>{status}</p>
          <p className={styles['card-tag']}>{recruitmentStatus}</p>
        </section>
      </div>
    </article>
  )
}

function Title({ children }: ChildrenProps) {
  return <p className={styles['card-title']}>{children}</p>
}

PostsCard.Title = Title
