import classNames from 'classnames'
import Image from 'next/image'

import styles from './Avatar.module.scss'

interface ProfileProps {
  imageUrl?: string
  name: string
}

export default function Avatar({ imageUrl, name }: ProfileProps) {
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.profile, { [styles.skeleton]: !imageUrl })}
      >
        <Image
          src={imageUrl || '/icons/ic-user-profile-circle.svg'}
          alt={imageUrl ? `${name} 프로필 이미지` : '프로필 이미지'}
          sizes={'99vw'}
          fill
          priority
          draggable={false}
        />
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  )
}
