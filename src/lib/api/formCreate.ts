/**
 * 알바폼 생성
 */
import { AxiosResponse } from 'axios'

import authAxios from './axiosWithCredentials'

export const postAlbaForm = async (
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post('forms', requestBody)
  } catch (error) {
    console.error('알바폼 생성 중 오류 발생:', error)
    throw error
  }
}

export const patchAlbaForm = async (
  formId: number,
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.patch(`forms/${formId}`, requestBody)
  } catch (error) {
    console.error('알바폼 수정 중 오류 발생:', error)
    throw error
  }
}
