import { User } from '@/lib/types/userTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  user: User | undefined
  setUser: (nowUser: User | undefined) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: undefined,
      setUser: (nowUser: User | undefined) => set({ user: nowUser }),
    }),
    {
      name: 'userStorage',
    },
  ),
)
