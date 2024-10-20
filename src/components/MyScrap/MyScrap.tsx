import styles from '@/app/user/me/page.module.scss'
import Dropdown from '@/components/Dropdown/Dropdown'
import EmptyContent from '@/components/EmptyContent/EmptyContent'
import ListCardItem from '@/components/ListCardItem/ListCardItem'
import { getScrapList } from '@/lib/api/getScrapList'
import {
  PUBLIC_SORT_CONDITION,
  RECRUTING_SORT_CONDITION,
  SCRAP_LIST_SORT_CONDITION,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import {
  ChildrenProps,
  PublicSortCondition,
  RecrutingSortCondition,
  ScrapListSortCondition,
} from '@/lib/types/types'
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

interface ScrapListContextProps {
  isRecruiting: RecrutingSortCondition
  setIsRecruiting: Dispatch<SetStateAction<RecrutingSortCondition>>
  isPublic: PublicSortCondition
  setIsPublic: Dispatch<SetStateAction<PublicSortCondition>>
  orderBy: ScrapListSortCondition
  setOrderBy: Dispatch<SetStateAction<ScrapListSortCondition>>
}

const ScrapListContext = createContext<ScrapListContextProps | undefined>(
  undefined,
)

export const useScrapListContext = () => {
  const context = useContext(ScrapListContext)
  if (!context) {
    throw new Error('useContext를 Provider 안에서 사용하세요.')
  }
  return context
}

interface ListItem {
  id: number
  title: string
  recruitmentStartDate: string
  recruitmentEndDate: string
  imageUrls: string[]
  applyCount: number
  scrapCount: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface ServerResponse {
  data: ListItem[]
  nextCursor: number | null
}

export default function MyScrap({ children }: ChildrenProps) {
  const user = useUserStore.getState().user
  const router = useRouter()
  if (!user) router.push('/user/sign-in')

  const [isRecruiting, setIsRecruiting] = useState<RecrutingSortCondition>(
    RECRUTING_SORT_CONDITION[0],
  )
  const [isPublic, setIsPublic] = useState<PublicSortCondition>(
    PUBLIC_SORT_CONDITION[0],
  )
  const [orderBy, setOrderBy] = useState<ScrapListSortCondition>(
    SCRAP_LIST_SORT_CONDITION[0],
  )

  return (
    <ScrapListContext.Provider
      value={{
        isRecruiting,
        setIsRecruiting,
        isPublic,
        setIsPublic,
        orderBy,
        setOrderBy,
      }}
    >
      {children}
    </ScrapListContext.Provider>
  )
}

function Conditions() {
  const {
    isRecruiting,
    setIsRecruiting,
    isPublic,
    setIsPublic,
    orderBy,
    setOrderBy,
  } = useScrapListContext()

  return (
    <div className={styles['list-page-selectbar']}>
      <Dropdown className={styles['dropdown-condition']}>
        <Dropdown.Trigger>{isRecruiting.label}</Dropdown.Trigger>
        <Dropdown.Menu>
          {RECRUTING_SORT_CONDITION.map((item) => (
            <Dropdown.Item
              key={`sort_condition_${item.value}`}
              className={item.value === isRecruiting.value ? styles.active : ''}
              onClick={() => setIsRecruiting(item)}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className={styles['dropdown-condition']}>
        <Dropdown.Trigger>{isPublic.label}</Dropdown.Trigger>
        <Dropdown.Menu>
          {PUBLIC_SORT_CONDITION.map((item) => (
            <Dropdown.Item
              key={`sort_condition_${item.value}`}
              className={item.value === isPublic.value ? styles.active : ''}
              onClick={() => setIsPublic(item)}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className={styles['dropdown-condition']}>
        <Dropdown.Trigger>{orderBy.label}</Dropdown.Trigger>
        <Dropdown.Menu>
          {SCRAP_LIST_SORT_CONDITION.map((item) => (
            <Dropdown.Item
              key={`sort_condition_${item.value}`}
              className={item.value === orderBy.value ? styles.active : ''}
              onClick={() => setOrderBy(item)}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

function Content() {
  const { isRecruiting, isPublic, orderBy } = useScrapListContext()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['forms', isRecruiting, isPublic, orderBy],
      queryFn: ({ pageParam = undefined }) =>
        getScrapList({
          limit: 6,
          cursor: pageParam as number | undefined,
          isRecruiting: isRecruiting.value,
          isPublic: isPublic.value,
          orderBy: orderBy.value,
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
        <EmptyContent type={'bookmark'} />
      ) : (
        data?.pages.map((page, i) =>
          page.data.map((item: ListItem) => (
            <ListCardItem
              key={`${item.id}-${i}`}
              {...item}
              isRecruiting={isRecruiting.value}
              isPublic={isPublic.value}
            />
          )),
        )
      )}
    </>
  )
}

MyScrap.Conditions = Conditions
MyScrap.Content = Content
