import { User, UserType } from '@/lib/types/userTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  user: User | null
  setUser: (nowUser: User | null) => void
  userType: UserType
  setUserType: (nowUserType: UserType) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (nowUser: User | null) => set({ user: nowUser }),
      userType: 'NOT_SIGN_IN',
      setUserType: (nowUserType: UserType) => set({ userType: nowUserType }),
    }),
    {
      name: 'userStorage',
    },
  ),
)
