import { UserRole } from '@/lib/types/userTypes'

// import { randomInt } from 'crypto'

export const getRandomInt = (): number => {
  // return randomInt(0, 9999)
  return Math.floor(Math.random() * (9999 - 0) + 0)
}

export const generateRandomId = () => {
  const userRoles: UserRole[] = ['APPLICANT', 'OWNER']
  const randomIdx = getRandomInt() // 난수 생성
  return {
    email: `example${randomIdx}@email.kr`,
    role: userRoles[randomIdx % 2],
  }
}
