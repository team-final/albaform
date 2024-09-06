import Link from 'next/link'

import styles from './RootNav.module.scss'

const RootNav = () => {
  return (
    <div className={styles.nav}>
      <Link href="/" draggable="false" className={styles.active}>
        알바 목록
      </Link>
      <Link href="/" draggable="false">
        알바토크
      </Link>
      <Link href="/" draggable="false">
        내 알바폼
      </Link>
    </div>
  )
}

export default RootNav
