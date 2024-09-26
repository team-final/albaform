'use client'

import Image from 'next/image'
import React from 'react'

import style from './MainButton.module.scss'

interface ButtonProps {
  buttonStyle: 'solid' | 'outline'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

interface IconProps {
  src: string
  altText?: string
}

interface TextProps {
  children: React.ReactNode
}

const MainButton = ({
  buttonStyle,
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  const buttonClass = `${style.default} ${style[buttonStyle]}`

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

const ButtonText = ({ children }: TextProps) => {
  return <span>{children}</span>
}

MainButton.Icon = ButtonIcon
MainButton.Text = ButtonText

export default MainButton
