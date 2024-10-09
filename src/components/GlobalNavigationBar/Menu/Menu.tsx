import { USER_ROLE_CONFIG } from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import Link from 'next/link'

import styles from './Menu.module.scss'

export default function Menu() {
  const user = useUserStore.getState().user
  const userRole = user?.role || ''
  const myFormUrl = USER_ROLE_CONFIG[userRole].myFormUrl

  return (
    <div className={styles.nav}>
      <Link href="/forms" draggable="false" className={styles.active}>
        알바 목록
      </Link>
      <Link href={myFormUrl} draggable="false">
        내 알바폼
      </Link>
    </div>
  )
}
