import { FieldValues } from 'react-hook-form'

export type StepIndex = 1 | 2 | 3
export type StepTitle = '모집 내용' | '모집 조건' | '근무 조건'

export const STEP_BUTTONS: { index: StepIndex; title: StepTitle }[] = [
  { index: 1, title: '모집 내용' },
  { index: 2, title: '모집 조건' },
  { index: 3, title: '근무 조건' },
]

export interface FormCreateStepProp {
  step: StepIndex
}

export type FormInProgress = { step: StepIndex; isProgress: boolean }

export type NumberOfPositionsType = '00명 (인원미정)' | '직접입력' | number
export type GenderType = '성별무관' | '남성' | '여성'
export type EducationType = '학력무관' | '고등학교 졸업' | '대학교 졸업'
export type AgeType =
  | '20세 ~ 29세'
  | '30세 ~ 39세'
  | '40세 ~ 49세'
  | '50세 ~ 59세'
  | '60세 이상'
  | '직접입력'
  | string
export type PreferredType = '없음' | '직접입력' | string
export type WorkDaysType = '일' | '월' | '화' | '수' | '목' | '금' | '토'

export interface ImageUrl {
  /** 이미지 주소 */
  url: string
  /** 이미지 이름 */
  name: string
}

export interface FormStep1 {
  title: string
  description: string
  recruitmentStartDate: Date | string
  recruitmentEndDate: Date | string
  imageUrls: ImageUrl[]
}

export interface FormStep2 {
  numberOfPositions: NumberOfPositionsType
  gender: GenderType
  education: EducationType
  age: AgeType
  preferred: PreferredType
}

export interface FormStep3 {
  location: string
  workStartDate: Date | string
  workEndDate: Date | string
  workStartTime: string
  workEndTime: string
  workDays: WorkDaysType[]
  isNegotiableWorkDays: boolean
  hourlyWage: number
  isPublic: boolean
}

export interface EditingFormData extends FormStep1, FormStep2, FormStep3 {}
export type EditingFormDataTypes = keyof EditingFormData
export type EditingFormDataValues = EditingFormData[EditingFormDataTypes]

export interface TempEditingFormType {
  id: number
  createAt: string
  formData: EditingFormData | FieldValues
}

export interface AddtalkProps {
  title: string
  content: string
  imageUrl: string
}

export interface AlbatalkProps {
  writer: {
    /** 작성자 프로필 */
    imageUrl: string
    /** 작성자 이름 */
    nickname: string
    /** 작성자 식별번호 */
    id: number
  }
  /** 수정일 */
  updatedAt: string
  /** 생성일 */
  createdAt: string
  /** 댓글 수 */
  commentCount: number
  /** 좋아요 수 */
  likeCount: number
  /** 첨부 이미지 */
  imageUrl: string
  /** 내용 */
  content: string
  /** 제목 */
  title: string
  /** 게시물 식별번호 */
  id: number
  /** 좋아요 여부 */
  isLiked: true
}

export interface AnnoucementProps {
  createdAt: string
  recruitmentEndDate: string
  recruitmentStartDate: string
  isPublic: boolean
}

export interface ApplicationStatusProps {
  formId: number
  formDetails: {
    recruitmentEndDate: string
  }
  applicationId?: number
  isOwner: boolean
}

export interface ContactInfoProps {
  id: number
  ownerId: number
  recruitmentEndDate: string
  recruitmentStartDate: string
  storePhoneNumber: string
  phoneNumber: string
}

export interface CurrentApplicationProps {
  ownerId: number
  applyCount: number
}

export interface FormDetailsInfoProps {
  applyCount: number
  storeName: string
  description: string
}

export interface ImageProps {
  imageUrls: string[] | string
}

export interface LocationProps {
  location: string
  storeName: string
}

export interface RequirementsProps {
  numberOfPositions: number
  preferred: string
  age: string
  education: string
  gender: string
}

export interface WorkScheduleProps {
  hourlyWage: number
  workEndDate: string
  workStartDate: string
  isNegotiableWorkDays: boolean
  workDays: string[]
  workEndTime: string
  workStartTime: string
}

export interface FormDetailsProps {
  applyCount: number
  storeName: string
  title: string
  description: string
}

export type CombinedFormDetailsProps = FormDetailsProps &
  AnnoucementProps &
  WorkScheduleProps &
  ContactInfoProps & {
    location: string
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

export const FORM_STATUS_REVERSED = {
  거절: 'REJECTED',
  '면접 대기': 'INTERVIEW_PENDING',
  '면접 완료': 'INTERVIEW_COMPLETED',
  '채용 완료': 'HIRED',
} as const
