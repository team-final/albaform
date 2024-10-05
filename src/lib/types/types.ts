import { ReactNode } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export interface CustomMessage {
  title?: string
  message?: string
}

export interface Params {
  params: {
    formId?: string
    applicationId?: string
  }
}

export interface ClickProps {
  onClick?: () => void
}

export interface LayoutProps {
  children: ReactNode
}

export interface ChildrenProps {
  children?: ReactNode
}

export interface ComponentProps extends ChildrenProps {
  className?: string
}

export interface FormProps extends ComponentProps {
  formId: string
  onSubmit: SubmitHandler<FieldValues>
  initialValues?: Record<string, any>
  defaultValues?: FieldValues
}

export interface FormFieldProps extends ComponentProps {
  htmlFor?: string
  isInline?: boolean
  hidden?: boolean
}

export interface LabelProps extends ComponentProps {
  htmlFor: string
}

export interface InputProps extends ComponentProps {
  name: string
  type?: HTMLInputElement['type']
  required?: boolean
  checked?: boolean
  disabled?: boolean
  placeholder?: string
  autoComplete?: string
  minLength?: number
  maxLength?: number
  pattern?: {
    value: RegExp
    message: string
  }
  value?: any
  validate?: (values: unknown) => boolean | string
  initialValues?: Record<string, any>
  min?: number
  max?: number
  step?: number
  onClick?: (event?: any) => void
  onChange?: (event?: any) => void
}

export interface NumberCircleProps extends ComponentProps {
  number: number
}

export interface StepButtonProps extends ComponentProps {
  number: number
  isDisabled: boolean
  handleClick: () => void
}

export interface MessageContext {
  message?: CustomMessage
}

export interface ButtonText {
  signInOut: '로그인' | '로그아웃'
}

export interface FormDetailsProps {
  updatedAt?: string
  createdAt?: string
  preferred?: string
  age?: string
  education?: string
  gender?: string
  numberOfPositions?: number
  isPublic?: boolean
  hourlyWage?: number
  workDays?: string[]
  workEndTime?: string
  workStartTime?: string
  workEndDate?: string
  workStartDate?: string
  location?: string
  imageUrls?: string[]
  recruitmentEndDate?: string
  recruitmentStartDate?: string
  description?: string
  title?: string
  ownerId?: number
  id?: number
  scrapCount?: number
  applyCount?: number
  isScrapped?: boolean
  phoneNumber?: string
  storePhoneNumber?: string
}

export type STEP_INDEX = 1 | 2 | 3
export type STEP_TITLE = '모집 내용' | '모집 조건' | '근무 조건'

export const STEP_BUTTONS: { index: STEP_INDEX; title: STEP_TITLE }[] = [
  { index: 1, title: '모집 내용' },
  { index: 2, title: '모집 조건' },
  { index: 3, title: '근무 조건' },
]

export interface FormCreateStepProp {
  step: STEP_INDEX
}

export type FORM_INPROGRESS = { step: STEP_INDEX; isProgress: boolean }

export type NumberOfPositionsType = '00명 (인원미정)' | '직접입력' | number
export type GenderType = '성별무관' | '남성' | '여성'
export type EducationType = '학력무관' | '고등학교 졸업' | '대학교 졸업'
export type AgeType =
  | '20세 ~ 29세'
  | '30세 ~ 39세'
  | '40세 ~ 49세'
  | '50세 ~ 59세'
  | '60세 이상'
  | '직접입력'
  | string
export type PreferredType = '없음' | '직접입력' | string
export type workDays = '일' | '월' | '화' | '수' | '목' | '금' | '토'
export type workDaysType = workDays[]

export interface FORM_STEP_1 {
  title: string
  description: string
  recruitmentStartDate: Date | string
  recruitmentEndDate: Date | string
  imageUrls: { url: string; name: string }[]
}

export interface FORM_STEP_2 {
  numberOfPositions: NumberOfPositionsType
  gender: GenderType
  education: EducationType
  age: AgeType
  preferred: PreferredType
}

export interface FORM_STEP_3 {
  location: string
  workStartDate: Date | string
  workEndDate: Date | string
  workStartTime: string
  workEndTime: string
  workDays: workDaysType
  isNegotiableWorkDays: boolean
  hourlyWage: number
  isPublic: boolean
}

export interface FORM_DATA extends FORM_STEP_1, FORM_STEP_2, FORM_STEP_3 {}
export type FORM_DATA_TYPE = keyof FORM_DATA
export type FORM_DATA_VALUE = FORM_DATA[FORM_DATA_TYPE]
