import { useQuery } from '@tanstack/react-query'

import {
  getListApplicationDetails,
  getListApplications,
  getMyApplication,
  getMyApplicationVerify,
} from '../api/applicationDetails'

export const useMyApplicationQuery = (
  formId: number,
  options?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ['myApplication'],
    queryFn: () => getMyApplication(formId),
    enabled: options?.enabled,
  })
}

export const useMyApplicationVerityQuery = (formId: number) => {
  return useQuery({
    queryKey: ['myApplicationVerify'],
    queryFn: () => getMyApplicationVerify(formId),
  })
}

export const useListApplicationsQuery = (formId: number) => {
  return useQuery({
    queryKey: ['applicationsList'],
    queryFn: () => getListApplications(formId),
  })
}

export const useListApplicationDetailsQuery = (
  applicationId: number,
  options?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ['applicationDetails'],
    queryFn: () => getListApplicationDetails(applicationId),
    enabled: options?.enabled,
  })
}
