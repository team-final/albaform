import { FormDetailsProps } from '@/lib/types/formTypes'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ImageSlider({
  formDetails,
  noImageHeight = 100,
}: {
  formDetails: FormDetailsProps
  noImageHeight: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = Array.isArray(formDetails?.imageUrls)
    ? formDetails.imageUrls.filter((url) => url.startsWith('http'))
    : []

  return (
    <div className="slide-container">
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
              className="job-details-img"
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
