import handleError from '../utils/errorHandler'
import authAxios from './authAxios'

// 회원의 내 지원 내역 조회
export const getMyApplication = async (formId: number) => {
  try {
    const response = await authAxios.get(`/forms/${formId}/my-application`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// 사장이 지원 현황 목록 조회 - get
export const listApplications = async (formId: number) => {
  try {
    const response = await authAxios.get(
      `/forms/${formId}/applications?limit=10`,
    )
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// 사장이 지원 상세 조회
export const listApplicationDetails = async (applicationId: number) => {
  try {
    const response = await authAxios.get(`/applications/${applicationId}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// 상태 수정
export const patchStatus = async ({
  applicationId,
  status,
}: {
  applicationId: number
  status: string
}) => {
  try {
    const response = await authAxios.patch(`/applications/${applicationId}`, {
      status,
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// 이력서 다운로드
export const getResumeFile = async (resumeId: number, resumeName?: string) => {
  try {
    const response = await authAxios.get(`${resumeId}/download`, {
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url

    const contentDisposition = response.headers['content-disposition']
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
      : resumeName

    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return response
  } catch {
    handleError(new Error('파일 다운로드 실패'))
  }
}
