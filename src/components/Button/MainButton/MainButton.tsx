'use client'

import { ComponentProps } from '@/lib/types/types'
import classNames from 'classnames'
import Image from 'next/image'
import React, { MouseEvent } from 'react'

import style from './MainButton.module.scss'

export type buttonStyle = 'solid' | 'outline'
export type buttonColor = 'primary' | 'gray'

interface MainButtonProps extends ComponentProps {
  buttonStyle?: buttonStyle
  color?: buttonColor
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

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (typeof onClick === 'function') onClick()
    if (e.target) {
      const target = e.target as HTMLButtonElement
      target.blur()
    }
  }

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={handleClick}
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

function ButtonText({ children, className }: ComponentProps) {
  return <span className={className}>{children}</span>
}

MainButton.Icon = ButtonIcon
MainButton.Text = ButtonText
