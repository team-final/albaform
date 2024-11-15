/**
 * 댓글
 */
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import authAxios from './authAxios'

const API_URL_POSTS = 'posts'
const API_URL_COMMENTS = 'comments'

/**
 * 댓글 생성
 */
export const postAlbatalkComment = async (
  talkId: number,
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.post(
      `${API_URL_POSTS}/${talkId}/${API_URL_COMMENTS}`,
      requestBody,
    )
  } catch (error) {
    toast.error('댓글을 등록하지 못했습니다.', { toastId: 'commentFailed' })
    console.error('댓글 생성 중 오류 발생:', error)
    throw error
  }
}

/**
 * 댓글 수정
 */
export const patchAlbatalkComment = async (
  commentId: number,
  requestBody: string,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.patch(
      `${API_URL_COMMENTS}/${commentId}`,
      requestBody,
    )
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error)
    throw error
  }
}

/**
 * 댓글 삭제
 */
export const deleteAlbatalkComment = async (
  commentId: number,
): Promise<AxiosResponse> => {
  try {
    return await authAxios.delete(`${API_URL_COMMENTS}/${commentId}`)
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error)
    throw error
  }
}

/**
 * 댓글 목록
 */
export const listAlbatalkComment = async ({
  talkId,
  page,
  pageSize,
}: {
  talkId: number
  page: number
  pageSize: number
}) => {
  try {
    const response = await authAxios.get(
      `${API_URL_POSTS}/${talkId}/${API_URL_COMMENTS}`,
      {
        params: {
          page,
          pageSize,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('댓글 목록 중 오류 발생:', error)
    throw error
  }
}
