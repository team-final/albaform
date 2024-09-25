import basicAxios from './basicAxios'

// 회원의 내 지원 내역 조회
export const getMyApplication = async (formId: number) => {
  try {
    const response = await basicAxios.get(`/forms/${formId}/my-application`)
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 비회원의 내 지원 내역 조회
export const getMyApplicationVerify = async (formId: number) => {
  try {
    const response = await basicAxios.get(
      `forms/${formId}/my-application/verify`,
    )
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 사장이 지원 현황 목록 조회
export const getListApplications = async (formId: number) => {
  try {
    const response = await basicAxios.get(`/forms/${formId}/applications`)
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}

// 사장이 지원 상세 조회
export const getListApplicationDetails = async (applicationId: number) => {
  try {
    const response = await basicAxios.get(`/applications/${applicationId}`)
    return response.data
  } catch (error) {
    console.log('데이터 가져오는 중 오류 발생: ', error)
    throw error
  }
}
