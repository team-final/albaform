import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import Modal, { ModalProps } from '@/components/Modal/Modal'
import { updateUserPassword } from '@/lib/api/userApi'
import { passwordPattern } from '@/lib/data/patterns'
import { UpdatePasswordProps } from '@/lib/types/userTypes'
import { ChangeEvent, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './UpdateUserPassword.module.scss'

export default function UpdateUserPasswordModal({
  isOpen,
  onRequestClose,
}: ModalProps) {
  const [newPassword, setNewPassword] = useState<string>('')
  const handleSubmit = async (data: FieldValues): Promise<void> => {
    await updateUserPassword(data as UpdatePasswordProps)
    onRequestClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form
        formId="updateFormOwnerStep2"
        onSubmit={handleSubmit}
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
          <Form.SubmitButton buttonStyle="solid">변경하기</Form.SubmitButton>
          <MainButton color="gray" onClick={onRequestClose}>
            취소
          </MainButton>
        </div>
      </Form>
    </Modal>
  )
}
