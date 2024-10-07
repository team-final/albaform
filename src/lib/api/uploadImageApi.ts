/**
 * 이미지 업로드 API
 */
import { AxiosResponse } from 'axios'

import authAxios from './axiosWithCredentials'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const uploadImage = async (
  formData: FormData,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post('/images/upload', formData, config)
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw error
  }
}
