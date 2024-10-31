import { UpdateUserValues } from '@/lib/types/userTypes'

import handleError from '../utils/errorHandler'
import authAxios from './authAxios'

export const updateUserInfo = async (data: UpdateUserValues) => {
  try {
    const response = await authAxios.patch('/users/me', data)
    return response.data
  } catch (error) {
    handleError(error)
  }
}
