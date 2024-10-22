'use client'

import signInSignUpStyles from '@/app/user/signInSignUp.module.scss'
import Form from '@/components/Form/Form'
import useCreateUser from '@/hooks/auth/useCreateUser'
// import useGoogleAuth from '@/hooks/auth/useGoogleAuth'
import useOauth from '@/hooks/auth/useOauth'
import useSignIn from '@/hooks/auth/useSignIn'
import { emailPattern, passwordPattern } from '@/lib/data/patterns'
import { useUserStore } from '@/lib/stores/userStore'
import { CreateUserValues, SignUpFormValues } from '@/lib/types/userTypes'
import { generateUniqueNickname } from '@/lib/utils/nicknameGenerator'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

export default function SignUpPage() {
  const user = useUserStore.getState().user
  const router = useRouter()
  const createUser = useCreateUser()
  const signIn = useSignIn()
  // const { signInGoogle, oauthSignUp, oauthSignIn } = useGoogleAuth()
  const { oauthSignUp, oauthSignIn } = useOauth()

  // 로그인 상태면 뒤로가기
  if (user) {
    router.back()
    return null
  }

  // 알바폼 회원가입
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
    await router.prefetch('/user/sign-up/complete')
    await router.push('/user/sign-up/complete')
  }

  const handleSubmit = async (values: FieldValues) => {
    const signUpFormValues: SignUpFormValues = values as SignUpFormValues
    await handleSignUp(signUpFormValues)
  }

  // // 간편 회원가입
  // const handleGoogleSignUp = async () => {
  //   // 구글 로그인
  //   const googleResponse = await signInGoogle.mutateAsync()
  //   const googleToken: string | undefined = googleResponse.accessToken
  //   if (googleToken) {
  //     const albaformToken = await oauthSignUp.mutateAsync({
  //       token: googleToken,
  //       role: 'OWNER',
  //       name: 'googleUser',
  //     })
  //
  //     // 알바폼 로그인
  //     await oauthSignIn.mutateAsync(albaformToken)
  //     await router.push('/user/sign-up/complete')
  //   }
  // }

  // const handleKakaoSignUp = async () => {}

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
          <Form formId={'signUpForm'} onSubmit={handleSubmit}>
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

            <Form.SubmitButton
              buttonStyle={'solid'}
              isPending={createUser.isPending}
            >
              {createUser.isPending ? '진행 중...' : '회원 가입'}
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
            {/* <li> */}
            {/*  <button */}
            {/*    onClick={handleGoogleSignUp} */}
            {/*    className={signInSignUpStyles['sns-button']} */}
            {/*  > */}
            {/*    <Image */}
            {/*      src={'/icons/ic-logo-google.svg'} */}
            {/*      alt={'GOOGLE 아이콘'} */}
            {/*      fill */}
            {/*    /> */}
            {/*  </button> */}
            {/* </li> */}
            <li>
              <Link href={'#'} className={signInSignUpStyles['sns-button']}>
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
