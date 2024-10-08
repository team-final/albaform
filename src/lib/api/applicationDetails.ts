import authAxios from './authAxios'
import basicAxios from './basicAxios'

// 회원의 내 지원 내역 조회
export const getMyApplication = async (formId: number) => {
  try {
    const response = await authAxios.get(`/forms/${formId}/my-application`)
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 비회원의 내 지원 내역 조회
export const getMyApplicationVerify = async (formId: number) => {
  try {
    const response = await authAxios.get(
      `forms/${formId}/my-application/verify`,
    )
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 사장이 지원 현황 목록 조회 - get
export const getListApplications = async (formId: number) => {
  try {
    const response = await authAxios.get(
      `/forms/${formId}/applications?limit=10`,
    )
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 사장이 지원 상세 조회
export const getListApplicationDetails = async (applicationId: number) => {
  try {
    const response = await authAxios.get(`/applications/${applicationId}`)
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 이력서 다운로드
export const getDownloadResume = async (
  resumeId: number,
  resumeName: string,
) => {
  try {
    const response = await basicAxios.get(`${resumeId}/download`, {
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
  } catch (error) {
    console.log('파일 다운로드 중 오류 발생: ', error)
    throw error
  }
}
