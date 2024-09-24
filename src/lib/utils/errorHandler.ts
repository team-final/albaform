import { DEFAULT_ERROR_MESSAGE } from '@/lib/data/constants'
import { HttpStatus, HttpStatusType } from '@/lib/types/HttpTypes'
import { CustomMessage } from '@/lib/types/types'
import { AxiosError } from 'axios'

/**
 * @todo 상태코드에 따라 리다이렉트 등 예외처리 추가
 * @todo 서비스 공통 모달/토스트로 alert 대체
 * @param error 필수
 * @param customMessage 상수
 */
export default function handleError(
  error: unknown,
  customMessage?: CustomMessage | undefined,
): void {
  if (!(error instanceof AxiosError)) {
    alert(`알 수 없는 에러 발생: ${error}`)
    return
  }

  const responseStatusCode: string | undefined = String(error.response?.status)
  let errorMessage: string = HttpStatus.DEFAULT.message

  for (const key in HttpStatus) {
    if (HttpStatus[key as HttpStatusType].code === responseStatusCode) {
      errorMessage = HttpStatus[key as HttpStatusType].message
      break
    }
  }

  alert(
    `${customMessage?.title || DEFAULT_ERROR_MESSAGE.title}
      \n${customMessage?.message || errorMessage}
      \n${error.response?.data}\n${error.message}`,
  )

  console.error(
    'API 호출 에러:',
    error.response?.data,
    error.message,
    new Date().toISOString(),
  )
}
