import { useModal } from '@/hooks/useModal'
import { ReactNode } from 'react'
import ReactModal from 'react-modal'

import styles from './Modal.module.scss'

export interface ModalProps {
  isOpen: boolean
  onAfterOpen?: () => void
  onRequestClose: () => void
  children?: ReactNode
}

export default function Modal({
  isOpen,
  onAfterOpen,
  onRequestClose,
  children,
}: ModalProps) {
  const { closeModal } = useModal()

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose || closeModal}
      ariaHideApp={false}
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      {children}
    </ReactModal>
  )
}
