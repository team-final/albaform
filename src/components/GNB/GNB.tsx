'use client'

import LogoutButton from '@/components/LogoutButton/LogoutButton'
import XButton from '@/components/XButton/XButton'
import QueryProvider from '@/lib/queries/QueryProvider'
import Link from 'next/link'

import styles from './GNB.module.scss'
import IconMypage from '/public/icons/ic-mypage.svg'

interface GNBProps {
  closeAction?: () => void
}

const GNB = ({ closeAction }: GNBProps) => {
  return (
    <article className={styles.gnb}>
      <div className={styles.inner}>
        <section className={styles.head}>
          <XButton onClick={closeAction} />
        </section>
        <section className={styles.body}>
          <ul>
            <li>
              <Link href="/" className={styles.button}>
                <IconMypage />
                마이페이지
              </Link>
            </li>
            <li>
              <QueryProvider>
                <LogoutButton className={styles.button} />
              </QueryProvider>
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}

export default GNB
