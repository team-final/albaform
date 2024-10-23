import { ScrapListSortConditionType } from '@/lib/types/types'

import authAxios from './authAxios'

export interface GetScrapListProps {
  limit: number
  cursor?: number | null
  isRecruiting?: boolean | null
  isPublic: boolean
  orderBy?: ScrapListSortConditionType
}

export const getScrapList = async ({
  limit = 10,
  cursor,
  isPublic,
  isRecruiting = true,
  orderBy = 'mostRecent',
}: GetScrapListProps) => {
  try {
    const response = await authAxios.get(`users/me/scrap`, {
      params: {
        limit,
        cursor,
        isPublic,
        isRecruiting,
        orderBy,
      },
    })
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}
