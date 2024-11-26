import MainButton from '@/components/Button/MainButton/MainButton'
import { MODAL_MESSAGE } from '@/lib/data/messages'
import { AlertModalProps } from '@/lib/types/componentTypes'
import classNames from 'classnames'
import ReactModal from 'react-modal'

import styles from './AlertModal.module.scss'
import XIc from '/public/icons/ic-X.svg'

export default function AlertModal({
  contentType,
  content,
  isOpen,
  onOpen,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const {
    title,
    description,
    buttonText,
    showSecondButton,
    icon: Icon,
  } = content || MODAL_MESSAGE[contentType]

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
      onAfterOpen={onOpen}
      overlayClassName={classNames(styles['modal-alert-overlay'])}
      className={classNames(
        styles['modal-alert-content'],
        contentType === 'delete' && styles['modal-alert-content-delete'],
      )}
    >
      <XIc
        width={36}
        height={36}
        alt="Xbutton"
        onClick={onClose}
        className={classNames(styles['modal-button-x'])}
      />
      <Icon
        width={120}
        height={120}
        alt={`${contentType}Icon`}
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
          {buttonText || MODAL_MESSAGE[contentType].buttonText}
        </MainButton>
        {showSecondButton && (
          <MainButton
            buttonStyle="outline"
            onClick={onClose}
            className={styles['main-button-border']}
          >
            {MODAL_MESSAGE.delete.buttonText2}
          </MainButton>
        )}
      </div>
    </ReactModal>
  )
}
