import Link from 'next/link'

import styles from './RootLogo.module.scss'
import LogoSymbol from '/public/images/logo/logo-symbol.svg'
import LogoText from '/public/images/logo/logo-text.svg'

const RootLogo = () => {
  return (
    <Link className={styles.logo} href="/" draggable="false">
      <LogoSymbol className={styles.symbol} />
      <LogoText className={styles.text} />
    </Link>
  )
}

export default RootLogo
