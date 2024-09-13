'use client'

import Form from '@/components/Form/Form'
import { FieldValues } from 'react-hook-form'

// Form이 제출한 data 확인
function handleLogin(data: FieldValues) {
  console.log(data)
}

export default function SignInPage() {
  return (
    <>
      <h1>로그인</h1>
      <Form formId={'signInForm'} onSubmit={handleLogin}>
        <Form.Field>
          <Form.Label>이메일</Form.Label>
          <Form.Input name={'email'} type={'email'} />
        </Form.Field>
        <Form.Field>
          <Form.Label>비밀번호</Form.Label>
          <Form.Input name={'password'} type={'password'} />
        </Form.Field>
        <button>지원자 로그인</button>
        <button>사장님 로그인</button>
      </Form>
    </>
  )
}
