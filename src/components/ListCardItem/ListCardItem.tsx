import { calculateDaysLeft, formatDateRange } from '@/lib/utils/formatDate2'
import Image from 'next/image'
import Link from 'next/link'
import DoneFormIc from 'public/icons/ic-circle-check.svg'
import React from 'react'

import Styles from './ListCardItem.module.scss'
import NotRecurit from '/public/icons/ic-info.svg'
import PrivateImg from '/public/icons/ic-private.svg'
import BasicImg from '/public/images/landing/md/01.png'

interface ListItem {
  id: number
  title: string
  recruitmentStartDate: string
  recruitmentEndDate: string
  imageUrls: string[]
  applyCount: number
  scrapCount: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
  isRecruiting: boolean | null
}

function ListCardItem({
  id,
  title,
  recruitmentEndDate,
  recruitmentStartDate,
  imageUrls,
  applyCount,
  scrapCount,
  isPublic,
  isRecruiting,
}: ListItem) {
  const getImageUrl = (): string => {
    if (imageUrls && imageUrls.length > 0) {
      const firstImage = imageUrls[0]

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

  return (
    <Link href={`/form/${id}`}>
      <div className={Styles['listcard-outcontainer']}>
        {!isPublic ? (
          <div className={Styles['listcard-outcontainer-privateImg']}>
            <PrivateImg width={100} height={100} />
            <p className={Styles['listcard-outcontainer-privateImg-text']}>
              비공개 처리된 알바폼이에요
            </p>
          </div>
        ) : isRecruiting === false ? (
          <div className={Styles['listcard-outcontainer-notRecruiting']}>
            <NotRecurit width={100} height={100} />
            <p className={Styles['listcard-outcontainer-notRecruiting-text']}>
              현재 모집하고 있지 않아요!
            </p>
          </div>
        ) : calculateDaysLeft(recruitmentEndDate) === '마감' ? (
          <div className={Styles['listcard-outcontainer-doneRecruiting']}>
            <DoneFormIc width={100} height={100} />
            <p className={Styles['listcard-outcontainer-doneRecruiting-text']}>
              모집 기간이 종료됐어요!
            </p>
          </div>
        ) : null}
        <div className={Styles['listcard-main']}>
          <Image
            src={imageUrl}
            alt={'Recruitment Image'}
            className={Styles['listcard-Img']}
            width={477}
            height={304}
            quality={100}
          />
          <div className={Styles['listcard-info']}>
            <div className={Styles['listcard-info-isPublic']}>
              <div className={Styles['listcard-info-isPublic-tag']}>
                {isPublic ? '공개' : '비공개'}
              </div>

              {calculateDaysLeft(recruitmentEndDate) === '마감' ? (
                <div className={Styles['listcard-info-isPublic-tag-end']}>
                  모집 종료
                </div>
              ) : (
                <div className={Styles['listcard-info-isPublic-tag']}>
                  모집 중
                </div>
              )}
            </div>
            <div className={Styles['listcard-info-date']}>
              {formatDateRange(recruitmentStartDate, recruitmentEndDate)}
            </div>
          </div>
          <div className={Styles['listcard-info-title']}>{title}</div>
        </div>

        <div className={Styles['listcard-info-bottom']}>
          <div className={Styles['listcard-info-bottom-children']}>
            지원자 {applyCount}명
          </div>
          <div className={Styles['listcard-info-bottom-children']}>
            스크랩 {scrapCount}명
          </div>
          <div className={Styles['listcard-info-bottom-children']}>
            {calculateDaysLeft(recruitmentEndDate)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListCardItem
