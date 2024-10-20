import { MyContentMenuType } from '../types/types'
import authAxios from './authAxios'

interface DefaultProps {
  limit: number
  cursor?: number | null
}

export interface PostListProps extends DefaultProps {
  orderBy?: 'mostRecent' | 'mostCommented' | 'mostLiked'
}

export interface CommentListProps {
  page: number
  pageSize: number
}

export interface ScrapListProps extends DefaultProps {
  orderBy?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'
  isPublic: boolean
  isRecruiting?: boolean | null
}

export interface GetMyListProps {
  type: MyContentMenuType
  requestBody: PostListProps | CommentListProps | ScrapListProps
}

export const getMyList = async ({ type, requestBody }: GetMyListProps) => {
  try {
    const response = await authAxios.get(`users/me/${type}`, {
      params: requestBody,
    })
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}
