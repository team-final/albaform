import {
  ComponentProps,
  FormFieldProps,
  FormProps,
  InputProps,
} from '@/lib/types/types'
import classNames from 'classnames'
import { ReactNode } from 'react'

export default function Form({
  children,
  className,
  formId,
  onSubmit,
  register,
}: FormProps) {
  const FormClass = classNames(className, 'form')
  return (
    <form id={formId} onSubmit={onSubmit} className={FormClass} {...register}>
      {children}
    </form>
  )
}

function FormField({
  children,
  className,
  isInline = false,
}: FormFieldProps): ReactNode {
  const FormFieldClass = classNames(className, 'form-field', {
    'form-field-inline': isInline,
    'form-field-block': !isInline,
  })
  return <label className={FormFieldClass}>{children}</label>
}

function Label({ children, className }: ComponentProps) {
  const LabelClass = classNames(className)
  return <h3 className={LabelClass}> {children} </h3>
}

function Input({
  className,
  type,
  required,
  placeholder,
  autoComplete,
  checked,
  disabled = false,
  value,
  register,
}: InputProps) {
  return (
    <input
      className={className}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      checked={checked}
      disabled={disabled}
      value={value}
      {...register}
    />
  )
}

Form.FormField = FormField
Form.Label = Label
Form.Input = Input
