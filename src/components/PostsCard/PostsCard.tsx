import { formatKoreanDate } from '@/lib/utils/formatDate'
import { calculateDaysLeft } from '@/lib/utils/formatDate2'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import Styles from './PostsCard.module.scss'
import BasicImg from '/public/images/landing/md/01.png'

interface PostsCardProps {
  status:
    | 'INTERVIEW_PENDING'
    | 'INTERVIEW_COMPLETED'
    | 'HIRED'
    | 'REJECTED'
    | string
  createdAt: string
  recruitmentEndDate: string
  form: {
    owner: {
      imageUrl: string[]
      storeName: string
      id: number
    }
    recruitmentEndDate: string
    recruitmentStartDate: string
    description: string
    title: string
    id: number
  }
  resumeId: number
}

export default function PostsCard({
  status,
  createdAt,
  recruitmentEndDate,
  form,
}: PostsCardProps) {
  switch (status) {
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

  const formatDate = calculateDaysLeft(recruitmentEndDate)
  const getImageUrl = (): string => {
    if (form.owner.imageUrl && form.owner.imageUrl.length > 0) {
      const firstImage = form.owner.imageUrl[0]

      if (typeof firstImage === 'string') {
        if (firstImage.startsWith('https')) {
          return firstImage
        } else if (firstImage === 'string') {
          return BasicImg.src
        } else {
          try {
            const parsedImage = JSON.parse(firstImage)
            return parsedImage[0]?.url || BasicImg.src
          } catch (error) {
            console.error('Error parsing image URL:', error)
            return BasicImg.src
          }
        }
      }
    }
    return BasicImg.src
  }

  const imageUrl = getImageUrl()
  const applyDate = formatKoreanDate(createdAt)

  return (
    <Link href={`/form/${form.id}`} style={{ textDecoration: 'none' }}>
      <article className={classNames(Styles.card)}>
        <div className={Styles['card-inner']}>
          <section className={Styles['card-head']}>
            <div className={Styles['card-info']}>
              <p className={Styles['card-created-text']}>지원일시</p>
              <p
                className={classNames(
                  Styles['card-created-text'],
                  Styles['card-created-date'],
                )}
              >
                {applyDate}
              </p>
            </div>
            <div className={Styles['card-resume']}></div>
          </section>
          <section className={Styles['card-body']}>
            <div className={Styles['card-store']}>
              <div className={Styles['card-store-image']}>
                <Image
                  src={imageUrl}
                  alt={`${form.owner.storeName} 이미지`}
                  fill
                  priority
                />
              </div>
              <div className={Styles['card-store-name']}>
                {form.owner.storeName}
              </div>
            </div>
            <p className={Styles['card-title']}>{form.title}</p>
            <p className={Styles['card-description']}>{form.description}</p>
          </section>

          <section className={Styles['card-foot']}>
            <p className={Styles['card-tag']}>{status}</p>
            <p className={Styles['card-tag']}>{formatDate}</p>
          </section>
        </div>
      </article>
    </Link>
  )
}
