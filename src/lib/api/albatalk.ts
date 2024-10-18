/**
 * 알바토크
 */
import { AxiosResponse } from 'axios'

import authAxios from './authAxios'

export const addtalk = async (requestBody: string): Promise<AxiosResponse> => {
  try {
    return await authAxios.post('posts', requestBody)
  } catch (error) {
    console.error('알바토크 만들기 중 오류 발생:', error)
    throw error
  }
}

export const getAlbatalk = async (postId: string) => {
  try {
    return await authAxios.get(`posts/${Number(postId)}`)
  } catch (error) {
    console.error('알바토크 불러오기 중 오류 발생:', error)
    throw error
  }
}
