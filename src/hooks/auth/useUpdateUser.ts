import authAxios from '@/lib/api/authAxios'
import { SAVE_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import { UpdateUserProps, User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export default function useUpdateUser() {
  const queryClient = useQueryClient()
  const { setUser } = useUserStore()

  return useMutation({
    mutationFn: async (data: UpdateUserProps): Promise<User> => {
      const response: AxiosResponse<User> = await authAxios.patch(
        '/users/me',
        data,
      )
      return response.data
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
      setUser(user)
    },
    onError: (error: AxiosError) => {
      handleError(error, SAVE_ERROR_MESSAGE)
    },
  })
}
