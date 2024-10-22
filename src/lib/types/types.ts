import { ReactNode } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

import { WorkDaysType } from './formTypes'

export interface CustomMessage {
  title?: string
  message?: string
}

export interface Params {
  params: {
    formId?: string
    applicationId?: string
    talkId?: number
    code?: string
    error?: string
    error_description?: string
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

export interface FormLegendProps extends ComponentProps {
  required?: boolean
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
  validate?: any
  initialValues?: string
  min?: number
  max?: number
  step?: number
  onClick?: (event?: any) => void
  onChange?: (event?: any) => void
  workDaysValue?: WorkDaysType
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

export type MyContentMenuType = 'posts' | 'comments' | 'scrap'
export interface MyContentMenu {
  value: MyContentMenuType
  label: string
}

export type ScrapListSortConditionType =
  | 'mostRecent'
  | 'highestWage'
  | 'mostApplied'
  | 'mostScrapped'
export interface ScrapListSortCondition {
  value: ScrapListSortConditionType
  label: string
}

export type RecrutingSortConditionType = null | boolean
export interface RecrutingSortCondition {
  value: RecrutingSortConditionType
  label: string
}

export type PublicSortConditionType = boolean
export interface PublicSortCondition {
  value: PublicSortConditionType
  label: string
}
