import basicAxios from '@/lib/api/basicAxios'
import handleError from '@/lib/utils/errorHandler'

export const getUserInfo = async (accessToken?: string) => {
  try {
    const response = await basicAxios.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}
