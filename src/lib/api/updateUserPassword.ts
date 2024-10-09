import { AxiosResponse } from 'axios'

import handleError from '../utils/errorHandler'
import authAxios from './authAxios'

interface updateUserPasswordProps {
  newPassword: string
  currentPassword: string
}

export const updateUserPassword = async (
  requestBody: updateUserPasswordProps,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.patch('users/me/password', requestBody)
  } catch (error) {
    handleError(error)
    throw error
  }
}
