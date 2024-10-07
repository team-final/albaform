'use client'

import signInSignUpstyle from '@/app/user/signInSignUp.module.scss'
import Form from '@/components/Form/Form'
import useSignIn from '@/hooks/auth/useSignIn'
import useSignUp from '@/hooks/auth/useSignUp'
import { emailPattern, passwordPattern } from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import { CompleteSignUpValues, SignUpValues } from '@/lib/types/userTypes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'

export default function SignUpPage() {
  const router = useRouter()
  const signUp = useSignUp()

  const setDefaultSignupValues = ({ email, password, role }: SignUpValues) => {
    const signUpValues: CompleteSignUpValues = {
      email,
      password,
      role,
      name: '이름',
      nickname: '닉네임',
      phoneNumber: '010-0000-0000',
      storeName: '가게이름',
      storePhoneNumber: '02-0000-0000',
      location: '서울특별시 강남구 알바폼로 1',
    }
    return signUpValues
  }
  const signIn = useSignIn()
  const { user } = useUserStore()

  const handleSignUp = async (values: SignUpValues) => {
    const signUpValues: CompleteSignUpValues = setDefaultSignupValues(values)
    await signUp.mutateAsync(signUpValues)
    const { email, password } = signUpValues as SignUpValues
    await signIn.mutateAsync({ email, password })
  }

  const handleSubmit = async (formValues: FieldValues) => {
    const values: SignUpValues = formValues as SignUpValues
    await handleSignUp(values)
  }

  useEffect(() => {
    if (user) {
      router.push('/user/sign-up/complete')
    }
  }, [router, user])

  return (
    <>
      <div className={signInSignUpstyle.LoginContainer}>
        <h1>회원가입</h1>
        <p>
          이미 계정이 있으신가요?
          <Link
            href={'/user/sign-in'}
            className={signInSignUpstyle['go-to-signup']}
          >
            로그인 하러 가기
          </Link>
        </p>
        <Form
          formId={'signUpForm'}
          onSubmit={handleSubmit}
          className={signInSignUpstyle['login-form']}
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

          <Form.Fieldset>
            <Form.Legend>비밀번호 확인</Form.Legend>
            <Form.Field>
              <Form.Wrap>
                <Form.Input
                  name={'confirmPassword'}
                  type={'password'}
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  pattern={passwordPattern}
                  required
                />
              </Form.Wrap>
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Legend>회원 유형</Form.Legend>
            <Form.Field>
              <Form.Wrap>
                <Form.Input name={'role'} type={'radio'} value={'APPLICANT'} />
                지원자로 가입하기
                <Form.Input name={'role'} type={'radio'} value={'OWNER'} />
                사장님으로 가입하기
              </Form.Wrap>
            </Form.Field>
          </Form.Fieldset>

          <Form.SubmitButton buttonStyle={'solid'} isPending={signUp.isPending}>
            {signUp.isPending ? '진행 중...' : '회원 가입'}
          </Form.SubmitButton>
        </Form>
      </div>
    </>
  )
}
