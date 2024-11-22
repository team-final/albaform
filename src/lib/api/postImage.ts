import { AxiosResponse } from 'axios'

import authAxios from './authAxios'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const postImage = async (formData: FormData): Promise<AxiosResponse> => {
  try {
    return await authAxios.post('/images/upload', formData, config)
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw error
  }
}
