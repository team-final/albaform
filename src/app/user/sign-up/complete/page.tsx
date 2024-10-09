'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import FormStyles from '@/components/Form/Form.module.scss'
import updateUserModalStyles from '@/components/Modal/UpdateInfo/AuthInfoUpdate.module.scss'
import useUpdateUser from '@/hooks/auth/useUpdateUser'
import { USER_ROLE_CONFIG } from '@/lib/data/constants'
import { phoneNumberPattern } from '@/lib/data/patterns'
import { useUserStore } from '@/lib/stores/userStore'
import { UpdateUserValues } from '@/lib/types/userTypes'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'
import EditIc from '/public/icons/ic-edit-circle.svg'
import BasicUserProfile from '/public/icons/ic-user-profile-circle.svg'

const NoSSR = dynamic(() => import('@/components/Form/Form'), { ssr: false })

export default function CompleteSignUpPage() {
  const user = useUserStore.getState().user
  const router = useRouter()

  if (!user?.role) router.replace('/user/sign-in')

  const userRole = user ? user.role : ''
  const userRoleName = USER_ROLE_CONFIG[userRole].title
  const isOwner = Boolean(userRole === 'OWNER')
  const updateUser = useUpdateUser()
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.imageUrl || null,
  )

  const handleImageChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageChange(file)
    }
  }

  const handleSubmit = async (values: FieldValues) => {
    const completeSignUpFormValues = values as UpdateUserValues
    await updateUser.mutateAsync(completeSignUpFormValues)
    await router.replace('/forms')
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
            <div className={updateUserModalStyles['image-preview-container']}>
              <Form.Field
                className={updateUserModalStyles['image-upload-area']}
              >
                <Form.Input
                  type={'file'}
                  name={'imageUrl'}
                  onChange={handleFileChange}
                />
                {previewImage ? (
                  <Image
                    src={previewImage || '/icons/ic-user-profile-circle.svg'}
                    alt="Profile Preview"
                    className={updateUserModalStyles['image-preview']}
                    width={100}
                    height={100}
                  />
                ) : user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile Preview"
                    className={updateUserModalStyles['image-preview']}
                    width={100}
                    height={100}
                  />
                ) : (
                  <BasicUserProfile
                    width={100}
                    height={100}
                    className={updateUserModalStyles['image-preview']}
                  />
                )}
              </Form.Field>
              <EditIc
                width={36}
                heigth={36}
                className={updateUserModalStyles['image-basic-edit']}
              />
            </div>
          </Form.Fieldset>
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
