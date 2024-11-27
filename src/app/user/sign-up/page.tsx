'use client'

import signInSignUpStyles from '@/app/user/signInSignUp.module.scss'
import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import useCreateUser from '@/hooks/auth/useCreateUser'
import useSignIn from '@/hooks/auth/useSignIn'
import { emailPattern, passwordValidation } from '@/lib/data/validations'
import { useUserStore } from '@/lib/stores/userStore'
import { SignUpFormValues, SignUpProps, UserRole } from '@/lib/types/userTypes'
import { generateRandomId } from '@/lib/utils/acountGenerator'
import { generateUniqueNickname } from '@/lib/utils/nicknameGenerator'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import process from 'process'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'

export default function SignUpPage() {
  const user = useUserStore.getState().user
  const router = useRouter()
  const { signUp } = useCreateUser()
  const { signIn } = useSignIn()
  const appKey = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_APPKEY
  const redirectUri = {
    signUp: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
  }
  const [randomId, setRandomId] = useState<{ email: string; role: UserRole }>({
    email: '',
    role: 'OWNER',
  })

  if (user) {
    router.back()
    return null
  }

  const setDefaultUser = ({ email, password, role }: SignUpFormValues) => {
    const defaultNickname = generateUniqueNickname(role)
    const defaultUser: SignUpProps = {
      email,
      password,
      role,
      name: '',
      nickname: defaultNickname,
      phoneNumber: '',
      storeName: '',
      storePhoneNumber: '',
      location: '',
      imageUrl: '',
    }
    return defaultUser
  }

  const handleSignUp = async (values: FieldValues) => {
    const { email, password, role } = values

    await signUp.mutateAsync(setDefaultUser({ email, password, role }))
    await signIn.mutateAsync({ email, password })

    router.prefetch('/user/sign-up/complete')
    router.replace('/user/sign-up/complete')
  }

  const fillInput = () => {
    setRandomId(generateRandomId())
  }

  return (
    <article className={signInSignUpStyles.container}>
      <div className={signInSignUpStyles.inner}>
        <section className={signInSignUpStyles.header}>
          <h1 className={signInSignUpStyles.title}>회원가입</h1>
          <div className={signInSignUpStyles.description}>
            <p className={signInSignUpStyles['description-text']}>
              이미 계정이 있으신가요?
            </p>
            <Link
              href={'/user/sign-in'}
              className={signInSignUpStyles['description-link']}
            >
              로그인 하러 가기
            </Link>
          </div>
        </section>

        <section className={signInSignUpStyles.body}>
          <Form formId={'signUpForm'} onSubmit={handleSignUp}>
            <Form.Fieldset>
              <Form.Legend>이메일</Form.Legend>
              <Form.Field>
                <Form.Wrapper>
                  <Form.Input
                    name={'email'}
                    type={'email'}
                    placeholder="이메일을 입력해 주세요"
                    formPattern={emailPattern}
                    defaultValue={randomId?.email}
                    formRequired
                  />
                </Form.Wrapper>
              </Form.Field>
            </Form.Fieldset>

            <Form.Fieldset>
              <Form.Legend>비밀번호</Form.Legend>
              <Form.Field>
                <Form.Wrapper>
                  <Form.Input
                    name={'password'}
                    type={'password'}
                    placeholder="비밀번호를 입력해 주세요"
                    formMinLength={passwordValidation}
                    formRequired
                  />
                </Form.Wrapper>
              </Form.Field>
            </Form.Fieldset>

            <Form.Fieldset>
              <Form.Legend>비밀번호 확인</Form.Legend>
              <Form.Field>
                <Form.Wrapper>
                  <Form.Input
                    name={'confirmPassword'}
                    type={'password'}
                    placeholder="비밀번호를 한 번 더 입력해 주세요"
                    formMinLength={passwordValidation}
                    formRequired
                  />
                </Form.Wrapper>
              </Form.Field>
            </Form.Fieldset>

            <Form.Fieldset>
              <Form.Legend>회원 유형</Form.Legend>
              <div className={signInSignUpStyles['user-role-select']}>
                <Form.Field>
                  <Form.Label>지원자로 가입하기</Form.Label>
                  <Form.Input
                    name={'role'}
                    type={'radio'}
                    value={'APPLICANT'}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Label>사장님으로 가입하기</Form.Label>
                  <Form.Input name={'role'} type={'radio'} value={'OWNER'} />
                </Form.Field>
              </div>
            </Form.Fieldset>

            <div className={signInSignUpStyles['user-role-select']}>
              <Form.SubmitButton
                buttonStyle={'solid'}
                isPending={signUp.isPending}
              >
                {signUp.isPending ? '진행 중...' : '회원 가입'}
              </Form.SubmitButton>
              <MainButton onClick={fillInput}>랜덤 이메일 입력</MainButton>
            </div>
          </Form>
        </section>

        <section className={signInSignUpStyles.sns}>
          <div className={signInSignUpStyles['sns-title']}>
            <p className={signInSignUpStyles['sns-title-text']}>
              SNS 계정으로 가입하기
            </p>
          </div>
          <ul className={signInSignUpStyles['sns-list']}>
            <li>
              <Link
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri.signUp}&response_type=code`}
                className={signInSignUpStyles['sns-button']}
              >
                <Image
                  src={'/icons/ic-logo-kakao.svg'}
                  alt={'KAKAO 아이콘'}
                  fill
                />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}
