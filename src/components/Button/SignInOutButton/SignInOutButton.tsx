'use client'

import useSignOut from '@/hooks/auth/useSignOut'
import { useUserStore } from '@/lib/stores/userStore'
import { ButtonText, ComponentProps } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import PlainButton from '../PlainButton/PlainButton'
import styles from './SignInOutButton.module.scss'
import IconLogout from '/public/icons/ic-logout.svg'

export default function SignInOutButton({ className = '' }: ComponentProps) {
  const router = useRouter()
  const { user } = useUserStore()
  const signOut = useSignOut()
  const [buttonText, setButtonText] = useState<ButtonText['signInOut']>()
  const [handleClick, setHandleClick] = useState<() => void>()

  useEffect(() => {
    if (!user) {
      setButtonText('로그인')
      setHandleClick(() => router.push('/user/sign-in'))
      return
    }
    setButtonText('로그아웃')
    setHandleClick(() => signOut())
  }, [user, router, signOut])

  return (
    <PlainButton className={className} onClick={handleClick}>
      <IconLogout className={styles.icon} />
      <span>{buttonText}</span>
    </PlainButton>
  )
}
