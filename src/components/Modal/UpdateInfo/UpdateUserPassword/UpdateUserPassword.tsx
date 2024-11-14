import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import { passwordPattern } from '@/lib/data/patterns'
import { ChangeEvent, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import ReactModal from 'react-modal'

import styles from './UpdateUserPassword.module.scss'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: (data: FieldValues) => void
}

/**
 * @param onRequestClose 모달 닫을떄 호출될 함수
 * @param onConfirm 이미지 서버에 등록하고 리턴받아야함.
 * @param onAfterOpen 모달이 열린 후 스토어에서 input 기본값 가져오기.
 */
export default function UpdateUserPassword({
  isOpen,
  onRequestClose,
  onConfirm,
}: ModalProps) {
  const [newPassword, setNewPassword] = useState<string>('')

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <Form
        formId="updateFormOwnerStep2"
        onSubmit={onConfirm}
        className={styles.inner}
      >
        <div>
          <Form.Title>비밀번호 변경</Form.Title>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend required>현재 비밀번호</Form.Legend>
              <Form.Wrapper>
                <Form.Input
                  type="password"
                  name="currentPassword"
                  placeholder="현재 비밀번호를 입력해주세요."
                  hookFormPattern={passwordPattern}
                  required
                />
              </Form.Wrapper>
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend required>새 비밀번호</Form.Legend>
              <Form.Wrapper>
                <Form.Input
                  type="password"
                  name="newPassword"
                  placeholder="새로운 비밀번호를 입력해주세요."
                  hookFormPattern={passwordPattern}
                  required
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setNewPassword(event.target.value)
                  }}
                />
              </Form.Wrapper>
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend required>새 비밀번호 확인</Form.Legend>
              <Form.Wrapper>
                <Form.Input
                  type="password"
                  name="newPasswordCheck"
                  placeholder="새로운 비밀번호를 다시 한번 입력해주세요."
                  hookFormPattern={passwordPattern}
                  required
                  validate={(value: string) =>
                    value === newPassword || '비밀번호가 일치하지 않습니다.'
                  }
                />
              </Form.Wrapper>
            </Form.Field>
          </Form.Fieldset>
        </div>
        <div className={styles.actions}>
          <MainButton color="gray" onClick={onRequestClose}>
            취소
          </MainButton>
          <Form.SubmitButton buttonStyle="solid">변경하기</Form.SubmitButton>
        </div>
      </Form>
    </ReactModal>
  )
}
