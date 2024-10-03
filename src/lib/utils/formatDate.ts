export const formatDetailedDate = (date?: Date) => {
  if (!date || isNaN(date.getTime())) {
    return '날짜 없음'
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}. ${month}. ${day} ${hours}:${minutes}:${seconds} 등록`
}

export const formatKoreanDate = (dateString?: string) => {
  const date = new Date(dateString || new Date())
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export const formatApplicationDate = (dateString?: string) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }

  return date.toLocaleDateString('ko-KR', options)
}

export const formatExperienceMonths = (months: number) => {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  let result = ''
  if (months === 0) {
    result = '경력 없음'
  }
  if (years > 0) {
    result += `${years}년 `
  }
  if (remainingMonths > 0) {
    result += `${remainingMonths}개월`
  }
  return result.trim()
}
