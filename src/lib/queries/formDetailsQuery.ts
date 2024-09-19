import { useMutation, useQuery } from '@tanstack/react-query'

import {
  deleteFormScrap,
  getFormDetails,
  getUsersMe,
  postFormScrap,
} from '../api/formDetails'

export const useUsersMeQuery = () => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: getUsersMe,
  })
}

export const useFormDetailsQuery = (formId: number) => {
  return useQuery({
    queryKey: ['formDetails', formId],
    queryFn: () => getFormDetails(formId),
  })
}

export const useFormScrapMutation = () => {
  return useMutation({
    mutationFn: postFormScrap,
    onSuccess: (isScrapped) => {
      console.log('스크랩 상태:', isScrapped)
    },
  })
}

export const useFormScrapDeleteMutation = () => {
  return useMutation({
    mutationFn: deleteFormScrap,
    onSuccess: (isScrapped) => {
      console.log('스크랩 상태:', isScrapped)
    },
  })
}
