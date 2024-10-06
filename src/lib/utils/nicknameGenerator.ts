import { UserRole } from '@/lib/types/userTypes'

export const generateUniqueNickname = (role: UserRole): string => {
  let nickname = ''
  switch (role) {
    case 'APPLICANT':
      nickname = '알바'
      break
    case 'OWNER':
      nickname = '사장님'
  }
  const adjectives: string[] = [
    '멋있는',
    '희망찬',
    '행복한',
    '신나는',
    '귀여운',
    '보람찬',
    '즐거운',
    '용감한',
    '어여쁜',
    '씩씩한',
  ]
  const randomAdjective: string =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNum: number = Math.floor(Math.random() * 100000)
  return `${randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1)}${nickname}${randomNum}`
}
