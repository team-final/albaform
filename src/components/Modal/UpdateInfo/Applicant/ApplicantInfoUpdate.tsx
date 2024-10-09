import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import ReactModal from 'react-modal'

import styles from '../AuthInfoUpdate.module.scss'
import EditIc from '/public/icons/ic-edit-circle.svg'
import BasicUserProfile from '/public/icons/ic-user-profile-circle.svg'

interface ModalProps {
  isOpen: boolean
  onConfirm: (data: FieldValues) => void
  onAfterOpen?: () => void
  onRequestClose: () => void
  initialValues?: {
    name: string
    nickname: string
    phoneNumber: string
    imageUrl: string
  }
}

export default function ApplicantInfoUpdate({
  isOpen,
  onConfirm,
  onRequestClose,
  onAfterOpen,
  initialValues,
}: ModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialValues?.imageUrl || null,
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageChange(file)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setPreviewImage(initialValues?.imageUrl || null)
    } else {
      setPreviewImage(null)
    }
  }, [isOpen, initialValues])

  console.log(initialValues?.imageUrl)

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      overlayClassName={classNames(styles['modal-applicant-overlay'])}
      className={classNames(styles['modal-applicant-content'])}
    >
      <Form
        formId="applicantUpdate"
        onSubmit={onConfirm}
        className={styles.inner}
        defaultValues={initialValues}
      >
        <Form.Title>내 정보 수정</Form.Title>
        <Form.Fieldset>
          <div className={styles['image-preview-container']}>
            <div
              className={styles['image-upload-area']}
              onClick={handleImageClick}
            >
              {previewImage ? (
                <Image
                  src={previewImage || '/icons/ic-user-profile-circle.svg'}
                  alt="Profile Preview"
                  className={styles['image-preview']}
                  width={100}
                  height={100}
                />
              ) : initialValues?.imageUrl ? (
                <Image
                  src={initialValues.imageUrl}
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
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <EditIc
              width={36}
              heigth={36}
              className={styles['image-basic-edit']}
            />
          </div>
        </Form.Fieldset>
        <Form.Fieldset>
          <Form.Field>
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
          <Form.Field>
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
          <Form.Field>
            <Form.Legend required>연락처</Form.Legend>
            <Form.Input
              name="phoneNumber"
              type="tel"
              pattern={{
                value: /^[0-9]{10,11}$/,
                message: '잘못된 입력입니다.',
              }}
              placeholder="숫자만 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>
        <div
          className={classNames(styles['modal-applicant-content-buttongroup'])}
        >
          <MainButton
            buttonStyle="outline"
            type="button"
            onClick={onRequestClose}
          >
            취소
          </MainButton>
          <Form.SubmitButton buttonStyle="solid">수정하기</Form.SubmitButton>
        </div>
      </Form>
    </ReactModal>
  )
}
