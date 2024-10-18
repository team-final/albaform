'use client'

import { useUserStore } from '@/lib/stores/userStore'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import styles from './Menu.module.scss'

export default function Menu() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUserStore()

  const handleMyFormsClick = () => {
    if (user?.role === 'APPLICANT') {
      router.push('/applications')
    } else if (user?.role === 'OWNER') {
      router.push('/ownersForms')
    } else {
      router.push('/user/sign-in')
    }
  }

  return (
    <div className={styles.nav}>
      <Link
        href="/forms"
        draggable="false"
        className={pathname === '/forms' ? styles.active : ''}
      >
        알바 목록
      </Link>
      <Link
        href="/albatalk"
        draggable="false"
        className={
          ['/albatalk', '/albatalks', '/addtalk'].includes(pathname)
            ? styles.active
            : ''
        }
      >
        알바토크
      </Link>
      <div
        onClick={handleMyFormsClick}
        draggable="false"
        className={
          pathname === '/applications' || pathname === '/ownersForms'
            ? styles.active
            : ''
        }
      >
        내 알바폼
      </div>
    </div>
  )
}
