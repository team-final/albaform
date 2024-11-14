import { AuthProvider, User } from '@/lib/types/userTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  user?: User
  authService?: AuthProvider
  setUser: (user?: User) => void
  setAuthService: (authService?: AuthProvider) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: undefined,
      authService: undefined,
      setUser: (newUser) => set({ user: newUser }),
      setAuthService: (newService) => set({ authService: newService }),
    }),
    {
      name: 'albaform-user',
    },
  ),
)
