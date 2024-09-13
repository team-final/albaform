'use client'

import style from '@/components/BasicButton/BasicButton.module.scss'
import Image from 'next/image'
import React from 'react'

interface ButtonProps {
  type: 'solid' | 'outline'
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

interface IconProps {
  src: string
  altText?: string
}

interface TextProps {
  children: React.ReactNode
}

const MainButton = ({ type, disabled, onClick, children }: ButtonProps) => {
  const buttonClass = `${style.default} ${style[type]}`

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonIcon = ({ src, altText }: IconProps) => {
  return (
    <Image
      src={src}
      alt={altText || '아이콘'}
      width={36}
      height={36}
      className={style.icon}
    />
  )
}

const ButtonText = ({ children }: TextProps) => {
  return <span>{children}</span>
}

MainButton.Icon = ButtonIcon
MainButton.Text = ButtonText

export default MainButton
