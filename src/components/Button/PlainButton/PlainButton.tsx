import { ReactNode } from 'react'

import styles from './PlainButton.module.scss'

interface PlainButtonProps {
  children?: ReactNode
  className?: string
  onClick?: () => void | undefined
}

const PlainButton = ({
  children,
  className = '',
  onClick,
}: PlainButtonProps) => {
  const classNames = className ? `${styles.button} ${className}` : styles.button

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}

export default PlainButton
