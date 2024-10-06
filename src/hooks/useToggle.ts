import { useCallback, useState } from 'react'

export default function useToggle(
  initialValue: boolean = false,
): [boolean, () => void, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue)
  }, [])

  const toggleClose = useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, toggleClose]
}
