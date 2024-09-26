import PlainButton from '../PlainButton/PlainButton'
import styles from './XButton.module.scss'
import IconX from '/public/icons/ic-X.svg'

interface XButtonProps {
  onClick?: () => void
}

const XButton = ({ onClick }: XButtonProps) => {
  return (
    <PlainButton onClick={onClick}>
      <IconX className={styles.icon} />
    </PlainButton>
  )
}

export default XButton
