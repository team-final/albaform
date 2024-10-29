import { OauthService, User } from '@/lib/types/userTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  user: User | undefined
  setUser: (nowUser: User | undefined) => void
  authService: OauthService | undefined
  setAuthService: (nowService: OauthService | undefined) => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: undefined,
      setUser: (nowUser: User | undefined) => set({ user: nowUser }),
      authService: undefined,
      setAuthService: (nowService: OauthService | undefined) =>
        set({ authService: nowService }),
    }),
    {
      name: 'albaform-user-storage',
      getStorage: () => sessionStorage,
      onRehydrateStorage: (state) => {
        if (!state) {
          console.warn('스토리지 재구성이 실패했습니다.')
        }
      },
    },
  ),
)
