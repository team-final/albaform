import classNames from 'classnames'

import styles from './LoadingSpinner.module.scss'

export default function LoadingSpinner({
  className,
  full,
}: {
  className?: string
  full?: boolean
}) {
  return (
    <article
      className={classNames(
        styles['loading-spinner'],
        full && styles.full,
        className,
      )}
    >
      <div className={styles['loading-inner']}>
        {Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
          <div
            key={`loading-circle-${i}`}
            className={styles['loading-circle']}
          ></div>
        ))}
      </div>
    </article>
  )
}
