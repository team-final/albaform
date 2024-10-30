import { useEffect, useState } from 'react'

export default function useHydration() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}
