'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'

import styles from './FloatingButton.module.scss'

interface FloatingButtonProps {
  children?: ReactNode
  onClick?: () => void
  mode?: 'default' | 'bookmark'
}

const FloatingButton = ({
  children,
  onClick,
  mode = 'default',
}: FloatingButtonProps) => {
  const hasText = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === FloatingButtonText,
  )

  const buttonClass = `${styles['floating-button']} ${mode === 'bookmark' ? styles.bookmark : ''} ${
    hasText ? styles['with-children'] : ''
  }`

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  )
}

interface IconProps {
  src: string
  altText?: string
}
const FloatingButtonIcon = ({ src, altText = '아이콘' }: IconProps) => {
  return (
    <Image
      src={src}
      alt={altText}
      className={styles.icon}
      width={36}
      height={36}
    />
  )
}

interface TextProps {
  children: ReactNode
}

const FloatingButtonText = ({ children }: TextProps) => {
  return <span className={styles.text}>{children}</span>
}

FloatingButton.Icon = FloatingButtonIcon
FloatingButton.Text = FloatingButtonText

export default FloatingButton
