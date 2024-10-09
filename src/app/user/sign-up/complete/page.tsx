'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import FormStyles from '@/components/Form/Form.module.scss'
import useUpdateUser from '@/hooks/auth/useUpdateUser'
import { USER_ROLE_CONFIG } from '@/lib/data/constants'
import { phoneNumberPattern } from '@/lib/data/patterns'
import { useUserStore } from '@/lib/stores/userStore'
import { UpdateUserValues } from '@/lib/types/userTypes'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

const NoSSR = dynamic(() => import('@/components/Form/Form'), { ssr: false })

export default function CompleteSignUpPage() {
  const user = useUserStore.getState().user
  const router = useRouter()

  if (!user?.role) router.replace('/user/sign-in')

  const userRole = user ? user.role : ''
  const userRoleName = USER_ROLE_CONFIG[userRole].title
  const isOwner = Boolean(userRole === 'OWNER')
  const updateUser = useUpdateUser()

  const handleSubmit = async (values: FieldValues) => {
    const completeSignUpFormValues = values as UpdateUserValues
    await updateUser.mutateAsync(completeSignUpFormValues)
    router.replace('/forms')
  }

  return (
    <>
      <div className="register-page">
        <NoSSR
          formId="signUpFormOwnerStep2"
          onSubmit={handleSubmit}
          className={FormStyles['owner-information']}
          defaultValues={user}
        >
          <Form.Title>{userRoleName} 정보 입력</Form.Title>
          <div className={styles['owner-information-sub-title']}>
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </div>
          <Form.Fieldset>
            <Form.Field htmlFor="nickname">
              <Form.Legend required>닉네임</Form.Legend>
              <Form.Input
                name="nickname"
                type="text"
                required
                placeholder="닉네임을 입력해주세요."
              />
            </Form.Field>
          </Form.Fieldset>
          <Form.Fieldset>
            <Form.Field htmlFor="name">
              <Form.Legend required>이름</Form.Legend>
              <Form.Input
                name="name"
                type="text"
                required
                placeholder="이름을 입력해주세요."
              />
            </Form.Field>
          </Form.Fieldset>
          <Form.Fieldset>
            <Form.Field htmlFor="phoneNumber">
              <Form.Legend required>전화번호</Form.Legend>
              <Form.Input
                name="phoneNumber"
                type="tel"
                required
                pattern={phoneNumberPattern}
                placeholder="숫자만 입력해주세요"
              />
            </Form.Field>
          </Form.Fieldset>

          {/* 사장님 회원인 경우 추가정보 */}
          <section hidden={userRole === 'APPLICANT'}>
            <Form.Fieldset>
              <Form.Field htmlFor="storeName">
                <Form.Legend required>가게 이름</Form.Legend>
                <Form.Input
                  name="storeName"
                  type="text"
                  required={isOwner}
                  placeholder="가게 이름(상호명)을 입력해주세요"
                />
              </Form.Field>
            </Form.Fieldset>
            <Form.Fieldset>
              <Form.Field htmlFor="storePhoneNumber">
                <Form.Legend required>가게 전화번호</Form.Legend>
                <Form.Input
                  name="storePhoneNumber"
                  type="tel"
                  required={isOwner}
                  pattern={phoneNumberPattern}
                  placeholder="숫자만 입력해주세요"
                />
              </Form.Field>
            </Form.Fieldset>
            <Form.Fieldset>
              <Form.Legend required>가게 위치</Form.Legend>
              <Form.Field htmlFor="location">
                <Form.KakaoSearchInput
                  name="location"
                  placeholder="가게 위치를 설정해주세요"
                  required={isOwner}
                />
              </Form.Field>
            </Form.Fieldset>
          </section>

          <div className={styles['button-group']}>
            <MainButton
              buttonStyle="outline"
              type="button"
              onClick={() => router.replace('/forms')}
            >
              나중에 하기
            </MainButton>
            <Form.SubmitButton buttonStyle="solid">
              이 정보로 알바폼 시작하기
            </Form.SubmitButton>
          </div>
        </NoSSR>
      </div>
    </>
  )
}
