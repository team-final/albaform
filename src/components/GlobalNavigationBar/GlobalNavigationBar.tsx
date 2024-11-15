'use client'

import useHydration from '@/hooks/useHydration'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import HamburgerButton from '../Button/HamburgerButton/HamburgerButton'
import styles from './GlobalNavigationBar.module.scss'
import Logo from './Logo/Logo'
import Menu from './Menu/Menu'
import SideBar from './SideBar/SideBar'

export default function GlobalNavigationBar() {
  const isHydrated = useHydration()
  const [showSideBar, setShowSideBar] = useState<boolean>(false)
  const queryClient = useQueryClient()

  /**
   * @todo
   * GNB 열리고 닫힐 때 스크롤 제어 심화 기능 개발
   */
  useEffect(() => {
    const disableScroll: () => void = () => {
      document.body.setAttribute('style', 'height: 100vh; overflow: hidden')
    }

    const enableScroll: () => void = () => {
      document.body.removeAttribute('style')
    }
    if (showSideBar) {
      disableScroll()
    } else enableScroll()
    if (isHydrated) {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  }, [showSideBar, isHydrated, queryClient])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Logo />
          <Menu />
          <HamburgerButton onClick={() => setShowSideBar(true)} />
        </div>
      </header>
      {showSideBar && <SideBar closeAction={() => setShowSideBar(false)} />}
    </>
  )
}
