'use client'

import signInSignUpStyles from '@/app/user/signInSignUp.module.scss'
import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import useSignIn from '@/hooks/auth/useSignIn'
import { TEST_ID_APPLICANT, TEST_ID_OWNER } from '@/lib/data/constants'
import { emailPattern, passwordPattern } from '@/lib/data/patterns'
import { useUserStore } from '@/lib/stores/userStore'
import { SignInValues } from '@/lib/types/userTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import process from 'process'
import { FieldValues } from 'react-hook-form'

export default function SignInPage() {
  const router = useRouter()
  const user = useUserStore.getState().user
  const appKey = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_APPKEY
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URI

  const { signIn } = useSignIn()

  if (user && typeof window !== 'undefined') {
    router.replace('/')
  }

  const handleSignIn = async (values: SignInValues) => {
    await signIn.mutateAsync(values)
    router.replace('/')
  }

  const handleSubmit = async (formValues: FieldValues) => {
    const values: SignInValues = formValues as SignInValues
    await handleSignIn(values)
  }

  return (
    <article className={signInSignUpStyles.container}>
      <div className={signInSignUpStyles.inner}>
        <section className={signInSignUpStyles.header}>
          <h1 className={signInSignUpStyles.title}>로그인</h1>
          <div className={signInSignUpStyles.description}>
            <p className={signInSignUpStyles['description-text']}>
              아직 계정이 없으신가요?
            </p>
            <Link
              href={'/user/sign-up'}
              className={signInSignUpStyles['description-link']}
            >
              회원가입 하러 가기
            </Link>
          </div>
        </section>

        <section className={signInSignUpStyles.body}>
          <Form formId={'signInForm'} onSubmit={handleSubmit}>
            <Form.Fieldset>
              <Form.Legend>이메일</Form.Legend>
              <Form.Field>
                <Form.Wrapper>
                  <Form.Input
                    name={'email'}
                    type={'email'}
                    placeholder="이메일을 입력해 주세요"
                    hookFormPattern={emailPattern}
                    required
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
                    hookFormPattern={passwordPattern}
                    required
                  />
                </Form.Wrapper>
              </Form.Field>
            </Form.Fieldset>

            <Form.SubmitButton
              buttonStyle={'solid'}
              isPending={signIn.isPending}
            >
              {signIn.isPending ? '로그인...' : '로그인'}
            </Form.SubmitButton>
          </Form>
        </section>

        <section className={signInSignUpStyles.sns}>
          <div className={signInSignUpStyles['sns-title']}>
            <p className={signInSignUpStyles['sns-title-text']}>
              SNS 계정으로 로그인하기
            </p>
          </div>
          <ul className={signInSignUpStyles['sns-list']}>
            <li>
              <Link
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`}
                className={signInSignUpStyles['sns-button']}
              >
                <Image
                  src={'/icons/ic-logo-kakao.svg'}
                  alt={'KAKAO 아이콘'}
                  fill
                  priority
                />
              </Link>
            </li>
          </ul>
        </section>

        <div className={signInSignUpStyles['sns-title']}>
          <p className={signInSignUpStyles['sns-title-text']}>
            테스트 계정으로 로그인하기
          </p>
        </div>
        <section className={signInSignUpStyles.footer}>
          <MainButton
            buttonStyle={'outline'}
            onClick={() => handleSignIn(TEST_ID_APPLICANT)}
          >
            지원자로 로그인
          </MainButton>

          <MainButton
            buttonStyle={'solid'}
            onClick={() => handleSignIn(TEST_ID_OWNER)}
          >
            사장님으로 로그인
          </MainButton>
        </section>
      </div>
    </article>
  )
}
