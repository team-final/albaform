import { User } from '@/lib/types/userTypes'
import { create } from 'zustand'

export interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User | null) =>
    set((state: UserStore) => ({ ...state, user })),
}))
