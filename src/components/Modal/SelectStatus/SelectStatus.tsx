import MainButton from '@/components/Button/MainButton/MainButton'
import Toastify from '@/components/Toastify/Toastify'
import { usePatchStatusMutation } from '@/lib/queries/applicationDetailsQuery'
import { FORM_STATUS, FORM_STATUS_REVERSED } from '@/lib/types/formTypes'
import handleError from '@/lib/utils/errorHandler'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'

import styles from './SelectStatus.module.scss'

interface SelectModalProps {
  isOpen: boolean
  onRequestClose: () => void
  applicationId: number
  currentStatus: string
  onStatusChange: (newStatus: string) => void
}

const STATUS_VALUES = Object.values(FORM_STATUS)

export default function SelectStatus({
  isOpen,
  onRequestClose,
  applicationId,
  currentStatus,
  onStatusChange,
}: SelectModalProps) {
  const { mutate: selectStatus } = usePatchStatusMutation()
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)

  useEffect(() => {
    setSelectedStatus(currentStatus)
  }, [currentStatus])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const englishStatus =
      FORM_STATUS_REVERSED[selectedStatus as keyof typeof FORM_STATUS_REVERSED]

    selectStatus(
      { applicationId, status: englishStatus },
      {
        onSuccess: () => {
          onStatusChange(englishStatus)
          onRequestClose()
          toast.success('상태 변경 성공!')
        },
        onError: () => {
          handleError(new Error('상태 수정 실패'))
        },
      },
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value)
  }

  return (
    <>
      <Toastify />
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={onRequestClose}
        overlayClassName={styles['modal-select-status-overlay']}
        className={styles['modal-select-status-content']}
      >
        <form className={styles['form-container']} onSubmit={handleSubmit}>
          <div className={styles['form-title-container']}>
            <h1 className={styles['form-title']}>진행상태 선택</h1>
            <span className={styles['form-small-title']}>
              현재 진행상태를 알려주세요.
            </span>
          </div>

          <div className={styles['form-list-container']}>
            {STATUS_VALUES.map((value) => (
              <div key={`status_value_${value}`}>
                <div
                  className={`${styles['form-field-container']} ${selectedStatus === value ? styles['highlight-border'] : ''}`}
                >
                  <p className={styles['form-field-title']}>{value}</p>
                  <input
                    type={'radio'}
                    name={'status'}
                    value={value}
                    className={styles['input-radio']}
                    id={`status_${value}`}
                    onChange={handleChange}
                    checked={selectedStatus === value}
                  />
                  <label
                    htmlFor={`status_${value}`}
                    className={`${styles['custom-radio-label']} ${selectedStatus === value ? styles.selected : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles['button-container']}>
            <MainButton onClick={onRequestClose} color="gray">
              취소
            </MainButton>
            <MainButton type="submit">선택하기</MainButton>
          </div>
        </form>
      </ReactModal>
    </>
  )
}
