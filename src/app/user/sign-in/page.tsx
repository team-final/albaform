'use client'

import style from '@/app/user/page.module.scss'
import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import useSignIn from '@/hooks/auth/useSignIn'
import {
  TEST_ID_APPLICANT,
  TEST_ID_OWNER,
  emailPattern,
  passwordPattern,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import { SignInValues } from '@/lib/types/userTypes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'

export default function SignInPage() {
  const router = useRouter()
  const signIn = useSignIn()
  const { user } = useUserStore()

  async function handleSignIn({ email, password }: SignInValues) {
    await signIn.mutateAsync({ email, password })
  }

  async function handleSubmit(formValues: FieldValues) {
    const values: SignInValues = formValues as SignInValues
    await signIn.mutateAsync(values)
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <>
      <div className={style.LoginContainer}>
        <h1>로그인</h1>
        <p>
          아직 계정이 없으신가요?
          <Link href={'/user/sign-up'} className={style['go-to-signup']}>
            회원가입 하러 가기
          </Link>
        </p>
        <Form
          formId={'signInForm'}
          onSubmit={handleSubmit}
          className={style['login-form']}
        >
          <Form.Fieldset>
            <Form.Legend>이메일</Form.Legend>
            <Form.Field>
              <Form.Wrap>
                <Form.Input
                  name={'email'}
                  type={'email'}
                  placeholder="이메일을 입력해 주세요"
                  pattern={emailPattern}
                  required
                />
              </Form.Wrap>
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Legend>비밀번호</Form.Legend>
            <Form.Field>
              <Form.Wrap>
                <Form.Input
                  name={'password'}
                  type={'password'}
                  placeholder="비밀번호를 입력해 주세요"
                  pattern={passwordPattern}
                  required
                />
              </Form.Wrap>
            </Form.Field>
          </Form.Fieldset>

          <Form.SubmitButton buttonStyle={'solid'} isPending={signIn.isPending}>
            {signIn.isPending ? '로그인 중...' : '로그인'}
          </Form.SubmitButton>
        </Form>

        <MainButton
          buttonStyle={'outline'}
          onClick={() => handleSignIn(TEST_ID_APPLICANT)}
        >
          지원자로 로그인
        </MainButton>

        <MainButton
          buttonStyle={'outline'}
          onClick={() => handleSignIn(TEST_ID_OWNER)}
        >
          사장님으로 로그인
        </MainButton>
      </div>
    </>
  )
}
