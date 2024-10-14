import MainButton from '@/components/Button/MainButton/MainButton'
import AlertModal from '@/components/Modal/Alert/AlertModal'
import { useDeleteFormQuery } from '@/lib/queries/formDetailsQuery'
import { useUserStore } from '@/lib/stores/userStore'
import handleError from '@/lib/utils/errorHandler'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import styles from './ActionButton.module.scss'

interface ActionButtonsProps {
  isInRecruitPeriod: boolean
  formId: number
  ownerId: number
  isApplied?: boolean
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isInRecruitPeriod,
  formId,
  ownerId,
  // isApplied,
}) => {
  const user = useUserStore.getState().user
  const router = useRouter()
  const { mutate: deleteForm } = useDeleteFormQuery()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const handleApplyClick = () => {
    router.push(`/form/${formId}/apply`)
  }

  const handleShowApplicationHistory = () => {
    router.push(`/form/${formId}/application`)
    // 지원자 -> 제출 내용 보기
  }

  const handleEditClick = () => {
    router.push(`/form/${formId}/edit`)
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const closeModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleConfirm = () => {
    deleteForm(Number(formId), {
      onSuccess: () => {
        router.push('/forms')
      },
      onError: () => {
        handleError(new Error('폼 삭제 실패'))
      },
    })
  }

  if (user?.id === ownerId) {
    return (
      <div className={styles['button-container']}>
        <MainButton
          buttonStyle="solid"
          disabled={false}
          onClick={handleEditClick}
        >
          <MainButton.Icon src="/icons/ic-edit2.svg" altText="수정하기" />
          <MainButton.Text>수정하기</MainButton.Text>
        </MainButton>
        <MainButton
          buttonStyle="outline"
          disabled={false}
          onClick={handleDeleteClick}
          color="gray"
          className={styles['delete-tablet-button']}
        >
          <MainButton.Icon src="/icons/ic-trash-can.svg" altText="삭제하기" />
          <MainButton.Text className={styles['no-text']}>
            삭제하기
          </MainButton.Text>
        </MainButton>
      </div>
    )
  }

  if (user?.role === 'APPLICANT') {
    return (
      <div className={styles['button-container']}>
        {/* {!isApplied ? ( */}
        <MainButton
          buttonStyle="solid"
          disabled={!isInRecruitPeriod}
          onClick={handleApplyClick}
        >
          <MainButton.Icon src="/icons/ic-writing.svg" altText="지원하기" />
          <MainButton.Text>지원하기</MainButton.Text>
        </MainButton>
        {/* ) : ( */}
        <MainButton
          buttonStyle="outline"
          disabled={!isInRecruitPeriod}
          onClick={handleShowApplicationHistory}
        >
          <MainButton.Icon
            src="/icons/ic-apply-list.svg"
            altText="지원상태 보기"
          />
          <MainButton.Text>지원상태 보기</MainButton.Text>
        </MainButton>
        {/* )} */}
      </div>
    )
  }

  return (
    <>
      {isDeleteModalOpen && (
        <AlertModal
          AlertmodalType="delete"
          isOpen={isDeleteModalOpen}
          onRequestClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}

export default ActionButtons
