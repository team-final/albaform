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

export interface ComponentProps {
  children?: ReactNode
  className?: string
}

export interface FormProps extends ComponentProps {
  formId: string
  onSubmit: (values: FieldValues) => void
  initialValues?: Record<string, any>
}

export interface FormFieldProps extends ComponentProps {
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
  validate?: (values: unknown) => boolean | string
  initialValues?: Record<string, any>
}

export interface MessageContext {
  message?: CustomMessage
}

export interface ButtonText {
  signInOut: '로그인' | '로그아웃'
}
