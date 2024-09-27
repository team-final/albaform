'use client'

import style from '@/components/MainButton/MainButton.module.scss'
import Image from 'next/image'
import React from 'react'

interface ButtonProps {
  buttonStyle: 'solid' | 'outline'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

interface IconProps {
  src: string
  altText?: string
}

interface TextProps {
  children: React.ReactNode
  className?: string
}

const MainButton = ({
  buttonStyle,
  disabled,
  onClick,
  children,
  className = '',
}: ButtonProps) => {
  const buttonClass = `${style.default} ${style[buttonStyle]} ${className}`

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonIcon = ({ src, altText = '아이콘' }: IconProps) => {
  return (
    <Image
      src={src}
      alt={altText}
      width={36}
      height={36}
      className={style.icon}
    />
  )
}

const ButtonText = ({ children, className }: TextProps) => {
  return <span className={className}>{children}</span>
}

MainButton.Icon = ButtonIcon
MainButton.Text = ButtonText

export default MainButton
