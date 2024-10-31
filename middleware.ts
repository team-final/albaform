import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')

  if (!accessToken) {
    return NextResponse.redirect(new URL('/user/sign-in', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/user/me',
    '/addtalk',
    '/addtalk/[talkId]',
    '/applications',
    '/form/create',
    '/forms/created',
  ],
}
