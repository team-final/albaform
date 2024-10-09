import authAxios from '@/lib/api/authAxios'
import { SAVE_ERROR_MESSAGE } from '@/lib/data/messages'
import { useUserStore } from '@/lib/stores/userStore'
import { UpdateUserValues, User } from '@/lib/types/userTypes'
import handleError from '@/lib/utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export default function useUpdateUser() {
  const queryClient = useQueryClient()
  const { setUser } = useUserStore()

  return useMutation({
    mutationFn: async ({
      nickname,
      name,
      phoneNumber,
      imageUrl,
      storeName,
      storePhoneNumber,
      location,
    }: UpdateUserValues): Promise<User> => {
      const response: AxiosResponse<User> = await authAxios.patch('/users/me', {
        nickname,
        name,
        phoneNumber,
        imageUrl,
        storeName,
        storePhoneNumber,
        location,
      })
      const user = response.data
      return user
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
