import authAxios from './authAxios'

export interface GetScrapListProps {
  limit: number
  cursor?: number | null
  isRecruiting?: boolean | null
  isPublic: boolean
}

export const getScrapList = async ({
  limit = 10,
  cursor,
  isPublic,
  isRecruiting = true,
}: GetScrapListProps) => {
  try {
    const response = await authAxios.get(`users/me/scrap`, {
      params: {
        limit,
        cursor,
        isPublic,
        isRecruiting,
      },
    })
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}
