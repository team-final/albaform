import PlainButton from '../PlainButton/PlainButton'
import styles from './LogoutButton.module.scss'
import IconLogout from '/public/icons/ic-logout.svg'

interface LogoutButtonProps {
  className?: string
}

const LogoutButton = ({ className = '' }: LogoutButtonProps) => {
  const handleLogout = () => {
    console.log('LOGOUT')
  }

  return (
    <PlainButton className={className} onClick={handleLogout}>
      <IconLogout className={styles.icon} />
      <span>로그아웃</span>
    </PlainButton>
  )
}

export default LogoutButton
