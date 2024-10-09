import MainButton from '@/components/Button/MainButton/MainButton'
import ReactModal from 'react-modal'

import styles from './CompleteInfoUpdate.module.scss'
import IconCircleCheck from '/public/icons/ic-circle-check.svg'
import IconInfo from '/public/icons/ic-info.svg'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  state: {
    name: string
    status: boolean
  }
}

export default function CompleteInfoUpdate({
  isOpen,
  onRequestClose,
  state,
}: ModalProps) {
  const { name, status } = state

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <div className={styles.content}>
        {status ? (
          <>
            <IconCircleCheck width={160} height={160} />
            <p>{name} 성공!</p>
          </>
        ) : (
          <>
            <IconInfo width={160} height={160} />
            <p>{name} 실패!</p>
            <p>
              입력한 {name === '내 정보 수정' ? '정보' : '비밀번호'}를
              확인해주세요.
            </p>
          </>
        )}
      </div>
      <div className={styles.buttongroup}>
        <MainButton buttonStyle="solid" onClick={onRequestClose}>
          닫기
        </MainButton>
      </div>
    </ReactModal>
  )
}
