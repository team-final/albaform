import { useEffect, useState } from 'react'

export default function useHydration() {
  const [hydrated, setHydrated] = useState<boolean>(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}
