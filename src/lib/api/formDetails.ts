import { useMutation, useQuery } from '@tanstack/react-query'

import apiClient from './apiClient'

// 지원자인지 사장인지 구분하기
const getUsersMe = async () => {
  try {
    const response = await apiClient.get(`/users/me`)
    return response.data.role
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}

export const useUsersMeQuery = () => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: getUsersMe,
  })
}

// 폼 목록 가져오기
export const getFormLists = async () => {
  try {
    const response = await apiClient.get('/forms?limit=6')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}

// 상세폼 데이터 가져오기
const getFormDetails = async (formId: number) => {
  try {
    const response = await apiClient.get(`/forms/${formId}`)
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}

export const useFormDetailsQuery = (formId: number) => {
  return useQuery({
    queryKey: ['formDetails', formId],
    queryFn: () => getFormDetails(formId),
  })
}

// 스크랩
const postFormScrap = async (formId: number) => {
  try {
    const response = await apiClient.post(`/forms/${formId}/scrap`)
    return response.data.isScrapped
  } catch (error) {
    console.log('데이터 생성 오류: ', error)
    throw error
  }
}

export const useFormScrapMutation = () => {
  return useMutation({
    mutationFn: postFormScrap,
  })
}

// 스크랩 취소
const deleteFormScrap = async (formId: number) => {
  try {
    const response = await apiClient.delete(`/forms/${formId}/scrap`)
    return response
  } catch (error) {
    console.log('데이터 삭제 오류: ', error)
    throw error
  }
}

export const useFormScrapDeleteQuery = () => {
  return useMutation({ mutationFn: deleteFormScrap })
}
