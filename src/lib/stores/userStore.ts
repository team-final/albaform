import { User, UserRole } from '@/lib/types/userTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  user: User | null
  setUser: (nowUser: User | null) => void
  userRole: UserRole | undefined
  setUserRole: (nowUserRole: UserRole | undefined) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (nowUser: User | null) => set({ user: nowUser }),
      userRole: undefined,
      setUserRole: (nowUserRole: UserRole | undefined) =>
        set({ userRole: nowUserRole }),
    }),
    {
      name: 'userStorage',
    },
  ),
)
