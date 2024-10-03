import { ClickProps, ComponentProps } from '@/lib/types/types'
import useToggle from '@/lib/utils/useToggle'
import classNames from 'classnames'
import React, { createContext, useContext } from 'react'

import styles from './Dropdown.module.scss'

interface DropdownProps extends ComponentProps {
  sustain?: boolean
}

export const DropdownContext = createContext({
  sustain: false,
  isOpen: false,
  toggle: () => {},
  toggleClose: () => {},
})

export default function Dropdown({
  children,
  className,
  sustain = false,
  ...rest
}: DropdownProps) {
  const [isOpen, toggle, toggleClose] = useToggle(false)

  const handleBlur = () => {
    if (!sustain) toggleClose()
  }

  return (
    <DropdownContext.Provider value={{ sustain, isOpen, toggle, toggleClose }}>
      <div
        className={classNames(styles.container, className)}
        onBlur={handleBlur}
        {...rest}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

Dropdown.Trigger = function Trigger({
  children,
  className,
  onClick,
  ...rest
}: ClickProps & ComponentProps) {
  const { toggle } = useContext(DropdownContext)

  return (
    <button
      type="button"
      className={classNames(styles.trigger, className)}
      onClick={() => {
        if (typeof onClick === 'function') onClick()
        toggle()
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

Dropdown.Menu = function Menu({
  children,
  className,
  ...rest
}: ComponentProps & { style?: object }) {
  const { isOpen } = useContext(DropdownContext)

  return isOpen ? (
    <div className={classNames(styles.menu, className)} {...rest}>
      {children}
    </div>
  ) : null
}

Dropdown.Item = function Item({
  children,
  className,
  onClick,
  ...rest
}: ClickProps & ComponentProps) {
  const { toggle } = useContext(DropdownContext)

  return (
    <button
      className={classNames(styles.item, className)}
      type="button"
      onMouseDown={(event) => {
        event?.stopPropagation()
        if (typeof onClick === 'function') onClick()
        toggle()
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
