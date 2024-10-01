'use client'

import Form from '@/components/Form/Form'
import basicAxios from '@/lib/api/basicAxios'
import { useParams } from 'next/navigation'
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
  const { formid } = useParams()

  const [formData, setFormData] = useState<FormData>({
    password: '',
    introduction: '',
    resumeName: '',
    resumeId: 0,
    experienceMonths: 0,
    phoneNumber: '',
    name: '',
  })

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    alert('임시 저장되었습니다.')
  }

  const handleSubmit = async (data: FormData) => {
    try {
      const response = await basicAxios.post(`/forms/0/applications`, data)
      console.log('응답:', response.data)
      alert('제출이 완료되었습니다.')
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('제출 중 오류 발생:', error)
      alert('제출 중 오류가 발생했습니다.')
    }
  }

  return (
    <div>
      <p>{formid}</p>
      <div className={styles.headerContainer}>
        <h1>알바폼 지원하기</h1>
        <button onClick={handleSaveDraft}>작성 취소</button>
      </div>
      <Form formId="applyForm" onSubmit={handleSubmit}>
        <Form.Fieldset>
          <Form.Field htmlFor="name">
            <Form.Legend>이름</Form.Legend>
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
            <Form.Legend>연락처</Form.Legend>
            <Form.Input
              name="phoneNumber"
              type="text"
              required
              placeholder="연락처를 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="experienceMonths">
            <Form.Legend>경력 (개월)</Form.Legend>
            <Form.Input
              name="experienceMonths"
              type="number"
              required
              placeholder="경력을 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="resumeName">
            <Form.Legend>이력서</Form.Legend>
            <Form.Input
              name="resumeName"
              type="text"
              placeholder="이력서 이름을 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="introduction">
            <Form.Legend>자기소개</Form.Legend>
            <Form.Textarea
              name="introduction"
              required
              placeholder="자기소개를 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Field htmlFor="password">
            <Form.Legend>비밀번호</Form.Legend>
            <Form.Input
              name="password"
              type="password"
              required
              placeholder="비밀번호를 입력해주세요."
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.SubmitButton buttonStyle="solid">작성 완료</Form.SubmitButton>
        <button type="button" onClick={handleSaveDraft}>
          임시 저장
        </button>
      </Form>
    </div>
  )
}
