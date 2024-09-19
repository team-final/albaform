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
