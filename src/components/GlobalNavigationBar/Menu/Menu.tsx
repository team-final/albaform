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

  const preparaeAlert = () => {
    alert('준비 단계입니다!')
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
      <div onClick={preparaeAlert}>알바토크</div>
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
