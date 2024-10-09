import authAxios from './authAxios'

export interface GetFormListProps {
  limit: number
  cursor?: number | null
  keyword?: string
  status?: string
}

export const getMyForms = async ({
  limit = 10,
  cursor,
  status,
  keyword,
}: GetFormListProps) => {
  try {
    const params: Record<string, any> = {
      limit,
      cursor,
      keyword,
    }

    if (status && status !== '') {
      params.status = status
    }

    const response = await authAxios.get(`users/me/applications`, { params })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}
