import handleError from '@/lib/utils/errorHandler'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { toast } from 'react-toastify'

const defaultQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => handleError(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => handleError(error),
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60 * 1000, // 1분
    },
    mutations: {
      onSuccess: () => {
        toast.success('완료되었습니다.')
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
    maxAge: 1000 * 60 * 60 * 24, // 24시간
  })

  // 탭 간 캐시 동기화 설정
  const broadcastChannel = new BroadcastChannel('query-cache-sync')
  broadcastChannel.onmessage = (event) => {
    if (event.data === 'invalidate-cache') {
      defaultQueryClient.invalidateQueries() // 캐시 무효화하여 새 데이터 가져오기
    }
  }

  // 캐시가 업데이트될 때마다 다른 탭에 알림
  defaultQueryClient.getQueryCache().subscribe((event) => {
    if (event?.query.getObserversCount() === 0 && event.type === 'updated') {
      broadcastChannel.postMessage('invalidate-cache')
    }
  })
}

export default defaultQueryClient
