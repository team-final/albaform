import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import ReactModal from 'react-modal'

import styles from '../AuthInfoUpdate.module.scss'
import EditIc from '/public/icons/ic-edit-circle.svg'
import BasicUserProfile from '/public/icons/ic-user-profile-circle.svg'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: (data: FieldValues) => void
  onAfterOpen?: () => void
  initialValues?: {
    nickname: string
    storeName: string
    storePhoneNumber: string
    phoneNumber: string
    location: string
    imageUrl: string
  }
}

/**
 * @param onRequestClose 모달 닫을떄 호출될 함수
 * @param onConfirm 이미지 서버에 등록하고 리턴받아야함.
 * @param  onAfterOpen 모달이 열린 후 스토어에서 input기본값 가져오기.
 */
export default function OwnerInfoUpdate({
  isOpen,
  onRequestClose,
  onAfterOpen,
  onConfirm,
  initialValues,
}: ModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

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

  useEffect(() => {
    if (isOpen) {
      setPreviewImage(
        initialValues?.imageUrl &&
          !String(initialValues?.imageUrl).startsWith('string')
          ? initialValues.imageUrl
          : '/icons/ic-user-profile-circle.svg',
      )
    } else {
      setPreviewImage(null)
    }
  }, [isOpen, initialValues])

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <Form
        formId="updateFormOwnerStep2"
        onSubmit={onConfirm}
        defaultValues={initialValues}
        className={styles.inner}
      >
        <div>
          <Form.Title>사장님 정보 관리</Form.Title>
          <Form.Fieldset>
            <div className={styles['image-preview-container']}>
              <Form.Field className={styles['image-upload-area']}>
                <Form.Input
                  type={'file'}
                  name={'imageUrl'}
                  onChange={handleFileChange}
                />
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile Preview"
                    className={styles['image-preview']}
                    width={100}
                    height={100}
                  />
                ) : (
                  <BasicUserProfile
                    width={100}
                    height={100}
                    className={styles['image-preview']}
                  />
                )}
              </Form.Field>
              <EditIc
                width={36}
                heigth={36}
                className={styles['image-basic-edit']}
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
            <Form.Field htmlFor="storeName">
              <Form.Legend required>가게 이름</Form.Legend>
              <Form.Input
                name="storeName"
                type="text"
                required
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
                required
                pattern={{
                  value: /^[0-9]{10,11}$/,
                  message: '잘못된 입력입니다.',
                }}
                placeholder="숫자만 입력해주세요"
              />
            </Form.Field>
          </Form.Fieldset>
          <Form.Fieldset>
            <Form.Field htmlFor="phoneNumber">
              <Form.Legend>사장님 전화번호</Form.Legend>
              <Form.Input
                name="phoneNumber"
                type="tel"
                pattern={{
                  value: /^[0-9]{10,11}$/,
                  message: '잘못된 입력입니다.',
                }}
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
                required
              />
            </Form.Field>
          </Form.Fieldset>
        </div>

        <div className={styles.buttongroup}>
          <MainButton
            buttonStyle="outline"
            type="button"
            onClick={onRequestClose}
          >
            취소
          </MainButton>
          <Form.SubmitButton>수정하기</Form.SubmitButton>
        </div>
      </Form>
    </ReactModal>
  )
}
