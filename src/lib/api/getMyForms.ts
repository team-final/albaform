import authAxios from './authAxios'

export interface GetFormListProps {
  limit: number
  cursor?: number | null
  orderBy?: string
  keyword?: string
  isRecruiting?: boolean | null
  isPublic?: boolean | null
}

export const getMyForms = async ({
  limit = 10,
  cursor,
  orderBy = 'mostRecent',
  keyword = '',
  isRecruiting = true,
  isPublic = true,
}: GetFormListProps) => {
  try {
    const response = await authAxios.get(`users/me/forms`, {
      params: {
        orderBy,
        limit,
        isPublic,
        cursor,
        keyword,
        isRecruiting,
      },
    })
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}
