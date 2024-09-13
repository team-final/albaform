import {
  ComponentProps,
  FormFieldProps,
  FormProps,
  InputProps,
} from '@/lib/types/types'
import classNames from 'classnames'
import { createContext, useContext } from 'react'
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  useForm,
} from 'react-hook-form'

interface FormContextProps {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  onSubmit: (data: FieldValues) => void
}

const FormContext = createContext<FormContextProps | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useContext를 FormProvider 안에서 사용하세요.')
  }
  return context
}

/**
 * 'use client'
 * import { FieldValues } from 'react-hook-form'
 * function handleSubmit(data: FieldValues) {}
 *
 * @param formId 필수
 * @param onSubmit 필수
 * @param children
 * @param className
 * @param initialValues { 'name' : value }의 형태로 각 인풋의 초기값 설정
 */
export default function Form({
  children,
  className,
  formId,
  onSubmit,
  initialValues,
}: FormProps) {
  const FormClass = classNames(className, 'form')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  return (
    <FormContext.Provider value={{ register, errors, onSubmit }}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className={FormClass}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

function Title({ children, className }: ComponentProps) {
  const FormTitleClass = classNames(className, 'form-title')
  return <h2 className={FormTitleClass}>{children}</h2>
}

/**
 * FormField = label + input
 * @param children
 * @param className
 * @param isInline - label과 input 한줄로
 */
function Field({ children, className, isInline = false }: FormFieldProps) {
  const FormFieldClass = classNames(className, 'form-field', {
    'form-field-inline': isInline,
    'form-field-block': !isInline,
  })
  return <label className={FormFieldClass}>{children}</label>
}

function Label({ children, className }: ComponentProps) {
  const LabelClass = classNames(className)
  return <label className={LabelClass}> {children} </label>
}

/**
 * @param name input name 필수
 * @param className
 * @param type = [text, password, email, url, number, tel, search, date, time, datetime-local, month, week, color, file, checkbox, radio, submit, reset, button, image]
 * @param checked
 * @param disabled
 * @param required
 * @param minLength
 * @param maxLength
 * @param placeholder
 * @param autoComplete input name을 넣으면 그 input 자동완성
 * @param pattern 정규표현식
 * @param validate 유효성 검사 함수
 */
function Input({
  className,
  name,
  type = 'text',
  checked = false,
  disabled = false,
  required = false,
  minLength = 1,
  maxLength = 200,
  placeholder,
  autoComplete = 'off',
  pattern,
  validate,
}: InputProps) {
  const rules: RegisterOptions = {
    required,
    minLength,
    maxLength,
    pattern: pattern || undefined,
    validate,
  }
  const { register, errors } = useFormContext()
  return (
    <>
      <input
        {...register(name, rules)}
        className={className}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        checked={checked}
        disabled={disabled}
      />
      {errors?.[name] && (
        <span className={'input-error-message'}>잘못된 입력입니다.</span>
      )}
    </>
  )
}

Form.Title = Title
Form.Field = Field
Form.Label = Label
Form.Input = Input
