import styles from '@/app/user/me/page.module.scss'
import AlbatalkCard from '@/components/Albatalk/AlbatalkCard/AlbatalkCard'
import Dropdown from '@/components/Dropdown/Dropdown'
import EmptyContent from '@/components/EmptyContent/EmptyContent'
import { PostListProps, getMyList } from '@/lib/api/getMyList'
import { LIST_ALBATALK_ORDER_BY } from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import {
  AlbatalkProps,
  LIST_ALBATALK_ORDER_BY_KEYS,
  ListAlbatalkOrderByType,
} from '@/lib/types/formTypes'
import { ChildrenProps } from '@/lib/types/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface PostListContextProps {
  orderBy: ListAlbatalkOrderByType
  setOrderBy: Dispatch<SetStateAction<ListAlbatalkOrderByType>>
}

const PostListContext = createContext<PostListContextProps | undefined>(
  undefined,
)

export const usePostListContext = () => {
  const context = useContext(PostListContext)
  if (!context) {
    throw new Error('useContext를 Provider 안에서 사용하세요.')
  }
  return context
}

interface ServerResponse {
  data: AlbatalkProps[]
  nextCursor: number | null
}

export default function MyAlbatalk({ children }: ChildrenProps) {
  const user = useUserStore.getState().user
  const router = useRouter()
  if (!user) router.push('/user/sign-in')

  const [orderBy, setOrderBy] = useState<ListAlbatalkOrderByType>('mostRecent')

  return (
    <PostListContext.Provider value={{ orderBy, setOrderBy }}>
      {children}
    </PostListContext.Provider>
  )
}

function Conditions() {
  const { orderBy, setOrderBy } = usePostListContext()

  return (
    <div className={styles['list-page-selectbar']}>
      <Dropdown className={styles['dropdown-condition']}>
        <Dropdown.Trigger>{LIST_ALBATALK_ORDER_BY[orderBy]}</Dropdown.Trigger>
        <Dropdown.Menu>
          {LIST_ALBATALK_ORDER_BY_KEYS.map((key) => {
            return (
              <Dropdown.Item
                key={`list_albatalk_order_by-${key}`}
                onClick={() => setOrderBy(key)}
              >
                {LIST_ALBATALK_ORDER_BY[key]}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

function Content() {
  const { orderBy } = usePostListContext()

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['myAlbatalks', orderBy],
      queryFn: ({ pageParam = undefined }) =>
        getMyList({
          type: 'posts',
          requestBody: {
            limit: 18,
            cursor: pageParam as number | undefined,
            orderBy,
          } as PostListProps,
        }),
      getNextPageParam: (lastPage: ServerResponse) =>
        lastPage.nextCursor ?? undefined,
      initialPageParam: undefined,
    })

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      if (nearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      {data?.pages && data?.pages[0].data.length === 0 ? (
        <EmptyContent type={'post'} />
      ) : (
        data?.pages.map((page, i) =>
          page.data.map((item: AlbatalkProps) => (
            <AlbatalkCard key={`${item.id}-${i}`} {...item} />
          )),
        )
      )}

      {isFetching && (
        <div
          style={{
            gridColumn: '1 / -1',
            width: '100%',
            height: '100%',
            minHeight: '50vh',
          }}
        >
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

MyAlbatalk.Conditions = Conditions
MyAlbatalk.Content = Content
