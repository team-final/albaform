/**
 * 파일명 디코더
 */
export const decodeUTF8 = (encodedStr: string) => {
  try {
    // 먼저 URL 디코딩
    const percentDecoded = decodeURIComponent(encodedStr)
    // 디코딩된 문자열을 다시 바이너리로 변환하여 UTF-8로 변환
    return new TextDecoder().decode(
      Uint8Array.from(percentDecoded, (c) => c.charCodeAt(0)),
    )
  } catch (e) {
    console.error('디코딩 중 오류 발생:', e)
    return encodedStr
  }
}
