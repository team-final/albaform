import MainButton from '@/components/Button/MainButton/MainButton'
import VisibilityToggleButton from '@/components/Button/VisibilityToggleButton/VisibilityToggleButton'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker'
import {
  INITIAL_EDITING_FORM_DATA,
  useEditingFormStore,
} from '@/lib/stores/editingFormStore'
import {
  AddressSearchProps,
  EditingFormDataTypes,
  FieldProps,
  FormContextProps,
  FormProps,
  FormResetButtonProps,
  FormSubmitButtonProps,
  InputProps,
  LegendProps,
  TextareaProps,
} from '@/lib/types/formTypes'
import { ComponentProps } from '@/lib/types/types'
import classNames from 'classnames'
import {
  MouseEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  RegisterOptions,
  useForm,
} from 'react-hook-form'

import styles from './Form.module.scss'

// react-hook-form import 전달
const FormContext = createContext<FormContextProps | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useContext를 FormProvider 안에서 사용하세요.')
  }
  return context
}

// Field에서 label의 for, input의 id 매칭하고 전달
const FieldContext = createContext<
  | {
      forId: string
    }
  | undefined
>(undefined)

const useFieldContext = () => {
  const context = useContext(FieldContext)
  if (!context) {
    throw new Error('useContext를 FieldProvider 안에서 사용하세요.')
  }
  return context
}

/**
 * @param formId 필수
 * @param onSubmit 필수
 * @param children
 * @param className
 * @param defaultValues { 'name' : value }의 형태로 각 인풋의 초기값 설정
 * @example
 * <Form formId="testForm" onSubmit={handleSubmit}>
 *   <Form.Fieldset>
 *     <Form.Legend>사용자 유형</Form.Legend>
 *
 *     <Form.Field htmlFor="applicant">
 *       <Form.Label>지원자</Form.Label>
 *       <Form.Wrap>
 *         <Form.Input type="radio" name="userType" value="applicant" checked />
 *       </Form.Wrap>
 *     </Form.Field>
 *
 *     <Form.Field htmlFor="owner">
 *       <Form.Label>사장님</Form.Label>
 *       <Form.Wrap>
 *         <Form.Input type="radio" name="userType" value="owner" />
 *       </Form.Wrap>
 *     </Form.Field>
 *   </Form.Fieldset>
 *
 *   <Form.SubmitButton>등록하기</Form.SubmitButton>
 * </Form>
 */
export default function Form({
  children,
  className,
  formId,
  onSubmit,
  defaultValues = {},
  ...rest
}: FormProps) {
  const FormClass = classNames(styles.form, className)
  const {
    watch,
    getValues,
    getFieldState,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
    handleSubmit,
    register,
    setFocus,
  } = useForm({ mode: 'onChange', defaultValues })

  return (
    <FormContext.Provider
      value={{
        formId,
        onSubmit,
        watch,
        getValues,
        getFieldState,
        setValue,
        errors,
        isValid,
        isSubmitting,
        reset,
        register,
        setFocus,
      }}
    >
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className={FormClass}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

function Title({ children, className }: ComponentProps) {
  const FormTitleClass = classNames(styles['form-title'], className)
  return <header className={FormTitleClass}>{children}</header>
}

function FormResetButton({
  children,
  className,
  buttonStyle,
  color,
  onClick,
  ...rest
}: FormResetButtonProps) {
  const { reset } = useFormContext()
  return (
    <MainButton
      type={'reset'}
      className={className}
      buttonStyle={buttonStyle}
      color={color}
      onClick={() => {
        if (typeof onClick === 'function') onClick()
        reset()
      }}
      {...rest}
    >
      {children}
    </MainButton>
  )
}

function FormSubmitButton({
  children,
  buttonStyle,
  color,
  isPending,
}: FormSubmitButtonProps) {
  const { formId, isValid, isSubmitting } = useFormContext()
  const { formData } = useEditingFormStore()
  const [isComplete, setIsComplete] = useState<boolean>(true)

  useEffect(() => {
    if (formId === 'createForm') {
      setIsComplete(() => {
        const checkArr = []

        for (const key in formData) {
          if (
            [
              'imageUrls',
              'numberOfPositions',
              'gender',
              'education',
              'age',
              'preferred',
              'workStartTime',
              'workEndTime',
              'isNegotiableWorkDays',
              'hourlyWage',
              'isPublic',
            ].includes(key)
          )
            continue

          checkArr.push(
            key === 'workDays'
              ? formData[key].length === 0
              : formData[key] === INITIAL_EDITING_FORM_DATA[key],
          )
        }

        return checkArr.every((item) => !item)
      })
    }
  }, [formId, formData])

  return (
    <MainButton
      type={'submit'}
      buttonStyle={buttonStyle}
      color={color}
      disabled={!isComplete || !isValid || isSubmitting || isPending}
    >
      {children}
    </MainButton>
  )
}

function Fieldset({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-fieldset'], className)
  return <fieldset className={cn}>{children}</fieldset>
}

function Legend({ children, className, required }: LegendProps) {
  const cn = classNames(styles['form-legend'], className)
  return (
    <p className={cn}>
      {children}
      {required && (
        <span className={classNames(styles['form-input-required'])}>*</span>
      )}
    </p>
  )
}

/**
 * @param children
 * @param className
 * @param isInline - label과 input 한줄로
 * @param htmlFor - label과 input 묶음
 * @param hidden
 */
function Field({
  children,
  className,
  htmlFor = '',
  isInline = false,
  hidden,
}: FieldProps) {
  const [fieldId, setFieldId] = useState<string>(htmlFor || '')
  const { formId } = useFormContext()
  const cn = classNames(styles['form-field'], className, {
    [styles['form-field-inline']]: isInline,
    [styles['form-field-block']]: !isInline,
  })

  /**
   * @todo
   * 렌더링 전(서버) 과 후(클라이언트)에 생성되는 값이 달라서 발생하는 에러로 클라이언트 사이드에서 생성되도록 하면 해결할 수 있다.
   * useEffect 외에 해결방법이 없을까?
   *
   * @description
   * Warning: Prop `id` did not match. Server
   */
  // const generateForId = useCallback(() => {
  //   const labelName = htmlFor.replace(/\b[a-z]/, (letter) =>
  //     letter.toUpperCase(),
  //   ) // 첫 글자 대문자로
  //   const labelIdx = parseInt(String(Math.random() * 100)) // 난수 생성
  //   return formId + labelName + labelIdx
  // }, [formId, htmlFor])

  useEffect(() => {
    if (!htmlFor) {
      const generatedId = `${formId}-${crypto.randomUUID()}`
      setFieldId(generatedId)
    }
  }, [formId, htmlFor])

  return (
    <FieldContext.Provider value={{ forId: fieldId }}>
      <label className={cn} htmlFor={fieldId} hidden={hidden}>
        {children}
      </label>
    </FieldContext.Provider>
  )
}

function Label({ children, className }: ComponentProps) {
  const LabelClass = classNames(styles['form-label'], className)
  return <p className={LabelClass}>{children}</p>
}

function Wrapper({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-wrap'], className)
  return <div className={cn}>{children}</div>
}

function Unit({ unit }: { unit: string }) {
  return <span className={styles['form-unit']}>{unit}</span>
}

function ErrorMessage({
  error,
}: {
  error: FieldError | Merge<FieldErrorsImpl, any> | undefined
}) {
  if (!error) return null
  return (
    <p className={styles['input-error-message']}>
      {typeof error === 'object' &&
        'message' in error &&
        (error.message as string)}
    </p>
  )
}

/**
 * @param name input name 필수
 * @param className
 * @param type = [text, password, email, url, number, tel, search, date, time, datetime-local, month, week, color, file, checkbox, radio, submit, reset, button, image]
 * @param required
 * @param minLength
 * @param maxLength
 * @param hookFormPattern 정규표현식
 * @param validate 유효성 검사 함수
 */
function Input({
  className,
  type = 'text',
  name,
  required = false,
  minLength = 1,
  maxLength = 200,
  hookFormPattern,
  validate,
  workDaysValue,
  ...rest
}: InputProps) {
  const rules: RegisterOptions = {
    required,
    minLength,
    maxLength,
    pattern: hookFormPattern || undefined,
    validate,
  }
  const { register, errors, setValue, watch, getValues } = useFormContext()
  const { forId } = useFieldContext()
  const cn = classNames(styles['form-input'], className)
  const value = getValues(name)

  // 입력값 숨김 여부 상수
  const [visibility, setVisibility] = useState<boolean>(true)
  const inputType =
    type === 'password' ? (visibility ? 'password' : 'text') : type

  // confirm 인풋일 때 일치 유효성 검사
  const isConfirm = name.startsWith('confirm')
  const confirmInputName = name.replace('confirm', '').trim().toLowerCase()
  const confirmInputValue = watch(confirmInputName)

  if (isConfirm) {
    rules.validate = (value) => value === confirmInputValue
  }

  // 근무요일 인풋일 때 값 변환
  const syncFormFieldValue = useCallback(() => {
    if (value && name !== 'workDays') setValue(name, value)

    if (name === 'workDays') {
      const prev = getValues(name)
      if (JSON.stringify(prev) !== JSON.stringify(workDaysValue))
        setValue(name, workDaysValue)
    }
  }, [getValues, name, setValue, value, workDaysValue])

  useEffect(() => {
    syncFormFieldValue()
  }, [syncFormFieldValue])

  return (
    <>
      <input
        {...register(name, rules)}
        type={inputType}
        id={forId}
        className={cn}
        {...rest}
      />
      {type === 'password' && (
        <VisibilityToggleButton
          visibility={visibility}
          handleToggle={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setVisibility((prev) => !prev)
          }}
        />
      )}
      <ErrorMessage error={errors?.[name]} />
    </>
  )
}

function Textarea({
  className,
  name,
  required = false,
  minLength = 1,
  maxLength = 200,
  validate,
  ...rest
}: TextareaProps) {
  const rules: RegisterOptions = {
    required,
    validate,
    minLength,
    maxLength,
  }
  const { register, errors } = useFormContext()
  const { forId } = useFieldContext()
  const cn = classNames(styles['form-textarea'], className)

  return (
    <>
      <textarea
        {...register(name, rules)}
        className={cn}
        id={forId}
        rows={4}
        {...rest}
      />
      <ErrorMessage error={errors?.[name]} />
    </>
  )
}

function AddressInput({ name, placeholder, required }: AddressSearchProps) {
  const { formData, setFormData } = useEditingFormStore()
  const { formId, register, setValue } = useFormContext()
  const { forId } = useFieldContext()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const roadAddr = data.roadAddress
        setValue(name, roadAddr)
        if (formId === 'createForm') setFormData(name, roadAddr)
      },
    }).open()
  }

  const getFormDataValue =
    formId === 'createForm' && formData && name === 'location'
      ? formData.location
      : undefined

  return (
    <input
      {...register(name, { required })}
      type="text"
      className={classNames(styles['form-input'], styles['form-input-kakao'])}
      onClick={handleAddressSearch}
      placeholder={placeholder}
      value={getFormDataValue}
      readOnly
      id={forId}
    />
  )
}

// 달력 기간 인풋
function DateRange({
  startDate,
  endDate,
  required = false,
}: {
  startDate: EditingFormDataTypes
  endDate: EditingFormDataTypes
  required?: boolean
}) {
  const { formId, setFocus } = useFormContext()
  const { formData } = useEditingFormStore()

  useEffect(() => {}, [formData])

  return (
    <>
      <div hidden>
        <Form.Input
          type="hidden"
          name={startDate}
          required={required}
          value={formId === 'createForm' && formData[startDate]}
        />
        <Form.Input
          type="hidden"
          name={endDate}
          required={required}
          value={formId === 'createForm' && formData[endDate]}
        />
      </div>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setFocus={setFocus}
        startDateVal={formId === 'createForm' && formData[startDate]}
        endDateVal={formId === 'createForm' && formData[endDate]}
      />
    </>
  )
}

Form.Title = Title
Form.ResetButton = FormResetButton
Form.SubmitButton = FormSubmitButton

Form.Fieldset = Fieldset
Form.Legend = Legend

Form.Field = Field
Form.Label = Label
Form.Wrapper = Wrapper
Form.Unit = Unit
Form.Error = ErrorMessage

Form.Input = Input
Form.Textarea = Textarea

Form.DateRange = DateRange
Form.AddressInput = AddressInput
