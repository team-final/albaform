'use client'

import {
  ALBATALK_EDIT_PATH_NAME,
  ALBATALK_LIST_PATH_NAME,
  ALBATALK_POST_PATH_NAME,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import classNames from 'classnames'
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
        className={classNames({
          [styles.active]: ['forms', 'form'].includes(pathname.split('/')[1]),
        })}
      >
        알바 목록
      </Link>
      <Link
        href={`/${ALBATALK_LIST_PATH_NAME}`}
        draggable="false"
        className={classNames({
          [styles.active]: [
            ALBATALK_LIST_PATH_NAME,
            ALBATALK_POST_PATH_NAME,
            ALBATALK_EDIT_PATH_NAME,
          ].includes(pathname.split('/')[1]),
        })}
      >
        알바토크
      </Link>
      <div
        onClick={handleMyFormsClick}
        draggable="false"
        className={classNames({
          [styles.active]: ['applications', 'ownersForms'].includes(
            pathname.split('/')[1],
          ),
        })}
      >
        내 알바폼
      </div>
    </div>
  )
}
