import MainButton from '@/components/Button/MainButton/MainButton'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'

import styles from './AlertModal.module.scss'
import XIc from '/public/icons/ic-X.svg'
import DoneIC from '/public/icons/ic-warning-bookmark.svg'
import WritingIC from '/public/icons/ic-warning-comment.svg'
import DeleteIc from '/public/icons/ic-warning-form.svg'

interface AlertModalProps {
  AlertmodalType: 'delete' | 'done' | 'writing'
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: () => void
  onAfterOpen?: () => void
  content?: {
    title: string
    description: string
    buttonText: string
    buttonText2?: string
    icon: ReactNode
    showSecondButton: boolean
  }
}

const modalData = {
  delete: {
    title: '알바폼을 삭제할까요?',
    description: '삭제 후 정보를 복구할 수 없어요',
    buttonText: '삭제하기',
    buttonText2: '다음에 할게요',
    icon: DeleteIc,
    showSecondButton: true,
  },
  done: {
    title: '모집 마감',
    description: '모집이 종료된 알바폼입니다.',
    buttonText: '홈으로 가기',
    icon: DoneIC,
    showSecondButton: false,
  },
  writing: {
    title: '작성 중인 알바폼이 있어요!',
    description: '이어서 작성하시겠어요?',
    buttonText: '이어쓰기',
    icon: WritingIC,
    showSecondButton: false,
  },
}

/**
 * @param onRequestClose 모달 닫을떄 호출될 함수
 * @param onConfirm 해당 모달의 핵심버튼 함수
 * @param  onAfterOpen 모달이 열린 후 호출될 함수
 */
const AlertModal = ({
  AlertmodalType,
  isOpen,
  onRequestClose,
  onAfterOpen,
  onConfirm,
  content,
}: AlertModalProps) => {
  const {
    title,
    description,
    buttonText,
    showSecondButton,
    icon: Icon,
  } = content || modalData[AlertmodalType]

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      overlayClassName={classNames(styles['modal-alert-overlay'])}
      className={classNames(
        styles['modal-alert-content'],
        AlertmodalType === 'delete' && styles['modal-alert-content-delete'],
      )}
    >
      <XIc
        width={36}
        height={36}
        alt="Xbutton"
        onClick={onRequestClose}
        className={classNames(styles['modal-button-x'])}
      />
      <Icon
        width={120}
        height={120}
        alt={`${AlertmodalType}Icon`}
        className={classNames(styles['modal-alert-content-img'])}
      />
      <div className={classNames(styles['modal-alert-content-textgroup'])}>
        <h2
          className={classNames(styles['modal-alert-content-textgroup-title'])}
        >
          {title}
        </h2>
        <p className={classNames(styles['modal-alert-content-textgroup-text'])}>
          {description}
        </p>
      </div>
      <div className={classNames(styles['modal-alert-content-buttongroup'])}>
        <MainButton buttonStyle="solid" onClick={onConfirm}>
          {buttonText || modalData[AlertmodalType].buttonText}
        </MainButton>
        {showSecondButton && (
          <MainButton
            buttonStyle="outline"
            onClick={onRequestClose}
            className={styles['main-button-border']}
          >
            {modalData.delete.buttonText2}
          </MainButton>
        )}
      </div>
    </ReactModal>
  )
}

export default AlertModal
