import authAxios from './authAxios'

// 지원자인지 사장인지 구분하기
export const getUsersMe = async () => {
  try {
    const response = await authAxios.get(`/users/me`)
    return response.data.role
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}

// 폼 목록 가져오기
export const getlistForms = async (limit: number) => {
  try {
    const response = await authAxios.get(`/forms?limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}

// 상세폼 데이터 가져오기
export const getFormDetails = async (formId: number) => {
  try {
    const response = await authAxios.get(`/forms/${formId}`)
    return response.data
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error)
    throw error
  }
}

// 스크랩
export const postFormScrap = async (formId: number) => {
  try {
    const response = await authAxios.post(`/forms/${formId}/scrap`)
    return response.data.isScrapped
  } catch (error) {
    console.log('데이터 생성 오류: ', error)
    throw error
  }
}

// 스크랩 취소
export const deleteFormScrap = async (formId: number) => {
  try {
    const response = await authAxios.delete(`/forms/${formId}/scrap`)
    return response.data.isScrapped
  } catch (error) {
    console.log('데이터 삭제 오류: ', error)
    throw error
  }
}

// 사장이 폼 수정
// export const patchForm = async (formId: number) => {
//   try {
//     const response = await authAxios.patch(`/forms/${formId}`)
//     return response.data
//   } catch (error) {
//     console.log('데이터 수정 오류: ', error)
//     throw error
//   }
// }

// 사장이 폼 삭제
export const deleteForm = async (formId: number) => {
  try {
    const response = await authAxios.delete(`/forms/${formId}`)
    return response
  } catch (error) {
    console.log('데이터 삭제 오류: ', error)
    throw error
  }
}
