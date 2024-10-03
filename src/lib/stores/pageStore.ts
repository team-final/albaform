import { create } from 'zustand'
import { persist } from 'zustand/middleware/persist'

export interface PageStore {
  pageTitle: string | null
  setPageTitle: (currentPageTitle: string | null) => void
}

export const usePageStore = create(
  persist<PageStore>(
    (set) => ({
      pageTitle: null,
      setPageTitle: (currentPageTitle: string | null) =>
        set({ pageTitle: currentPageTitle }),
    }),
    {
      name: 'pageStorage',
    },
  ),
)
