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

export interface ApplicationProps {
  id: number
  applicantId: number
  name: string
  phoneNumber: string
  experienceMonths: number
  status: string
}

export const FORM_STATUS = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접 대기',
  INTERVIEW_COMPLETED: '면접 완료',
  HIRED: '채용 완료',
} as const

export type FormStatusType = keyof typeof FORM_STATUS
export type FormStatusWord = (typeof FORM_STATUS)[FormStatusType]
