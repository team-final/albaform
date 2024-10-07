import { create } from 'zustand'

import { TEMP_CREATE_FORM, hourlyWageData } from '../data/constants'
import {
  AgeType,
  EducationType,
  FORM_DATA,
  FORM_DATA_TYPE,
  FORM_DATA_VALUE,
  FORM_INPROGRESS,
  GenderType,
  NumberOfPositionsType,
  PreferredType,
  STEP_INDEX,
  TEMP_CREATE_FORM_TYPE,
  workDays,
} from '../types/formTypes'

/** 30분 단위 근무시간 배열 생성 */
const workTimeArray: () => string[] = (): string[] => {
  const arr: string[] = []
  for (let i = 0; i < 24; i++) {
    const hh: string = (i * 0.01).toFixed(2).split('.').pop() || '00'
    arr.push(`${hh}:00`, `${hh}:30`)
  }
  return arr
}

/**
 * @todo
 * 주 length 일
 * sat, sun 만 없으면 평일
 * sat, sun 만 있으면 주말
 */
export const VALUE_PRESET: {
  numberOfPositions: readonly NumberOfPositionsType[]
  gender: readonly GenderType[]
  education: readonly EducationType[]
  age: readonly AgeType[]
  preferred: readonly PreferredType[]
  workTime: readonly string[]
  workDays: readonly workDays[]
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

export const INITIAL_FORM_DATA: Readonly<FORM_DATA> | any = {
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

const INPROGRESS_PRESET: FORM_INPROGRESS[] = [
  { step: 1, isProgress: false },
  { step: 2, isProgress: false },
  { step: 3, isProgress: false },
]

export interface FormCreateStore {
  step: STEP_INDEX
  setStep: (index: STEP_INDEX) => void

  formData: Readonly<FORM_DATA> | any
  initialFormData: () => void
  setFormData: (
    key: FORM_DATA_TYPE | string,
    value: FORM_DATA_VALUE | string,
  ) => void

  inProgress: FORM_INPROGRESS[]
  initialInProgress: () => void
  setInProgress: (data: FORM_INPROGRESS) => void

  temporaryFormDatas: TEMP_CREATE_FORM_TYPE[] | []
  setTemporaryFormData: (tempFormData: TEMP_CREATE_FORM_TYPE[]) => void
  delTemporaryFormData: ({ id, createAt }: TEMP_CREATE_FORM_TYPE) => void
}

export const useFormCreateStore = create<FormCreateStore>((set) => ({
  step: 1,
  setStep: (index: STEP_INDEX) => set(() => ({ step: index })),

  formData: INITIAL_FORM_DATA,
  initialFormData: () =>
    set(() => ({
      formData: INITIAL_FORM_DATA,
      inProgress: INPROGRESS_PRESET,
    })),
  setFormData: (
    key: FORM_DATA_TYPE | string,
    value: FORM_DATA_VALUE | string,
  ) => set((state) => ({ formData: { ...state.formData, [key]: value } })),

  inProgress: INPROGRESS_PRESET,
  initialInProgress: () => set(() => ({ inProgress: INPROGRESS_PRESET })),
  setInProgress: ({ step, isProgress }: FORM_INPROGRESS) =>
    set((state) => ({
      inProgress: state.inProgress.map((item) =>
        item.step === step ? { step, isProgress } : item,
      ),
    })),

  temporaryFormDatas: [],
  setTemporaryFormData: (tempFormData: TEMP_CREATE_FORM_TYPE[]) =>
    set(() => {
      localStorage.setItem(TEMP_CREATE_FORM, JSON.stringify(tempFormData))
      return { temporaryFormDatas: tempFormData }
    }),
  delTemporaryFormData: ({ id, createAt }) =>
    set((state) => {
      const filtered = state.temporaryFormDatas.filter(
        (item) => !(item.id === id && item.createAt === createAt),
      )

      localStorage.setItem(TEMP_CREATE_FORM, JSON.stringify(filtered))
      return {
        temporaryFormDatas: filtered,
      }
    }),
}))
