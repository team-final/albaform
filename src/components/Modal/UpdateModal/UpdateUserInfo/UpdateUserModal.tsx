'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import Modal, { ModalProps } from '@/components/Modal/Modal'
import useUpdateUser from '@/hooks/auth/useUpdateUser'
import { postImage } from '@/lib/api/postImage'
import { phoneNumberValidation } from '@/lib/data/validations'
import { UpdateUserProps, User } from '@/lib/types/userTypes'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './UpdateUserModal.module.scss'
import EditIc from '/public/icons/ic-edit-circle.svg'

interface UpdateUserModalProps extends ModalProps {
  initialValues: User
}

export default function UpdateUserModal({
  isOpen,
  onRequestClose,
  initialValues,
}: UpdateUserModalProps) {
  const keysToRemove: Array<keyof User> = ['id', 'role', 'email']

  const values = Object.fromEntries(
    Object.entries(initialValues).filter(
      ([key]) => !keysToRemove.includes(key as keyof User),
    ),
  ) as Omit<User, 'id' | 'role' | 'email'>
  const defaultThumbnail = '/public/icons/ic-user-profile-circle.svg'
  const [imageState, setImageState] = useState({
    imageUrl: initialValues.imageUrl || null,
    imageThumbnail: initialValues.imageUrl || defaultThumbnail,
    image: null as File | null,
  })
  const updateUser = useUpdateUser()

  useEffect(() => {
    if (isOpen) {
      setImageState({
        imageUrl: initialValues.imageUrl || null,
        imageThumbnail: initialValues.imageUrl || defaultThumbnail,
        image: null,
      })
    }
  }, [isOpen, initialValues])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setImageState((prev) => ({
        ...prev,
        image: selectedFile,
      }))

      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => {
        setImageState((prev) => ({
          ...prev,
          imageThumbnail: reader.result as string,
        }))
      }
    }
  }

  const handleSubmit = async (data: FieldValues): Promise<void> => {
    console.log(data)
    if (imageState.image && !String(data.imageUrl).startsWith('http')) {
      const formData = new FormData()
      formData.append(
        'image',
        imageState.image,
        imageState.image.name.replaceAll(' ', ''),
      )
      console.log(data)

      const response = await postImage(formData)
      if (response) {
        const uploadedUrl = response.data.url
        setImageState((prev) => ({
          ...prev,
          imageUrl: uploadedUrl,
        }))
        data.imageUrl = uploadedUrl
      }
    }

    await updateUser.mutateAsync(data as UpdateUserProps)
    console.log(data)
    onRequestClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form
        formId={`${initialValues.role}Update`}
        onSubmit={handleSubmit}
        defaultValues={values}
        className={styles.inner}
      >
        <div>
          <Form.Title>내 정보 수정</Form.Title>

          <Form.Fieldset>
            <div className={styles['image-preview-container']}>
              <Form.Field className={styles['image-upload-area']}>
                <Form.Input
                  type={'file'}
                  accept={'image/*'}
                  name={'imageUrl'}
                  onChange={handleImageChange}
                />
                <Image
                  src={imageState.imageThumbnail || defaultThumbnail}
                  alt="Profile Preview"
                  className={styles['image-preview']}
                  width={100}
                  height={100}
                />
              </Form.Field>
              <EditIc
                width={36}
                heigth={36}
                className={styles['image-basic-edit']}
              />
            </div>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend requiredIndicator>이름</Form.Legend>
              <Form.Input
                name="name"
                type="text"
                formRequired
                placeholder="이름을 입력해주세요."
              />
            </Form.Field>
          </Form.Fieldset>
          <Form.Fieldset>
            <Form.Field>
              <Form.Legend requiredIndicator>닉네임</Form.Legend>
              <Form.Input
                name="nickname"
                type="text"
                formRequired
                placeholder="닉네임을 입력해주세요."
              />
            </Form.Field>
          </Form.Fieldset>
          <Form.Fieldset>
            <Form.Field>
              <Form.Legend requiredIndicator>연락처</Form.Legend>
              <Form.Input
                name="phoneNumber"
                type="tel"
                formPattern={phoneNumberValidation}
                placeholder="숫자만 입력해주세요."
              />
            </Form.Field>
          </Form.Fieldset>

          {initialValues.role === 'OWNER' && (
            <>
              <Form.Fieldset>
                <Form.Field>
                  <Form.Legend requiredIndicator>가게 이름</Form.Legend>
                  <Form.Input
                    name="storeName"
                    type="text"
                    formRequired
                    placeholder="가게 이름(상호명)을 입력해주세요"
                  />
                </Form.Field>
              </Form.Fieldset>
              <Form.Fieldset>
                <Form.Field>
                  <Form.Legend requiredIndicator>가게 전화번호</Form.Legend>
                  <Form.Input
                    name="storePhoneNumber"
                    type="tel"
                    formRequired
                    formPattern={phoneNumberValidation}
                    placeholder="숫자만 입력해주세요"
                  />
                </Form.Field>
              </Form.Fieldset>
              <Form.Fieldset>
                <Form.Legend requiredIndicator>가게 위치</Form.Legend>
                <Form.Field>
                  <Form.AddressInput
                    name="location"
                    placeholder="가게 위치를 설정해주세요"
                    required
                  />
                </Form.Field>
              </Form.Fieldset>
            </>
          )}
        </div>

        <div className={styles.buttongroup}>
          <Form.SubmitButton>수정하기</Form.SubmitButton>
          <MainButton
            buttonStyle="outline"
            type="button"
            onClick={onRequestClose}
          >
            취소
          </MainButton>
        </div>
      </Form>
    </Modal>
  )
}
