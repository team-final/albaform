import { MyContentMenuType } from '@/lib/types/types'
import { useState } from 'react'

export function useTabMenu() {
  const [tabMenu, setTabMenu] = useState<MyContentMenuType>('posts')

  return {
    tabMenu,
    setTabMenu,
  }
}
