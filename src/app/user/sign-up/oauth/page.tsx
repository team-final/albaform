'use client'

import signInSignUpStyles from '@/app/user/signInSignUp.module.scss'
import Form from '@/components/Form/Form'
import AlertModal from '@/components/Modal/AlertModal/AlertModal'
import useCreateUser from '@/hooks/auth/useCreateUser'
import useSignIn from '@/hooks/auth/useSignIn'
import { generateUniqueNickname } from '@/lib/utils/nicknameGenerator'
import { useRouter, useSearchParams } from 'next/navigation'
import process from 'process'
import { FieldValues } from 'react-hook-form'

import DoneIC from '/public/icons/ic-warning-bookmark.svg'

export default function KakaoSignUpHandler() {
  const router = useRouter()
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code') || undefined
  const { oauthSignUp, signUp } = useCreateUser()
  const { oauthSignIn } = useSignIn()

  const handleKakaoSignUp = async (values: FieldValues) => {
    const { role } = values
    const name = String(generateUniqueNickname(role))

    const signUpResult = await oauthSignUp.mutateAsync({
      role,
      name,
      providerToken: authorizeCode,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
      provider: 'kakao',
    })

    await oauthSignIn.mutateAsync({
      provider: 'kakao',
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
      providerToken: signUpResult.accessToken,
    })

    router.replace('/user/sign-up/complete')
  }

  if (!authorizeCode) {
    return (
      <>
        <AlertModal
          contentType={'delete'}
          isOpen={true}
          onConfirm={router.back}
          onClose={router.back}
          content={{
            title: '에러',
            description: '간편 회원가입 인증 정보를 얻지 못했어요.',
            buttonText: '확인',
            icon: DoneIC,
            showSecondButton: false,
          }}
        />
      </>
    )
  }

  return (
    <>
      <article className={signInSignUpStyles.container}>
        <div className={signInSignUpStyles.inner}>
          <section className={signInSignUpStyles.body}>
            <Form formId={'signUpKakaoForm'} onSubmit={handleKakaoSignUp}>
              <Form.Fieldset>
                <Form.Legend>회원 유형</Form.Legend>
                <div className={signInSignUpStyles['user-role-select']}>
                  <Form.Field>
                    <Form.Label>지원자로 가입하기</Form.Label>
                    <Form.Input
                      checked
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

              <Form.SubmitButton
                buttonStyle={'solid'}
                isPending={signUp.isPending}
              >
                {signUp.isPending ? '진행 중...' : '회원 가입'}
              </Form.SubmitButton>
            </Form>
          </section>
        </div>
      </article>
    </>
  )
}
