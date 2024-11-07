import handleError from '@/lib/utils/errorHandler'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async (): Promise<any> => {},
      refetchOnWindowFocus: false,
      retry: false, // 실패 시 자동 재시도 끄기
      staleTime: 60 * 1000, // 데이터 신선도 유지 시간 설정
      throwOnError: (error: unknown) => {
        handleError(error)
        return false
      },
    },
    mutations: {
      mutationFn: async (): Promise<any> => {},
      onSuccess: () => {},
      onError: (error: unknown) => {
        handleError(error)
      },
    },
  },
})

if (typeof window !== 'undefined') {
  persistQueryClient({
    queryClient: defaultQueryClient,
    persister: createSyncStoragePersister({
      storage: window.localStorage,
      key: 'albaform-query-cache',
    }),
  })
}

export default defaultQueryClient
