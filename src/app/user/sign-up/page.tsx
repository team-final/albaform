'use client'

import signInSignUpstyle from '@/app/user/signInSignUp.module.scss'
import Form from '@/components/Form/Form'
import useCreateUser from '@/hooks/auth/useCreateUser'
import useSignIn from '@/hooks/auth/useSignIn'
import { emailPattern, passwordPattern } from '@/lib/data/patterns'
import { useUserStore } from '@/lib/stores/userStore'
import { CreateUserValues, SignUpFormValues } from '@/lib/types/userTypes'
import { generateUniqueNickname } from '@/lib/utils/nicknameGenerator'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'

export default function SignUpPage() {
  const router = useRouter()
  const createUser = useCreateUser()
  const signIn = useSignIn()
  const { user } = useUserStore()

  const setDefaultUser = ({ email, password, role }: SignUpFormValues) => {
    const defaultNickname = generateUniqueNickname(role)
    const defaultUser: CreateUserValues = {
      email,
      password,
      role,
      name: '',
      nickname: defaultNickname,
      phoneNumber: '',
      storeName: '',
      storePhoneNumber: '',
      location: '',
    }
    return defaultUser
  }

  const handleSignUp = async (values: SignUpFormValues) => {
    const createUserValues: CreateUserValues = setDefaultUser(values)
    await createUser.mutateAsync(createUserValues)

    // 로그인
    const { email, password } = createUserValues
    await signIn.mutateAsync({ email, password })
  }

  const handleSubmit = async (values: FieldValues) => {
    const signUpFormValues: SignUpFormValues = values as SignUpFormValues
    await handleSignUp(signUpFormValues)
    router.prefetch('/user/sign-up/complete')
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

          <Form.SubmitButton
            buttonStyle={'solid'}
            isPending={createUser.isPending}
          >
            {createUser.isPending ? '진행 중...' : '회원 가입'}
          </Form.SubmitButton>
        </Form>
      </div>
    </>
  )
}
