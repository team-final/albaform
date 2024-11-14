import useHydration from '@/hooks/useHydration'
import {
  ALBATALK_EDIT_PATH_NAME,
  ALBATALK_LIST_PATH_NAME,
  ALBATALK_POST_PATH_NAME,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Menu.module.scss'

export default function Menu() {
  const isHydrated = useHydration()
  const user = useUserStore.getState().user
  const pathname = usePathname()

  let link
  switch (user?.role) {
    case 'APPLICANT':
      link = '/applications'
      break
    case 'OWNER':
      link = '/forms/created'
      break
    default:
      link = '/user/sign-in'
      break
  }

  if (isHydrated)
    return (
      <div className={styles.nav}>
        <Link
          href="/forms"
          draggable="false"
          className={classNames({
            [styles.active]:
              pathname === '/forms' ||
              ['form'].includes(pathname.split('/')[1]),
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

        <Link
          href={link}
          draggable="false"
          className={classNames({
            [styles.active]:
              pathname === '/applications' || pathname === '/forms/created',
          })}
        >
          내 알바폼
        </Link>
      </div>
    )
}
