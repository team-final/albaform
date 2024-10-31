import serverAxios from '@/lib/api/serverAuthAxios'
import handleError from '@/lib/utils/errorHandler'

export const getUserInfo = async (accessToken: string | undefined) => {
  try {
    const response = await serverAxios.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}
