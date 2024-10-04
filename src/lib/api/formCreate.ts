/**
 * 알바폼 생성
 */
import { AxiosResponse } from 'axios'

import authAxios from './authAxios'

export const createAlbaForm = async (
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post('forms', requestBody)
  } catch (error) {
    console.error('알바폼 생성 중 오류 발생:', error)
    throw error
  }
}
