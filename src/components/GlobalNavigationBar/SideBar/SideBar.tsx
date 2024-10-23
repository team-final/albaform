import Avatar from '@/components/Avatar/Avatar'
import SignInOutButton from '@/components/Button/SignInOutButton/SignInOutButton'
import XButton from '@/components/Button/XButton/XButton'
import DefaultQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { useUserStore } from '@/lib/stores/userStore'
import Link from 'next/link'

import styles from './SideBar.module.scss'
import IconMypage from '/public/icons/ic-mypage.svg'

interface SideBarProps {
  closeAction?: () => void
}

export default function SideBar({ closeAction }: SideBarProps) {
  const user = useUserStore.getState().user

  return (
    <article className={styles.gnb}>
      <div className={styles.inner}>
        <section className={styles.head}>
          <div className={styles.user}>
            {user && (
              <>
                <Avatar
                  name={user.nickname ?? user.name}
                  imageUrl={user.imageUrl}
                />
                &nbsp;
                {user.role === 'OWNER' ? '사장님' : '님'} 반갑습니다!
              </>
            )}
          </div>
          <XButton onClick={closeAction} />
        </section>
        <section className={styles.body}>
          <ul onClick={closeAction}>
            <li>
              <Link
                href={user ? '/user/me' : '/user/sign-in'}
                className={styles.button}
              >
                <IconMypage />
                마이페이지
              </Link>
            </li>
            <li>
              <DefaultQueryProvider>
                <SignInOutButton className={styles.button} />
              </DefaultQueryProvider>
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}
