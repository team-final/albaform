import { useMutation, useQuery } from '@tanstack/react-query'

import {
  deleteForm,
  deleteFormScrap,
  getFormDetails,
  getUsersMe,
  patchForm,
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
  })
}

export const useFormScrapDeleteMutation = () => {
  return useMutation({
    mutationFn: deleteFormScrap,
  })
}

export const usePatchFormQuery = () => {
  return useMutation({
    mutationFn: patchForm,
  })
}

export const useDeleteFormQuery = () => {
  return useMutation({
    mutationFn: deleteForm,
  })
}
