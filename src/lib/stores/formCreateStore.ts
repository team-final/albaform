import { create } from 'zustand'

import {
  AgeType,
  EducationType,
  FORM_DATA,
  FORM_DATA_TYPE,
  FORM_DATA_VALUE,
  GenderType,
  NumberOfPositionsType,
  PreferredType,
  STEP_INDEX,
  workDaysType,
} from '../types/types'

/** 30분 단위 근무시간 배열 생성 */
const workTimeArray: () => string[] = (): string[] => {
  const arr: string[] = []
  for (let i = 0; i < 24; i++) {
    const hh: string = (i * 0.01).toFixed(2).split('.').pop() || '00'
    arr.push(`${hh}:00`, `${hh}:30`)
  }
  return arr
}

/** 최저시급정보 */
export const hourlyWageData: {
  min: number
  as: number
} = {
  min: 9860,
  as: 2024,
}

/**
 * @todo
 * 주 length 일
 * sat, sun 만 없으면 평일
 * sat, sun 만 있으면 주말
 */
export const VALUE_PRESET: {
  numberOfPositions: NumberOfPositionsType[]
  gender: GenderType[]
  education: EducationType[]
  age: AgeType[]
  preferred: PreferredType[]
  workTime: string[]
  workDays: workDaysType
} = {
  numberOfPositions: ['00명 (인원미정)', '직접입력'],
  gender: ['성별무관', '남성', '여성'],
  education: ['학력무관', '고등학교 졸업', '대학교 졸업'],
  age: [
    '20세 ~ 29세',
    '30세 ~ 39세',
    '40세 ~ 49세',
    '50세 ~ 59세',
    '60세 이상',
    '직접입력',
  ],
  preferred: ['없음', '직접입력'],
  workTime: workTimeArray(),
  workDays: ['일', '월', '화', '수', '목', '금', '토'],
}

export const INITIAL_FORM_DATA: FORM_DATA = {
  /* 알바폼 제목 */
  title: '',
  /* 소개글 */
  description: '',
  /* 모집기간 시작일 */
  recruitmentStartDate: '',
  /* 모집기간 종료일 */
  recruitmentEndDate: '',
  /* 이미지 파일 */
  imageUrls: [],
  /* 모집인원 */
  numberOfPositions: VALUE_PRESET.numberOfPositions[0],
  /* 성별 */
  gender: VALUE_PRESET.gender[0],
  /* 학력 */
  education: VALUE_PRESET.education[0],
  /* 연령 */
  age: VALUE_PRESET.age[0],
  /* 우대사항 */
  preferred: VALUE_PRESET.preferred[0],
  /* 근무 위치 */
  location: '',
  /* 근무기간 시작일 */
  workStartDate: '',
  /* 근무기간 종료일 */
  workEndDate: '',
  /* 근무 시간 시작 */
  workStartTime: VALUE_PRESET.workTime[0],
  /* 근무 시간 종료 */
  workEndTime: VALUE_PRESET.workTime[0],
  /* 근무 요일 */
  workDays: [],
  /* 요일 협의 가능 */
  isNegotiableWorkDays: false,
  /* 시급 */
  hourlyWage: hourlyWageData.min,
  /* 공개 설정 */
  isPublic: false,
}

interface FormCreateStore {
  step: STEP_INDEX
  setStep: (index: STEP_INDEX) => void
  formData: FORM_DATA
  initialFormData: () => void
  setFormData: (key: FORM_DATA_TYPE, value: FORM_DATA_VALUE) => void
  // inProgress: (step: STEP_INDEX) => {
  //   step: STEP_INDEX
  //   inProgress: boolean
  //   state: any
  // }
}

export const useFormCreateStore = create<FormCreateStore>((set) => ({
  step: 1,
  setStep: (index: STEP_INDEX) => set(() => ({ step: index })),

  formData: INITIAL_FORM_DATA,
  initialFormData: () =>
    set(() => ({
      formData: INITIAL_FORM_DATA,
    })),
  setFormData: (key: FORM_DATA_TYPE, value: FORM_DATA_VALUE) =>
    set((state) => ({ formData: { ...state.formData, [key]: value } })),
  // inProgress: (step: STEP_INDEX) =>
  //   set((state: FORM_DATA) => {
  //     return { step, inProgress: false, state }
  //   }),
}))
