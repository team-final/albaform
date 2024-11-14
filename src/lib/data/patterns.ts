export const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: '이메일 형식이 아닙니다.',
}

export const passwordPattern = {
  value: /^.{8,}$/,
  message: '비밀번호는 8자 이상이어야 합니다.',
}

export const phoneNumberPattern = {
  value: /^[0-9]{10,11}$/,
  message: '잘못된 입력입니다.',
}
