'use client'

import style from '@/components/BasicButton/BasicButton.module.scss'
import Image from 'next/image'
import React from 'react'

interface ButtonProps {
  type: 'solid' | 'outline'
  disable: boolean
  onClick: () => void
  children: React.ReactNode
}

interface IconProps {
  src: string
}

interface TextProps {
  children: React.ReactNode
}

const BaiscButton = ({ type, disable, onClick, children }: ButtonProps) => {
  const buttonClass = `${style.default} ${style[type]}`

  return (
    <button className={buttonClass} disabled={disable} onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonIcon = ({ src }: IconProps) => {
  return (
    <Image src={src} alt="Icon" width={36} height={36} className={style.icon} />
  )
}

const ButtonText = ({ children }: TextProps) => {
  return <span>{children}</span>
}

BaiscButton.Icon = ButtonIcon
BaiscButton.Text = ButtonText

export default BaiscButton
