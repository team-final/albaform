import { ChildrenProps, ClickProps } from '@/lib/types/types'
import Image from 'next/image'

import styles from './IconText.module.scss'

interface IconTextProps extends ChildrenProps, ClickProps {
  disabled?: boolean
}

export default function IconText({
  children,
  onClick,
  disabled,
}: IconTextProps) {
  if (onClick) {
    return (
      <button
        type={'button'}
        className={styles.container}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  } else {
    return <div className={styles.container}>{children}</div>
  }
}

function Icon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.icon}>
      <Image src={src} alt={alt} fill sizes={'99vw'} draggable={false} />
    </div>
  )
}

function Text({ text }: { text: string | number }) {
  return <p className={styles.text}>{text}</p>
}

IconText.Icon = Icon
IconText.Text = Text
