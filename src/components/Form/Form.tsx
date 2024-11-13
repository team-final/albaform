import MainButton, {
  buttonColor,
  buttonStyle,
} from '@/components/Button/MainButton/MainButton'
import VisibilityToggleButton from '@/components/Button/VisibilityToggleButton/VisibilityToggleButton'
import {
  INITIAL_EDITING_FORM_DATA,
  useEditingFormStore,
} from '@/lib/stores/editingFormStore'
import { EditingFormDataTypes } from '@/lib/types/formTypes'
import {
  ComponentProps,
  FormFieldProps,
  FormLegendProps,
  FormProps,
  InputProps,
} from '@/lib/types/types'
import classNames from 'classnames'
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from 'react-hook-form'

import DateRangePicker from '../DateRangePicker/DateRangePicker'
import styles from './Form.module.scss'

interface FormContextProps {
  formId: string
  onSubmit: (data: FieldValues) => void
  watch: UseFormWatch<FieldValues>
  getValues: UseFormGetValues<FieldValues>
  getFieldState: UseFormGetFieldState<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors
  isValid: boolean
  isSubmitting: boolean
  reset: () => void
  register: UseFormRegister<FieldValues>
  setFocus: UseFormSetFocus<FieldValues>
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
 * @param defaultValues { 'name' : value }의 형태로 각 인풋의 초기값 설정
 *
 * @description
 * <Form> => form 태그로 폼을 생성합니다. formId 와 submit 함수가 필요합니다.
 * <Form.Title> => 해당 폼의 제목을 작성할 때 사용합니다.
 * <Form.Fieldset> => form 의 기본 입력 단위입니다. section 태그이며, 하나 또는 여러개의 input 이 필요합니다.
 * <Form.Legend> => 해당 input (들)의 이름을 작성할 때 사용합니다.
 * <Form.Field> => 한개의 input 담는 label 단위로 htmlFor 가 필요합니다.
 * <Form.Label> => p 태그 입니다. 해당 input 의 값 또는 이름을 작성하고 스타일랑이 필요합니다.
 * <Form.Wrap> => input 을 감싸는 div 입니다. input 을 조작하는 버튼을 위치하기 위해 존재합니다.
 * <Form.Input> => input 태그입니다. input 에 사용되는 property 들이 필요합니다.
 * <Form.Textarea> => textarea 태그입니다. textarea 에 사용되는 property 들이 필요합니다.
 * <Form.SubmitButton> => 해당 form 의 submit 함수를 실행하는 버튼입니다. 1개만 존재 해야합니다.
 *
 * @example
 * <Form formId="testForm" onSubmit={handleSubmit}>
 *
 *   // input 하나만 다룰 때
 *   <Form.Fieldset>
 *     <Form.Legend>이메일</Form.Legend>
 *     <Form.Field htmlFor="email">
 *       <Form.Wrap>
 *         <Form.Input type="email" name="email" placeholder="이메일을 입력해 주세요" pattern={emailPattern} required />
 *       </Form.Wrap>
 *     </Form.Field>
 *   </Form.Fieldset>
 *
 *   // input 여러개를 다룰 때
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

/**
 * 해당 폼의 제목을 작성할 때 사용합니다.
 */
function Title({ children, className }: ComponentProps) {
  const FormTitleClass = classNames(styles['form-title'], className)
  return <header className={FormTitleClass}>{children}</header>
}

/**
 * form 의 기본 입력 단위입니다. section 태그이며, 하나 또는 여러개의 input 이 필요합니다.
 */
function Fieldset({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-fieldset'], className)
  return <section className={cn}>{children}</section>
}

/**
 * 해당 input (들)의 이름을 작성할 때 사용합니다.
 */
function Legend({ children, className, required }: FormLegendProps) {
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

interface LabelContextProps {
  forId: string
}

const LabelContext = createContext<LabelContextProps | undefined>(undefined)

/**
 * label 의 for , input 의 id 를 매칭시키기 위한 커스텀훅
 */
export const useLabelContext = () => {
  const context = useContext(LabelContext)
  if (!context) {
    throw new Error('useContext를 LabelProvider 안에서 사용하세요.')
  }
  return context
}

/**
 * 한개의 input 담는 label 단위로 htmlFor 가 필요합니다.
 * @param children
 * @param className
 * @param isInline - label과 input 한줄로
 * @param htmlFor
 * @param hidden
 */
function Field({
  children,
  className,
  htmlFor = '',
  isInline = false,
  hidden,
}: FormFieldProps) {
  const [forId, setForId] = useState<string>('')
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
  const generateForId = useCallback(() => {
    const labelName = htmlFor.replace(/\b[a-z]/, (letter) =>
      letter.toUpperCase(),
    ) // 첫 글자 대문자로
    const labelIdx = parseInt(String(Math.random() * 100)) // 난수 생성
    return formId + labelName + labelIdx
  }, [formId, htmlFor])

  useEffect(() => {
    const getForId = generateForId()
    setForId(getForId)
  }, [generateForId])

  return (
    <LabelContext.Provider value={{ forId }}>
      <label className={cn} htmlFor={forId} hidden={hidden}>
        {children}
      </label>
    </LabelContext.Provider>
  )
}

/**
 * 해당 input 의 값 또는 이름을 작성하고 스타일랑이 필요합니다.
 */
function Label({ children, className }: ComponentProps) {
  const LabelClass = classNames(styles['form-label'], className)
  return <p className={LabelClass}>{children}</p>
}

function Value({ name }: { name: string }) {
  const { getValues } = useFormContext()
  const value = getValues(name)
  return <p>{value}</p>
}

/**
 * input 을 감싸는 div 입니다. input 을 조작하는 버튼을 위치하기 위해 존재합니다.
 */
function Wrap({ children, className }: ComponentProps) {
  const cn = classNames(styles['form-wrap'], className)
  return <div className={cn}>{children}</div>
}

/**
 * input 태그입니다. input 에 사용되는 property 들이 필요합니다.
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
  type = 'text',
  name,
  disabled = false,
  required = false,
  minLength = 1,
  maxLength = 200,
  placeholder,
  autoComplete = 'off',
  pattern,
  validate,
  value,
  workDaysValue,
  ...rest
}: InputProps) {
  const rules: RegisterOptions = {
    required,
    minLength,
    maxLength,
    pattern: pattern || undefined,
    validate,
  }
  const { register, errors, setValue, watch, getValues } = useFormContext()
  const error = errors?.[name]
  const { forId } = useLabelContext()
  const cn = classNames(styles['form-input'], className)

  /**
   * confirm으로 시작하는 input의 일치 유효성을 검사하는 함수 설정
   */
  const isConfirm = name.startsWith('confirm')
  const confirmInputName = name.replace('confirm', '').trim().toLowerCase()
  const confirmInputValue = watch(confirmInputName)

  if (isConfirm) {
    rules.validate = (value) => value === confirmInputValue
  }

  /**
   * password 내용의 가시성을 토글하기 위한 상수.
   */
  const [visibility, setVisibility] = useState<boolean>(true)
  const inputType =
    type === 'password' ? (visibility ? 'password' : 'text') : type

  const handleEffect = useCallback(() => {
    if (value && name !== 'workDays') setValue(name, value)

    if (name === 'workDays') {
      const prev = getValues(name)
      if (JSON.stringify(prev) !== JSON.stringify(workDaysValue))
        setValue(name, workDaysValue)
    }
  }, [getValues, name, setValue, value, workDaysValue])

  useEffect(() => {
    handleEffect()
  }, [handleEffect])

  return (
    <>
      <input
        {...register(name, rules)}
        type={inputType}
        id={forId}
        className={cn}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
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
      {error && (
        <p className={styles['input-error-message']}>
          {typeof error === 'object' &&
            'message' in error &&
            (error.message as string)}
        </p>
      )}
    </>
  )
}

function Unit({ unit }: { unit: string }) {
  return <span className={styles['form-unit']}>{unit}</span>
}

interface ImageInputProps extends InputProps {
  onImageChange?: (file: File) => void
}

function ImageInput({
  className,
  name,
  disabled = false,
  required = false,
  onImageChange,
}: ImageInputProps) {
  const { register, setValue } = useFormContext()
  const { forId } = useLabelContext()
  const cn = classNames(
    styles['form-input'],
    styles['form-input-file'],
    className,
  )

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue(name, file)
      if (onImageChange) {
        onImageChange(file)
      }
    }
  }

  return (
    <>
      <input
        {...register(name, { required })}
        className={cn}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={disabled}
        id={forId}
      />
    </>
  )
}

/**
 * textarea 태그입니다. textarea 에 사용되는 property 들이 필요합니다.
 */
function Textarea({
  className,
  name,
  disabled = false,
  required = false,
  placeholder,
  minLength = 1,
  maxLength = 200,
  validate,
  ...rest
}: InputProps) {
  const rules: RegisterOptions = {
    required,
    validate,
    minLength,
    maxLength,
  }
  const { register, errors } = useFormContext()
  const { forId } = useLabelContext()
  const cn = classNames(styles['form-textarea'], className)

  return (
    <>
      <textarea
        {...register(name, rules)}
        className={cn}
        placeholder={placeholder}
        disabled={disabled}
        id={forId}
        rows={4}
        {...rest}
      />
      {errors?.[name] && (
        <p className={styles['input-error-message']}>잘못된 입력입니다.</p>
      )}
    </>
  )
}

declare global {
  interface Window {
    daum: any
  }
}

interface KakaoSearchInputProps {
  name: string
  placeholder?: string
  required?: boolean
}
function KakaoSearchInput({
  name,
  placeholder,
  required,
}: KakaoSearchInputProps) {
  const { formData, setFormData } = useEditingFormStore()
  const { formId, register, setValue } = useFormContext()
  const { forId } = useLabelContext()

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

function DateRangePickerInput({
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

interface ResetButtonProps extends ComponentProps {
  buttonStyle?: buttonStyle
  color?: buttonColor
  onClick?: () => void
}

/**
 * 해당 form 을 초기화하는 버튼입니다.
 */
function ResetButton({
  children,
  className,
  buttonStyle,
  color,
  onClick,
  ...rest
}: ResetButtonProps) {
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

interface SubmitButtonProps {
  children: ReactNode
  buttonStyle?: 'solid' | 'outline'
  color?: 'primary' | 'gray'
  isPending?: boolean
}

/**
 * 해당 form 의 onSubmit prop 으로 등록된 함수를 실행하는 버튼입니다.
 */
function SubmitButton({
  children,
  buttonStyle,
  color,
  isPending,
}: SubmitButtonProps) {
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

Form.Title = Title
Form.Fieldset = Fieldset
Form.Legend = Legend
Form.Field = Field
Form.Label = Label
Form.Wrap = Wrap
Form.Value = Value
Form.Input = Input
Form.Unit = Unit
Form.Textarea = Textarea
Form.KakaoSearchInput = KakaoSearchInput
Form.DateRangePickerInput = DateRangePickerInput
Form.ResetButton = ResetButton
Form.SubmitButton = SubmitButton
Form.ImageInput = ImageInput
