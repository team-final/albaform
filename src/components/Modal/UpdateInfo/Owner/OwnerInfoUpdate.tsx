import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ReactModal from 'react-modal'

import Styles from './OwnerInfoUpdate.module.scss'
import EditIc from '/public/icons/ic-edit-circle.svg'
import BasicUserProfile from '/public/icons/ic-user-profile-circle.svg'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: () => void
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
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      overlayClassName={classNames(Styles['modal-owner-overlay'])}
      className={classNames(Styles['modal-owner-content'])}
    >
      <Form
        formId="updateFormOwnerStep2"
        onSubmit={onConfirm}
        className={''}
        defaultValues={initialValues}
      >
        <Form.Title>사장님 정보 관리</Form.Title>
        <Form.Fieldset>
          <div className={Styles['image-preview-container']}>
            <div
              className={Styles['image-upload-area']}
              onClick={handleImageClick}
            >
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Profile Preview"
                  className={Styles['image-preview']}
                  width={100}
                  height={100}
                />
              ) : initialValues?.imageUrl ? (
                <Image
                  src={initialValues.imageUrl}
                  alt="Profile Preview"
                  className={Styles['image-preview']}
                  width={100}
                  height={100}
                />
              ) : (
                <BasicUserProfile
                  width={100}
                  heigth={100}
                  className={Styles['image-preview']}
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
              className={Styles['image-basic-edit']}
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
        <div className={classNames(Styles['modal-owner-content-buttongroup'])}>
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
