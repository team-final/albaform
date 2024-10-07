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

export const TEST_ID_APPLICANT = {
  email: 'testApplicant@email.com',
  password: '00000000',
}

export const TEST_ID_OWNER = {
  email: 'testOwner@email.com',
  password: '00000000',
}

export const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: '이메일 형식이 아닙니다.',
}

export const passwordPattern = {
  value: /^.{6,}$/,
  message: '비밀번호는 6자 이상이어야 합니다.',
}
