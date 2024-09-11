import { postData } from '@/lib/api/apiClient'
import { CustomMessage } from '@/lib/types/types'

export const login = async (
  credentials: {
    email: string
    password: string
  },
  message: CustomMessage,
) => {
  return postData('/auth/sign-in', credentials, message)
}
