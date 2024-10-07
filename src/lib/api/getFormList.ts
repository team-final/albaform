import basicAxios from './basicAxios'

export interface GetFormListProps {
  limit: number
  cursor?: number | null
  orderBy?: string
  keyword?: string
  isRecruiting?: boolean | null
}

export const getFormList = async ({
  limit = 10,
  cursor,
  orderBy = 'mostRecent',
  keyword = '',
  isRecruiting = true,
}: GetFormListProps) => {
  try {
    const response = await basicAxios.get(`forms`, {
      params: {
        orderBy,
        limit,
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
