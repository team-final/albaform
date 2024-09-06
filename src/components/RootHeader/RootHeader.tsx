'use client'

import { useState } from 'react'

import AuthSpecificMenu from '../AuthSpecificMenu/AuthSpecificMenu'
import GNB from '../GNB/GNB'
import HamburgerButton from '../HamburgerButton/HamburgerButton'
import RootLogo from '../RootLogo/RootLogo'
import RootNav from '../RootNav/RootNav'
import styles from './RootHeader.module.scss'

type pageTypes = 'landing' | 'auth' | 'content'

const RootHeader = () => {
  /**
   * @todo
   * 1. Zustand 로 페이지 타입 가져오기 [ landing, auth, content ];
   */
  const [showGNB, setShowGNB] = useState<boolean>(false)

  const type: pageTypes[] = ['landing', 'auth', 'content']

  const router: pageTypes = type[0]

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <RootLogo />
          {router === 'auth' ? (
            <AuthSpecificMenu />
          ) : (
            <>
              <RootNav />
              <HamburgerButton onClick={() => setShowGNB(true)} />
            </>
          )}
        </div>
      </header>
      {showGNB && <GNB closeAction={() => setShowGNB(false)} />}
    </>
  )
}

export default RootHeader
