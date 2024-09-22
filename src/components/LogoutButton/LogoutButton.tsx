import useSignOut from '@/hooks/auth/useSignOut'

import PlainButton from '../PlainButton/PlainButton'
import styles from './LogoutButton.module.scss'
import IconLogout from '/public/icons/ic-logout.svg'

interface LogoutButtonProps {
  className?: string
}

const LogoutButton = ({ className = '' }: LogoutButtonProps) => {
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <PlainButton className={className} onClick={handleSignOut}>
      <IconLogout className={styles.icon} />
      <span>로그아웃</span>
    </PlainButton>
  )
}

export default LogoutButton
