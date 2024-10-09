'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import basicAxios from '@/lib/api/basicAxios'
import { useUserStore } from '@/lib/stores/userStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

export default function ApplyPage() {
  const { formId } = useParams()
  const user = useUserStore.getState().user
  const router = useRouter()

  useEffect(() => {
    if (user?.role === 'OWNER') {
      router.back()
    }
  }, [router, user])

  const [formData, setFormData] = useState<FormData>({
    password: '',
    introduction: '',
    resumeName: '',
    resumeId: 0,
    experienceMonths: 0,
    phoneNumber: '',
    name: '',
  })

  const handleClick = () => {}

  const handleResumeUpload = async (file: File) => {
    const uploadData = new FormData()
    uploadData.append('file', file)

    try {
      const response = await basicAxios.post('/resume/upload', uploadData, {
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

      const response = await basicAxios.post(
        `/forms/${formId}/applications`,
        submitData,
      )
      console.log('응답:', response.data)
      alert('제출이 완료되었습니다.')
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('제출 중 오류 발생:', error)
      alert('제출 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className={styles['apply-form']}>
      <div className={styles['header-container']}>
        <h1>알바폼 지원하기</h1>
        <button className={styles['cancel-button']} onClick={handleClick}>
          작성 취소
        </button>
      </div>
      <Form formId="applyForm" onSubmit={handleSubmit}>
        <Form.Fieldset>
          <Form.Field htmlFor="name">
            <Form.Legend required>이름</Form.Legend>
            <Form.Input
              name="name"
              type="text"
              required
              placeholder="이름을 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="phoneNumber">
            <Form.Legend required>연락처</Form.Legend>
            <Form.Input
              name="phoneNumber"
              type="text"
              required
              placeholder="숫자만 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="experienceMonths">
            <Form.Legend required>경력 (개월)</Form.Legend>
            <Form.Input
              name="experienceMonths"
              type="number"
              required
              placeholder="숫자만 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="resumeFile">
            <Form.Legend required>이력서</Form.Legend>
            <Form.Input
              name="resumeFile"
              type="file"
              className={styles.resumeFile}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleResumeUpload(file)
              }}
              placeholder="파일 업로드하기"
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="introduction">
            <Form.Legend required>자기소개</Form.Legend>
            <Form.Textarea
              name="introduction"
              required
              placeholder="최대 200자까지 입력 가능합니다."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="password">
            <Form.Legend required>비밀번호</Form.Legend>
            <Form.Input
              name="password"
              type="password"
              required
              placeholder="비밀번호를 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <div className={styles['button-container']}>
          <Form.SubmitButton buttonStyle="solid">작성 완료</Form.SubmitButton>
          <MainButton type="button" onClick={handleClick}>
            임시 저장
          </MainButton>
        </div>
      </Form>
    </div>
  )
}
