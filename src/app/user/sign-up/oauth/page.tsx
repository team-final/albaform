'use client'

import signInSignUpStyles from '@/app/user/signInSignUp.module.scss'
import Form from '@/components/Form/Form'
import useCreateUser from '@/hooks/auth/useCreateUser'
import useOauth from '@/hooks/auth/useOauth'
import { UserRole } from '@/lib/types/userTypes'
import { generateUniqueNickname } from '@/lib/utils/nicknameGenerator'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

export default function OAuthHandler() {
  // 카카오
  const responseParams = useSearchParams()
  const authorizeCode = responseParams.get('code')
  const queryClient = useQueryClient()
  const { oauthSignUp, oauthSignIn } = useOauth()
  const createUser = useCreateUser()

  queryClient.setQueryData(['kakaoAuthorizeCode'], authorizeCode)

  const handleKakaoSignUp = async (selectedRole: UserRole) => {
    const name = String(generateUniqueNickname(selectedRole))
    const code = String(queryClient.getQueryData(['kakaoAuthorizeCode']))
    const result = await oauthSignUp.mutateAsync({
      role: selectedRole,
      name,
      token: code,
    })
    console.log(result)
    return result
  }

  const handleSubmit = async (values: FieldValues) => {
    const { role } = values
    // const selectedRole: UserRole = (values as SelectedUserRole
    const token = (await handleKakaoSignUp(role)).accessToken || ''
    await oauthSignIn.mutateAsync({
      provider: 'kakao',
      redirectUri: 'http://localhost:3000/user/sign-in/oauth',
      token,
    })
  }

  return (
    <>
      <Form formId={'signUpKakaoForm'} onSubmit={handleSubmit}>
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
