import {
  ComponentProps,
  FormFieldProps,
  FormProps,
  InputProps,
  LabelProps,
} from '@/lib/types/types'
import classNames from 'classnames'
import { ReactNode, createContext, useContext, useState } from 'react'
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  useForm,
} from 'react-hook-form'

import styles from './Form.module.scss'

interface FormContextProps {
  formId: string
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
  const FormClass = classNames(styles.form, className)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  return (
    <FormContext.Provider value={{ formId, register, errors, onSubmit }}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className={FormClass}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

function Title({ children, className }: ComponentProps) {
  const FormTitleClass = classNames(styles['form-title'], className)
  return <header className={FormTitleClass}>{children}</header>
}

function Fieldset({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-fieldset'], className)
  return <section className={cn}>{children}</section>
}

function Legend({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-legend'], className)
  return <p className={cn}>{children}</p>
}

interface LabelContextProps {
  formId: string
  labelName: string
  labelIdx: number
}

const LabelContext = createContext<LabelContextProps | undefined>(undefined)

export const useLabelContext = () => {
  const context = useContext(LabelContext)
  if (!context) {
    throw new Error('useContext를 LabelProvider 안에서 사용하세요.')
  }
  return context
}

/**
 * FormField = label + input
 * @param children
 * @param className
 * @param isInline - label과 input 한줄로
 */
function Field({
  children,
  className,
  htmlFor = '',
  isInline = false,
}: FormFieldProps) {
  const { formId } = useFormContext()
  const cn = classNames(styles['form-field'], className, {
    [styles['form-field-inline']]: isInline,
    [styles['form-field-block']]: !isInline,
  })

  const labelName = htmlFor.replace(/\b[a-z]/, (letter) => letter.toUpperCase()) // 첫 글자 대문자로
  const labelIdx = parseInt(String(Math.random() * 100)) // 난수 생성

  return (
    <LabelContext.Provider value={{ formId, labelName, labelIdx }}>
      <label className={cn} htmlFor={formId + labelName + labelIdx}>
        {children}
      </label>
    </LabelContext.Provider>
  )
}

function Label({ children, className }: LabelProps) {
  const LabelClass = classNames(styles['form-label'], className)
  return <p className={LabelClass}>{children}</p>
}

function Wrap({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-wrap'], className)
  return <div className={cn}>{children}</div>
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
  value,
  validate,
}: InputProps) {
  const rules: RegisterOptions = {
    required,
    minLength,
    maxLength,
    pattern: pattern || undefined,
    validate,
  }
  const [visibility, setVisibility] = useState<boolean>(true)
  const { formId, register, errors } = useFormContext()
  const { labelName, labelIdx } = useLabelContext()
  const cn = classNames(styles['form-input'], className)

  const inputType =
    type === 'password' ? (visibility ? 'password' : 'text') : type

  return (
    <>
      <input
        {...register(name, rules)}
        className={cn}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        checked={checked}
        disabled={disabled}
        id={formId + labelName + labelIdx}
        value={value}
      />
      {type === 'password' && (
        <VisibilityToggleButton
          visibility={visibility}
          handleToggle={() => {
            setVisibility((prev) => !prev)
          }}
        />
      )}
      {errors?.[name] && (
        <p className={styles['input-error-message']}>잘못된 입력입니다.</p>
      )}
    </>
  )
}

function Textarea({
  className,
  name,
  disabled = false,
  required = false,
  placeholder,
  validate,
}: InputProps) {
  const rules: RegisterOptions = {
    required,
    validate,
  }
  const { formId, register, errors } = useFormContext()
  const { labelName, labelIdx } = useLabelContext()
  const cn = classNames(styles['form-input'], className)

  return (
    <>
      <input
        {...register(name, rules)}
        className={cn}
        placeholder={placeholder}
        disabled={disabled}
        id={formId + labelName + labelIdx}
      />
      {errors?.[name] && (
        <p className={styles['input-error-message']}>잘못된 입력입니다.</p>
      )}
    </>
  )
}

interface VisibilityToggleButtonProps {
  visibility: boolean
  handleToggle: () => void
}

function VisibilityToggleButton({
  visibility,
  handleToggle,
}: VisibilityToggleButtonProps) {
  return (
    <button
      type="button"
      data-visibility={visibility}
      onClick={handleToggle}
      className={styles['visibility-toggle-button']}
    ></button>
  )
}
interface SubmitButtonProps {
  buttonStyle: 'solid' | 'outline'
  children: ReactNode
}

function SubmitButton({ buttonStyle, children }: SubmitButtonProps) {
  console.log(buttonStyle)
  console.log(children)
}

Form.Title = Title
Form.Fieldset = Fieldset
Form.Legend = Legend
Form.Field = Field
Form.Label = Label
Form.Wrap = Wrap
Form.Input = Input
Form.Textarea = Textarea
Form.SubmitButton = SubmitButton
