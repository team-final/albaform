import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

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

export interface ComponentProps {
  children?: ReactNode
  className?: string
}

export interface FormProps extends ComponentProps {
  formId: string
  onSubmit: (values: unknown) => void
  register?: ReturnType<UseFormRegister<FieldValues>>
}

export interface FormFieldProps extends ComponentProps {
  isInline?: boolean
}

type InputTypes = 'email' | 'password' | 'text' | 'radio' | 'file'

export interface InputProps extends ComponentProps {
  type: InputTypes
  required?: boolean
  checked?: boolean
  disabled?: boolean
  placeholder?: string
  value?: string
  autoComplete?: string
  register?: ReturnType<UseFormRegister<FieldValues>>
}
