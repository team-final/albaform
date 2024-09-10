'use client'

import { useEffect, useState } from 'react'

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
   * 1. Zustand 로 페이지 타입 확인하기 [ landing, auth, content ];
   */
  const type: pageTypes[] = ['landing', 'auth', 'content']
  const router: pageTypes = type[0]

  const [showGNB, setShowGNB] = useState<boolean>(false)

  /**
   * @todo
   * GNB 열리고 닫힐 때 스크롤 제어 심화 기능 개발
   */
  useEffect(() => {
    const disableScroll: () => void = () => {
      document.body.setAttribute('style', 'height: 100vh; overflow: hidden')
      console.log(document.body)
    }

    const enableScroll: () => void = () => {
      document.body.removeAttribute('style')
      console.log(document.body)
    }

    if (showGNB) disableScroll()
    else enableScroll()
  }, [showGNB])

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
