import { differenceInDays, format } from 'date-fns'

// 날짜 형식을 변경하는 함수
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const formattedStart = format(start, 'yyyy. MM. dd')
  const formattedEnd = format(end, 'yyyy. MM. dd')

  return `${formattedStart} ~ ${formattedEnd}`
}

// 현재 날짜와의 차이를 계산하는 함수
export function calculateDaysLeft(endDate: string): string {
  const end = new Date(endDate)
  const today = new Date()

  const daysLeft = differenceInDays(end, today)

  if (daysLeft < 0) {
    return '마감'
  } else if (daysLeft === 0) {
    return 'D-Day'
  } else {
    return `D-${daysLeft}`
  }
}
