export const DEFAULT_ERROR_MESSAGE = {
  title: '오류',
}

export const SIGN_IN_ERROR_MESSAGE = {
  title: '로그인 실패',
}

export const AUTH_USER_ERROR_MESSAGE = {
  title: '사용자 로드 실패',
}

export const SIGN_UP_ERROR_MESSAGE = {
  title: '회원 가입 실패',
}

export const SAVE_ERROR_MESSAGE = {
  title: '저장 실패',
}

export const TEST_ID_APPLICANT = {
  email: 'testApplicant@email.com',
  password: '00000000',
}

export const TEST_ID_OWNER = {
  email: 'testOwner@email.com',
  password: '00000000',
}

export const TEST_ACOUNT: Record<string, Record<string, string>[]> = {
  APPLICANT: [
    { email: 'example29@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example95@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example27@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example6759@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example9451@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example7779@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example4611@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example7827@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example6951@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example5767@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example6243@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example3407@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example8205@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example4269@email.com', password: '00000000', role: 'APPLICANT' },
    { email: 'example2977@email.com', password: '00000000', role: 'APPLICANT' },
  ],
  OWNER: [
    { email: 'example68@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example48@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example96@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example68@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example8800@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example1198@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example8882@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example4698@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example5282@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example1862@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example368@email.com', password: '00000000', role: 'OWNER' },
    { email: 'example8984@email.com', password: '00000000', role: 'OWNER' },
  ],
}

/** 알바폼 만들기 임시 저장 */
export const TEMP_CREATE_FORM = 'albaform_create_temporary_save'

/** 최저시급정보 */
export const HOURLY_WAGE_DATA: {
  min: number
  as: number
} = {
  min: 9860,
  as: 2024,
}
