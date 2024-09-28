'use client'

import { ChildrenProps, ComponentProps } from '@/lib/types/types'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

import style from './MainButton.module.scss'

interface MainButtonProps extends ComponentProps {
  buttonStyle?: 'solid' | 'outline'
  color?: 'primary' | 'gray'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

interface IconProps {
  src: string
  altText?: string
}

export default function MainButton({
  buttonStyle = 'solid',
  color = 'primary',
  type = 'button',
  disabled,
  onClick,
  className,
  children,
}: MainButtonProps) {
  const buttonClass = classNames(
    style.default,
    style[buttonStyle],
    style[color],
    className,
  )

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function ButtonIcon({ src, altText = '아이콘' }: IconProps) {
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

function ButtonText({ children }: ChildrenProps) {
  return <span>{children}</span>
}

MainButton.Icon = ButtonIcon
MainButton.Text = ButtonText
