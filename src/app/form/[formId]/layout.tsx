'use client'

import defaultQueryClient from '@/lib/queries/defaultQueryClient'
import { LayoutProps } from '@/lib/types/types'
import { QueryClientProvider } from '@tanstack/react-query'

// import Cookies from 'js-cookie'
// import { redirect } from 'next/navigation'

export default function FormLayout({ children }: LayoutProps) {
  // const accessToken = Cookies.get('accessToken')
  // if (!accessToken) {
  //   redirect('/user/sign-in')
  // }
  return (
    <QueryClientProvider client={defaultQueryClient}>
      {children}
    </QueryClientProvider>
  )
}
