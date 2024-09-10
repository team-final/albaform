/**
 * @todo
 * 랜딩페이지 퍼블리싱
 */
import Image from 'next/image'

import styles from './page.module.scss'
import Image01 from '/public/images/landing/md/01.png'
import LogoText from '/public/images/logo/logo-text.svg'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles['main-visual']}>
        <LogoText />
        <h1>한 곳에서 관리하는 알바 구인 플랫폼</h1>
        <button>알바폼 시작하기</button>
        <div>
          <Image
            fill
            src={Image01}
            alt="albaform 서류 뭉치 이미지"
            style={{ objectFit: 'contain' }}
            draggable="false"
          />
        </div>
      </section>
    </main>
  )
}
