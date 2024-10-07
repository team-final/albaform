export interface User {
  id: number
  email: string
  name: string
  nickname: string
  imageUrl: string | null
  role: 'APPLICANT' | 'OWNER'
  storeName: undefined | string
  storePhoneNumber: undefined | string
  phoneNumber: undefined | string
  location: undefined | string
}

export interface SignInValues {
  email: string
  password: string
}

export interface SignUpValues extends SignInValues {
  role: 'APPLICANT' | 'OWNER'
}

export interface CompleteSignUpValues extends SignUpValues {
  name: string
  nickname: string
  storeName: undefined | string
  storePhoneNumber: undefined | string
  phoneNumber: undefined | string
  location: undefined | string
}

export type UserRole = 'APPLICANT' | 'OWNER'
