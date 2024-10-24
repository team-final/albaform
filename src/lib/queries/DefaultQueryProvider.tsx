import handleError from '@/lib/utils/errorHandler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async (): Promise<any> => {},
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60 * 1000,
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

export default function DefaultQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  )
}
