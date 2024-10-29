import { OauthService, User } from '@/lib/types/userTypes'
import { create } from 'zustand'
import { PersistStorage, persist } from 'zustand/middleware'

export interface UserStore {
  user: User | undefined
  setUser: (nowUser: User | undefined) => void
  authService: OauthService | undefined
  setAuthService: (nowService: OauthService | undefined) => void
}

const customSessionStorage: PersistStorage<UserStore> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name)
    return item ? JSON.parse(item) : null // JSON 파싱
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value)) // JSON 문자열화
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name)
  },
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
      storage: customSessionStorage,
      onRehydrateStorage: (state) => {
        if (!state) {
          console.warn('스토리지 재구성이 실패했습니다.')
        }
      },
    },
  ),
)
