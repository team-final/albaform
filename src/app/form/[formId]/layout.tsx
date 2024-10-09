'use client'

// 클라이언트 컴포넌트임을 명시
import DefaultQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { ChildrenProps } from '@/lib/types/types'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'

export default function FormLayout({ children }: ChildrenProps) {
  const accessToken = Cookies.get('accessToken')
  if (!accessToken) {
    redirect('/user/sign-in')
  }

  return <DefaultQueryProvider>{children}</DefaultQueryProvider>
}
