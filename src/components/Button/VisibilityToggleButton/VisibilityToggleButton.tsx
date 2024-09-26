import { MouseEvent } from 'react'

import styles from './VisibilityToggleButton.module.scss'

interface VisibilityToggleButtonProps {
  visibility: boolean
  handleToggle: (e: MouseEvent<HTMLButtonElement>) => void // 이벤트 버블링 막기용
}

export default function VisibilityToggleButton({
  visibility,
  handleToggle,
}: VisibilityToggleButtonProps) {
  return (
    <button
      type="button"
      data-visibility={visibility}
      onClick={handleToggle}
      className={styles['visibility-toggle-button']}
    ></button>
  )
}
