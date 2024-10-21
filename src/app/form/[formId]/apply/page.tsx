'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import authAxios from '@/lib/api/authAxios'
// import basicAxios from '@/lib/api/basicAxios'
import { useUserStore } from '@/lib/stores/userStore'
import { Params } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

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

  const handleCancle = () => {
    router.push(`/form/${formId}`)
  }

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
      console.log('이력서 업로드 성공:', response.data)
    } catch (error) {
      console.error('이력서 업로드 중 오류 발생:', error)
      alert('이력서 업로드 중 오류가 발생했습니다.')
    }
  }

  const handleSubmit = async (data: any) => {
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
          <Form.Legend required>이름</Form.Legend>
          <Form.Field htmlFor="name">
            <Form.Input
              name="name"
              type="text"
              required
              placeholder="이름을 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend required>연락처</Form.Legend>
          <Form.Field htmlFor="phoneNumber">
            <Form.Input
              name="phoneNumber"
              type="text"
              required
              placeholder="숫자만 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend required>경력 (개월)</Form.Legend>
          <Form.Field htmlFor="experienceMonths">
            <Form.Input
              name="experienceMonths"
              type="number"
              required
              placeholder="숫자만 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend required>이력서</Form.Legend>
          <Form.Field htmlFor="resumeFile">
            <Form.Input
              name="resumeFile"
              type="file"
              className={styles.resumeFile}
              onChange={handleResumeUpload}
              placeholder="파일 업로드하기"
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend required>자기소개</Form.Legend>
          <Form.Field htmlFor="introduction">
            <Form.Textarea
              name="introduction"
              required
              placeholder="최대 200자까지 입력 가능합니다."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend required>비밀번호</Form.Legend>
          <Form.Field htmlFor="password">
            <Form.Wrap>
              <Form.Input
                name="password"
                type="password"
                required
                placeholder="비밀번호를 입력해주세요."
                minLength={8}
              />
            </Form.Wrap>
          </Form.Field>
        </Form.Fieldset>

        <div className={styles['button-container']}>
          <Form.SubmitButton>작성 완료</Form.SubmitButton>
          <MainButton
            color={'gray'}
            buttonStyle={'outline'}
            onClick={handleCancle}
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
