import AlbaformStartButton from '@/components/Button/AlbaformStartButton/AlbaformStartButton'
import Image from 'next/image'

import styles from './page.module.scss'
import LogoText from '/public/images/logo/logo-text.svg'

const IMAGES = [
  [
    '/images/landing/lg/02.png',
    '/images/landing/lg/03.png',
    '/images/landing/lg/04.png',
    '/images/landing/lg/05.png',
  ],
  [
    '/images/landing/md/02.png',
    '/images/landing/md/03.png',
    '/images/landing/md/04.png',
    '/images/landing/md/05.png',
  ],
  [
    '/images/landing/sm/02.png',
    '/images/landing/sm/03.png',
    '/images/landing/sm/04.png',
    '/images/landing/sm/05.png',
  ],
]

const IMAGE_DESC = [
  '어디서든 지원받으세요. 다양한 사이트, SNS, 문자까지 언제 어디서든 알바생을 구해보세요.',
  '쉽고 빨라요. 1분만에 알바폼을 만들어 보세요! 링크를 복사하여 어디서든지 사용하세요.',
  '한 곳에서 쉽게 관리하세요. 알바폼 관리 페이지에서 지원 현황을 확인하고 지원자별 상태를 관리할 수 있습니다.',
  '쉽고 빠르게 알바 지원. 간단한 정보만 입력해도 알바 지원이 가능합니다.',
]

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.visual}>
        <LogoText />
        <h1>한 곳에서 관리하는 알바 구인 플랫폼</h1>
        <AlbaformStartButton />
        <div>알바폼 메인 이미지</div>
      </section>

      <section className={styles.promotion}>
        {IMAGES.map((items, sizes) => {
          return (
            <div
              key={`promotion-image-size-${sizes}`}
              className={styles.container}
            >
              {items.map((image, index) => {
                return (
                  <div
                    key={`promotion-image-${sizes}-${index}`}
                    className={styles.image}
                  >
                    <Image
                      fill
                      src={image}
                      alt={IMAGE_DESC[index]}
                      style={{ objectFit: 'contain' }}
                      draggable="false"
                      priority
                    />
                  </div>
                )
              })}
            </div>
          )
        })}

        <div className={styles.foot}>
          <h1>
            한 곳에서 관리하는
            <br />
            알바 구인 플랫폼
          </h1>
          <AlbaformStartButton />
        </div>
      </section>
    </main>
  )
}
