'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'

import styles from './FloatingButton.module.scss'

interface FloatingButtonProps {
  children?: ReactNode
  onClick?: () => void
  mode?: 'default' | 'bookmark'
  disabled?: boolean
}

const FloatingButton = ({
  children,
  onClick,
  mode = 'default',
  disabled,
}: FloatingButtonProps) => {
  const hasText = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === FloatingButtonText,
  )

  const buttonClass = `${styles['floating-button']} ${mode === 'bookmark' ? styles.bookmark : ''} ${
    hasText ? styles['with-children'] : ''
  }`

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

interface IconProps {
  src: string
  altText?: string
  width?: number
  height?: number
}
const FloatingButtonIcon = ({
  src,
  altText = '아이콘',
  width = 36,
  height = 36,
}: IconProps) => {
  return (
    <Image
      src={src}
      alt={altText}
      className={styles.icon}
      width={width}
      height={height}
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
