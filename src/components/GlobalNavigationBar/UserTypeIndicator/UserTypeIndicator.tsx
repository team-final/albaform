import Link from 'next/link'

import styles from './UserTypeIndicator.module.scss'

export default function UserTypeIndicator() {
  return (
    <div className={styles.tab}>
      <Link href="/" draggable="false">
        사장님 전용
      </Link>
      <Link href="/" draggable="false" className={styles.active}>
        지원자 전용
      </Link>
    </div>
  )
}
