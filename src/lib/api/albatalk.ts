/**
 * 알바토크
 */
import { ListAlbatalkProps } from '@/lib/types/formTypes'
import { AxiosResponse } from 'axios'

import authAxios from './authAxios'

const API_URL = 'posts'

/**
 * 알바토크 생성
 */
export const postAlbatalk = async (
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post(`${API_URL}`, requestBody)
  } catch (error) {
    console.error('알바토크 생성 중 오류 발생:', error)
    throw error
  }
}

/**
 * 알바토크 수정
 */
export const patchAlbatalk = async (
  talkId: number,
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.patch(`${API_URL}/${talkId}`, requestBody)
  } catch (error) {
    console.error('알바토크 수정 중 오류 발생:', error)
    throw error
  }
}

/**
 * 알바토크 삭제
 */
export const deleteAlbatalk = async (
  talkId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.delete(`${API_URL}/${talkId}`)
  } catch (error) {
    console.error('알바토크 삭제 중 오류 발생:', error)
    throw error
  }
}

/**
 * 알바토크 상세보기
 */
export const getAlbatalk = async (talkId: number) => {
  try {
    return await authAxios.get(`${API_URL}/${talkId}`)
  } catch (error) {
    console.error('알바토크 상세보기 중 오류 발생:', error)
    throw error
  }
}

/**
 * 알바토크 좋아요
 */
export const postAlbatalkLike = async (
  talkId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post(`${API_URL}/${talkId}/like`)
  } catch (error) {
    console.error('알바토크 좋아요 중 오류 발생:', error)
    throw error
  }
}

/**
 * 알바토크 좋아요 취소
 */
export const deleteAlbatalkLike = async (
  talkId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.delete(`${API_URL}/${talkId}/like`)
  } catch (error) {
    console.error('알바토크 좋아요 취소 중 오류 발생:', error)
    throw error
  }
}

/**
 * 알바토크 목록
 */
export const listAlbatalk = async ({
  limit = 10,
  cursor,
  orderBy = 'mostRecent',
  keyword = '',
}: ListAlbatalkProps) => {
  try {
    const response = await authAxios.get(API_URL, {
      params: {
        orderBy,
        limit,
        cursor,
        keyword,
      },
    })
    return response.data
  } catch (error) {
    console.error('알바토크 목록 중 오류 발생:', error)
    throw error
  }
}
