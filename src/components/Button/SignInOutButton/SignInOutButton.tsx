'use client'

import useSignOut from '@/hooks/auth/useSignOut'
import { useUserStore } from '@/lib/stores/userStore'
import { ComponentProps } from '@/lib/types/types'
import { useRouter } from 'next/navigation'

import PlainButton from '../PlainButton/PlainButton'
import styles from './SignInOutButton.module.scss'
import IconLogout from '/public/icons/ic-logout.svg'

export default function SignInOutButton({ className }: ComponentProps) {
  const router = useRouter()
  const { user } = useUserStore()
  const signOut = useSignOut()

  const moveToSignIn = () => router.push('/user/sign-in')

  return (
    <>
      {!user ? (
        <PlainButton className={className} onClick={moveToSignIn}>
          <IconLogout className={styles.icon} />
          <span>{'로그인'}</span>
        </PlainButton>
      ) : (
        <PlainButton className={className} onClick={signOut}>
          <IconLogout className={styles.icon} />
          <span>{'로그아웃'}</span>
        </PlainButton>
      )}
    </>
  )
}
