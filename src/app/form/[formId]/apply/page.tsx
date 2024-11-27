'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import authAxios from '@/lib/api/authAxios'
import {
  monthsOfExperienceValidation,
  passwordValidation,
  phoneNumberValidation,
} from '@/lib/data/validations'
import { useUserStore } from '@/lib/stores/userStore'
import { Params } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { toast } from 'react-toastify'

import styles from './page.module.scss'

interface FormData {
  password: string
  introduction: string
  resumeName: string
  resumeId: number
  experienceMonths: number
  phoneNumber: string
  name: string
}

const STORAGE_KEY = 'formData'

export default function ApplyPage({ params }: Params) {
  const { formId } = params
  const user = useUserStore.getState().user
  const router = useRouter()

  if (!user) {
    router.replace('/user/sign-in')
  } else if (user.role === 'OWNER') {
    router.replace(`/form/${formId}`)
  }

  const [formData, setFormData] = useState<FormData>({
    password: '',
    introduction: '',
    resumeName: '',
    resumeId: 0,
    experienceMonths: 0,
    phoneNumber: '',
    name: '',
  })

  const handleCancel = () => {
    router.push(`/form/${formId}`)
  }

  // @todo 임시저장 기능 추가
  // const handleClick = () => {
  //   console.log('임시저장')
  // }

  const handleResumeUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file: File = event.target.files[0]
    const uploadData = new FormData()
    uploadData.append('file', file)

    try {
      const response = await authAxios.post('/resume/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const { resumeId, resumeName } = response.data
      setFormData((prev) => ({ ...prev, resumeId, resumeName }))
      toast.success('이력서가 업로드되었습니다.')
    } catch (error) {
      console.error('이력서 업로드 중 오류 발생:', error)
      toast.error('이력서 업로드 중 오류가 발생했습니다.')
    }
  }

  const handleSubmit = async (formValues: FieldValues) => {
    const data = formValues as any

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { resumeFile, ...submitData } = { ...formData, ...data }

      const response = await authAxios.post(
        `/forms/${formId}/applications`,
        submitData,
      )
      console.log('응답:', response.data)
      alert('제출이 완료되었습니다.')
      localStorage.removeItem(STORAGE_KEY)
      router.push(`/form/${formId}`)
    } catch (error) {
      console.error('제출 중 오류 발생:', error)
      alert('제출 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className={styles['apply-form']}>
      <div className={styles['header-container']}>
        <h1>알바폼 지원하기</h1>
      </div>
      <Form formId="applyForm" onSubmit={handleSubmit}>
        <Form.Fieldset>
          <Form.Legend requiredIndicator>이름</Form.Legend>
          <Form.Field htmlFor="name">
            <Form.Input
              formRequired
              name="name"
              placeholder="이름을 입력해주세요."
              type="text"
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend requiredIndicator>연락처</Form.Legend>
          <Form.Field htmlFor="phoneNumber">
            <Form.Input
              formRequired
              name="phoneNumber"
              placeholder="숫자만 입력해주세요."
              type="text"
              minLength={10}
              maxLength={11}
              formPattern={phoneNumberValidation}
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend requiredIndicator>경력 (개월)</Form.Legend>
          <Form.Field htmlFor="monthsOfExperience">
            <Form.Input
              formRequired
              name="monthsOfExperience"
              placeholder="숫자만 입력해주세요."
              type="number"
              formPattern={monthsOfExperienceValidation}
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend helpText={'파일명에는 한글이 없어야 합니다.'}>
            이력서
          </Form.Legend>
          <Form.Field htmlFor="resumeFile">
            <Form.Input
              name="resumeFile"
              type="file"
              className={styles.resumeFile}
              onChange={handleResumeUpload}
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend requiredIndicator>자기소개</Form.Legend>
          <Form.Field htmlFor="introduction">
            <Form.Textarea
              name="introduction"
              formRequired
              placeholder="최대 200자까지 입력 가능합니다."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend requiredIndicator>비밀번호</Form.Legend>
          <Form.Field htmlFor="password">
            <Form.Wrapper>
              <Form.Input
                formRequired
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                formMinLength={passwordValidation}
              />
            </Form.Wrapper>
          </Form.Field>
        </Form.Fieldset>

        <div className={styles['button-container']}>
          <Form.SubmitButton>작성 완료</Form.SubmitButton>
          <MainButton
            color={'gray'}
            buttonStyle={'outline'}
            onClick={handleCancel}
          >
            작성 취소
          </MainButton>
          {/* <MainButton type="button" onClick={handleClick}>
            임시 저장
          </MainButton> */}
        </div>
      </Form>
    </div>
  )
}
