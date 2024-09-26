import Link from 'next/link'

import styles from './Logo.module.scss'
import LogoSymbol from '/public/images/logo/logo-symbol.svg'
import LogoText from '/public/images/logo/logo-text.svg'

export default function Logo() {
  return (
    <Link className={styles.logo} href="/" draggable="false">
      <LogoSymbol className={styles.symbol} />
      <LogoText className={styles.text} />
    </Link>
  )
}
