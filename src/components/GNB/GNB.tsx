import Link from 'next/link'

import IconMypage from '../../../../../../../../public/icons/ic-mypage.svg'
import LogoutButton from '../LogoutButton/LogoutButton'
import XButton from '../XButton/XButton'
import styles from './GNB.module.scss'

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
              <LogoutButton className={styles.button} />
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}

export default GNB
