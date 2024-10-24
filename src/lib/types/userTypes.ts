export interface SignInValues {
  email: string
  password: string
}

export type UserRole = 'APPLICANT' | 'OWNER'

export interface SignUpFormValues extends SignInValues {
  role: UserRole
}

export interface UserCore {
  nickname: string
  name: string
  phoneNumber: string
  storeName: string
  storePhoneNumber: string
  location: string
}

export interface CreateUserValues extends UserCore, SignUpFormValues {}

export interface UpdateUserValues extends UserCore {
  imageUrl: string
}

export interface User extends UpdateUserValues {
  id: number
  role: UserRole
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export type OauthService = 'kakao'
