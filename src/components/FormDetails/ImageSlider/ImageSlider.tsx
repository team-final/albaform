import { ImageProps } from '@/lib/types/formTypes'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './ImageSlider.module.scss'

export default function ImageSlider({
  formDetails,
  noImageHeight = 100,
}: {
  formDetails: ImageProps
  noImageHeight: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageUrls = formDetails?.imageUrls

  const getImageUrl = (): string[] => {
    if (Array.isArray(imageUrls)) {
      return imageUrls
        .map((url) => {
          // url이 문자열인지 확인
          if (typeof url === 'string') {
            // url이 https로 시작하는 경우 그대로 반환
            if (url.startsWith('https')) {
              return url // 유효한 URL인 경우 그대로 반환
            } else if (url === 'string') {
              // url이 "string"인 경우, null 반환
              return null
            }
            // JSON 문자열인 경우 파싱 시도
            try {
              const parsedImages = JSON.parse(url) // JSON 파싱
              // parsedImages가 배열인지 확인
              if (Array.isArray(parsedImages)) {
                // 각 이미지 객체에서 url 추출
                return parsedImages.map((img: { url: string }) => img.url)
              }
            } catch (error) {
              console.error('Error parsing image URL:', error)
              return null // 파싱 실패 시 null 반환
            }
          }
          return null // url이 문자열이 아닌 경우 null 반환
        })
        .flat() // 중첩 배열을 평탄화하여 모든 URL을 하나의 배열로 만듦
        .filter((url): url is string => url !== null) // null을 제외한 배열 반환
    } else if (typeof imageUrls === 'string') {
      // imageUrls가 문자열인 경우
      if (imageUrls === 'string') {
        return [] // "string" 값일 경우 빈 배열 반환
      }
      return [imageUrls] // 그 외의 문자열은 배열로 변환하여 반환
    }
    return [] // 어떤 조건에도 맞지 않으면 빈 배열 반환
  }

  const images = getImageUrl() // 이미지 URL 배열 가져오기

  return (
    <div className={styles.custom}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`슬라이더 이미지 ${index}`}
              width={100}
              height={30}
              className={styles['job-details-img']}
              priority
            />
          </SwiperSlide>
        ))}
        {images.length > 0 ? (
          <div className="image-counter">
            {currentIndex + 1} / {images.length}
          </div>
        ) : (
          <div
            className="no-image-counter"
            style={{ height: `${noImageHeight}px` }}
          ></div>
        )}
      </Swiper>
    </div>
  )
}
