import { UpdatePasswordProps, UpdateUserProps } from '@/lib/types/userTypes'
import { AxiosResponse } from 'axios'

import handleError from '../utils/errorHandler'
import authAxios from './authAxios'

export async function updateUserInfo(data: UpdateUserProps) {
  const response = await fetch('/api/updateUser', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.json()
}

export const updateUser = async (data: UpdateUserProps) => {
  try {
    const response = await authAxios.patch('/users/me', data)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function changeUserPassword(data: {
  newPassword: string
  currentPassword: string
}) {
  const response = await fetch('/api/updatePassword', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.json()
}

export const updateUserPassword = async (
  requestBody: UpdatePasswordProps,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.patch('users/me/password', requestBody)
  } catch (error) {
    handleError(error)
    throw error
  }
}
