import handleError from '@/lib/api/errorHandler'
import { CustomMessage } from '@/lib/types/types'
import axios, { AxiosError, AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchData = async (
  endpoint: string,
  customMessage: CustomMessage,
) => {
  try {
    const response = await apiClient.get(endpoint)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error, customMessage)
    }
    console.error('Unexpected error:', error)
  }
}

export const postData = async (
  endpoint: string,
  data: unknown,
  customMessage: CustomMessage,
) => {
  try {
    const response = await apiClient.post(endpoint, data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error, customMessage)
    }
    console.error('Unexpected error:', error)
  }
}

export const updateData = async (
  endpoint: string,
  data: unknown,
  customMessage: CustomMessage,
) => {
  try {
    const response = await apiClient.put(endpoint, data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error, customMessage)
    }
    console.error('Unexpected error:', error)
  }
}

export const patchData = async (
  endpoint: string,
  data: unknown,
  customMessage: CustomMessage,
) => {
  try {
    const response = await apiClient.patch(endpoint, data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error, customMessage)
    }
    console.error('Unexpected error:', error)
  }
}

export const deleteData = async (
  endpoint: string,
  customMessage: CustomMessage,
) => {
  try {
    const response = await apiClient.delete(endpoint)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error, customMessage)
    }
    console.error('Unexpected error:', error)
  }
}

export default apiClient
