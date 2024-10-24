'use client'

import signInSignUpStyles from '@/app/user/signInSignUp.module.scss'
import Form from '@/components/Form/Form'
import useCreateUser from '@/hooks/auth/useCreateUser'
import useOauth from '@/hooks/auth/useOauth'
import { generateUniqueNickname } from '@/lib/utils/nicknameGenerator'
import { useRouter, useSearchParams } from 'next/navigation'
import process from 'process'
// import { Suspense } from 'react'
import { FieldValues } from 'react-hook-form'

export default function KakaoSignUpHandler() {
  const router = useRouter()
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code') || undefined
  const { oauthSignUp, oauthSignIn } = useOauth()
  const createUser = useCreateUser()

  const handleKakaoSignUp = async (values: FieldValues) => {
    const { role } = values
    const name = String(generateUniqueNickname(role))

    const signUpResult = await oauthSignUp.mutateAsync({
      role,
      name,
      token: authorizeCode,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
      provider: 'kakao',
    })

    await oauthSignIn.mutateAsync({
      provider: 'kakao',
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
      token: signUpResult.accessToken,
    })

    router.replace('/user/sign-up/complete')
  }

  return (
    <>
      <Form formId={'signUpKakaoForm'} onSubmit={handleKakaoSignUp}>
        <Form.Fieldset>
          <Form.Legend>회원 유형</Form.Legend>
          <div className={signInSignUpStyles['user-role-select']}>
            <Form.Field>
              <Form.Label>지원자로 가입하기</Form.Label>
              <Form.Input name={'role'} type={'radio'} value={'APPLICANT'} />
            </Form.Field>
            <Form.Field>
              <Form.Label>사장님으로 가입하기</Form.Label>
              <Form.Input name={'role'} type={'radio'} value={'OWNER'} />
            </Form.Field>
          </div>
        </Form.Fieldset>

        <Form.SubmitButton
          buttonStyle={'solid'}
          isPending={createUser.isPending}
        >
          {createUser.isPending ? '진행 중...' : '회원 가입'}
        </Form.SubmitButton>
      </Form>
    </>
  )
}

// export default function OAuthSignUpPage() {
//   return (
//     <Suspense>
//       <KakaoSignUpHandler />
//     </Suspense>
//   )
// }
