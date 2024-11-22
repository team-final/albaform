import { MinLength8 } from '@/lib/data/patterns'

export type UserRole = 'APPLICANT' | 'OWNER'

export interface SignInProps {
  email: string
  password: MinLength8<string>
}

export interface UpdatePasswordProps {
  currentPassword: MinLength8<string>
  newPassword: MinLength8<string>
}

export interface SignUpFormValues extends SignInProps {
  role: UserRole
}

export interface UpdateUserProps {
  nickname: string
  name: string
  phoneNumber: string
  storeName?: string
  storePhoneNumber?: string
  location?: string
  imageUrl: string
}

export interface SignUpProps extends SignUpFormValues, UpdateUserProps {}

export interface FixedUserValues {
  id: number
  role: UserRole
  email: string
}

export interface User extends UpdateUserProps, FixedUserValues {}

export interface Credentials {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse extends Credentials {
  user: User
}

export type AuthProvider = undefined | 'kakao'
