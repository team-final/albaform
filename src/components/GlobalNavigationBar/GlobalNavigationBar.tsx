'use client'

import { useEffect, useState } from 'react'

import HamburgerButton from '../HamburgerButton/HamburgerButton'
import styles from './GlobalNavigationBar.module.scss'
import Logo from './Logo/Logo'
import Menu from './Menu/Menu'
import SideBar from './SideBar/SideBar'
import UserTypeIndicator from './UserTypeIndicator/UserTypeIndicator'

type pageTypes = 'landing' | 'auth' | 'content'

export default function GlobalNavigationBar() {
  /**
   * @todo
   * 1. Zustand 로 페이지 타입 확인하기 [ landing, auth, content ];
   */
  const type: pageTypes[] = ['landing', 'auth', 'content']
  const router: pageTypes = type[0]

  const [showSideBar, setShowSideBar] = useState<boolean>(false)

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

    if (showSideBar) disableScroll()
    else enableScroll()
  }, [showSideBar])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Logo />
          {router === 'auth' ? (
            <UserTypeIndicator />
          ) : (
            <>
              <Menu />
              <HamburgerButton onClick={() => setShowSideBar(true)} />
            </>
          )}
        </div>
      </header>
      {showSideBar && <SideBar closeAction={() => setShowSideBar(false)} />}
    </>
  )
}
