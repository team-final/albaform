import { AlbatalkProps, AlbatalkPropsType } from '@/lib/types/formTypes'
import { create } from 'zustand'

export interface AlbatalkStore {
  albatalkData: AlbatalkProps | null
  initialAlbatalkData: (data: AlbatalkProps | null) => void
  setAlbatalkData: (
    key: AlbatalkPropsType,
    value: string | number | boolean,
  ) => void
}

export const useAlbatalkStore = create<AlbatalkStore>((set) => ({
  albatalkData: null,
  initialAlbatalkData: (data: AlbatalkProps | null) =>
    set(() => ({ albatalkData: data })),
  setAlbatalkData: (key: AlbatalkPropsType, value: string | number | boolean) =>
    set((state) => ({
      albatalkData: {
        ...state.albatalkData,
        [key]: value,
      } as AlbatalkProps | null,
    })),
}))
