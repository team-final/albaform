'use client'

import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

export default function withAuth(WrappedComponent: ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter()

    useEffect(() => {
      const accessToken = document.cookie.includes('accessToken')
      if (!accessToken) {
        router.push('/user/sign-in')
      }
    }, [router])

    return <WrappedComponent {...props} />
  }
}
