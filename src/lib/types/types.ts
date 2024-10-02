import { ReactNode } from 'react'
import { FieldValues } from 'react-hook-form'

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
  onSubmit: (values: FieldValues) => void
  initialValues?: Record<string, any>
  defaultValues?: FieldValues
}

export interface FormFieldProps extends ComponentProps {
  htmlFor?: string
  isInline?: boolean
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
