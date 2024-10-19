/**
 * 알바토크
 */
import { AxiosResponse } from 'axios'

import authAxios from './authAxios'

const API_URL = 'posts'

export const postAlbatalk = async (
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post(`${API_URL}`, requestBody)
  } catch (error) {
    console.error('알바토크 만들기 중 오류 발생:', error)
    throw error
  }
}

export const patchAlbatalk = async (
  postId: number,
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.patch(`${API_URL}/${postId}`, requestBody)
  } catch (error) {
    console.error('알바토크 수정 중 오류 발생:', error)
    throw error
  }
}

export const deleteAlbatalk = async (
  postId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.delete(`${API_URL}/${postId}`)
  } catch (error) {
    console.error('알바토크 삭제 중 오류 발생:', error)
    throw error
  }
}

export const getAlbatalk = async (postId: number) => {
  try {
    return await authAxios.get(`${API_URL}/${postId}`)
  } catch (error) {
    console.error('알바토크 불러오기 중 오류 발생:', error)
    throw error
  }
}

export const postAlbatalkLike = async (
  postId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post(`${API_URL}/${postId}/like`)
  } catch (error) {
    console.error('알바토크 좋아요 중 오류 발생:', error)
    throw error
  }
}

export const deleteAlbatalkLike = async (
  postId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.delete(`${API_URL}/${postId}/like`)
  } catch (error) {
    console.error('알바토크 좋아요 취소 중 오류 발생:', error)
    throw error
  }
}
