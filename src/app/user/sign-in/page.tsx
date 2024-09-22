'use client'

import Form from '@/components/Form/Form'
import MainButton from '@/components/MainButton/MainButton'
import useAuthUser from '@/hooks/auth/useAuthUser'
import useSignIn from '@/hooks/auth/useSignIn'
import { SignInValues } from '@/lib/types/userTypes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'

import style from './page.module.scss'

export default function SignInPage() {
  const router = useRouter()
  const signIn = useSignIn()
  const { data, isLoading } = useAuthUser()
  const emailPattern = {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '이메일 형식이 아닙니다.',
  }
  const passwordPattern = {
    value: /^.{6,}$/,
    message: '비밀번호는 6자 이상이어야 합니다.',
  }

  async function handleSubmit(values: FieldValues) {
    const data: SignInValues = values as SignInValues
    await signIn.mutateAsync(data)
  }

  const testerLogin = async (email: string, password: string) => {
    await signIn.mutateAsync({ email, password })
  }

  useEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [data, router])

  if (isLoading) {
    return null
  }
  if (!isLoading && data) {
    window.location.href = '/'
  }

  return (
    <>
      <div className={style.LoginContainer}>
        <h1>로그인</h1>
        <p>
          아직 계정이 없으신가요?
          <Link href={'/sign-up'} className={style['go-register']}>
            회원가입 하러 가기
          </Link>
        </p>
        <Form
          formId={'signInForm'}
          onSubmit={handleSubmit}
          className={style['login-form']}
        >
          <Form.Field>
            <Form.Label htmlFor={'email'}>이메일</Form.Label>
            <Form.Input
              name={'email'}
              type={'email'}
              placeholder="이메일을 입력해 주세요"
              pattern={emailPattern}
              required
            />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor={'password'}>비밀번호</Form.Label>
            <Form.Input
              name={'password'}
              type={'password'}
              placeholder="비밀번호를 입력해 주세요"
              pattern={passwordPattern}
              required
            />
          </Form.Field>
          <MainButton
            buttonStyle={'solid'}
            type={'submit'}
            disabled={signIn.isPending}
          >
            {signIn.isPending ? '로그인 중...' : '로그인'}
          </MainButton>
          <button
            onClick={() => testerLogin('testApplicant@email.com', '00000000')}
          >
            지원자 로그인
          </button>
          <button
            onClick={() => testerLogin('testOwner@email.com', '00000000')}
          >
            사장님 로그인
          </button>
        </Form>
      </div>
    </>
  )
}
