import { useMutation, useQuery } from '@tanstack/react-query'

import {
  getMyApplication,
  getMyApplicationVerify,
  getResumeFile,
  listApplicationDetails,
  listApplications,
  patchStatus,
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
    queryFn: () => listApplications(formId),
  })
}

export const useListApplicationDetailsQuery = (
  applicationId: number,
  options?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ['applicationDetails'],
    queryFn: () => listApplicationDetails(applicationId),
    enabled: options?.enabled,
  })
}

export const useResumeFileQuery = (resumeId: number, resumeName: string) => {
  return useQuery({
    queryKey: ['myResume'],
    queryFn: () => getResumeFile(resumeId, resumeName),
    enabled: false,
  })
}

export const usePatchStatusMutation = () => {
  return useMutation({
    mutationFn: patchStatus,
  })
}
