import { VALUE_PRESET } from '@/lib/stores/editingFormStore'

export const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: '이메일 형식이 아닙니다.',
}

export type MinLength8<T extends string> =
  T extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}`
    ? T
    : never

export const passwordValidation = {
  value: 8,
  message: '비밀번호는 8자 이상입니다.',
}

export const phoneNumberValidation = {
  value: /^[0-9]{10,11}$/,
  message: '10~11자리 숫자를 입력해 주세요.',
}

const positiveNumberPattern = /^[1-9][0-9]*(\.[0-9]+)?$/

export const monthsOfExperienceValidation = {
  value: positiveNumberPattern,
  message: '음수나 0은 입력할 수 없습니다.',
}

export const numberOfPositionsValidation = {
  value: /^[1-9][0-9]*|0(\.[0-9]+)?$/,
  message: '음수는 입력할 수 없습니다.',
}

export const validateAge = (age: string) => {
  if (VALUE_PRESET.age.includes(age)) {
    return true
  }
  if (age !== '직접입력' && !isNaN(Number(age))) {
    if (Number(age) >= 0 && Number(age) < 18) {
      return '18세 미만은 보호자의 동의가 필요합니다.'
    }
    return '음수나 0은 입력할 수 없습니다.'
  }
}
