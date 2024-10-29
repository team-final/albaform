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
  const { user, authService } = useUserStore()
  const moveToSignIn = () => router.push('/user/sign-in')
  const { signOut: albaformSignOut } = useSignOut()

  let signOut

  switch (authService) {
    case undefined:
      signOut = albaformSignOut
      break
    case 'kakao':
      signOut = () => {
        router.replace(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_APPKEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_SIGNOUT_REDIRECT_URI}`,
        )
      }
      break
  }

  return (
    <>
      {user ? (
        <PlainButton className={className} onClick={signOut}>
          <IconLogout className={styles.icon} />
          <span>{'로그아웃'}</span>
        </PlainButton>
      ) : (
        <PlainButton className={className} onClick={moveToSignIn}>
          <IconLogout className={styles.icon} />
          <span>{'로그인'}</span>
        </PlainButton>
      )}
    </>
  )
}
