'use client'

import AlbatalkCard from '@/components/Albatalk/AlbatalkCard/AlbatalkCard'
import FloatingButton from '@/components/Button/FloatingButton/FloatingButton'
import Dropdown from '@/components/Dropdown/Dropdown'
import EmptyContent from '@/components/EmptyContent/EmptyContent'
import SearchInput from '@/components/Input/SearchInput/SearchInput'
import { listAlbatalk } from '@/lib/api/albatalk'
import {
  ALBATALK_EDIT_PATH_NAME,
  LIST_ALBATALK_ORDER_BY,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import {
  AlbatalkProps,
  LIST_ALBATALK_ORDER_BY_KEYS,
  ListAlbatalkOrderByType,
} from '@/lib/types/formTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './page.module.scss'
import GotoTopButton from '/public/icons/ic-goto-top.png'

interface ServerResponse {
  data: AlbatalkProps[]
  nextCursor: number | null
}

export default function AlbatalksPage() {
  const user = useUserStore.getState().user
  const router = useRouter()
  const [orderBy, setOrderBy] = useState<ListAlbatalkOrderByType>('mostRecent')
  const [keyword, setKeyword] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = () => {
    setSearchKeyword(keyword)
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['listAlbatalk', orderBy, searchKeyword],
      queryFn: ({ pageParam = undefined }) =>
        listAlbatalk({
          limit: 18,
          cursor: pageParam as number | undefined,
          orderBy,
          keyword: searchKeyword,
        }),
      getNextPageParam: (lastPage: ServerResponse) =>
        lastPage.nextCursor ?? undefined,
      initialPageParam: undefined,
    })

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }

  const handleMoveEditPage = () => {
    router.push(`/${ALBATALK_EDIT_PATH_NAME}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 //
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
      <Image
        src={GotoTopButton}
        onClick={handleGoToTop}
        alt={'goto-top'}
        width={40}
        height={50}
        className={styles['goto-top-button']}
      />

      {user && (
        <div className={styles['floating-button-container']}>
          <FloatingButton onClick={handleMoveEditPage}>
            <FloatingButton.Icon src="/icons/ic-edit.svg" altText="글쓰기" />
          </FloatingButton>
        </div>
      )}

      <div className={styles['list-page-container']}>
        <div className={styles['list-page-searchBar']}>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onEnter={handleSearch}
            placeholder="궁금한 점을 검색해보세요"
          />
          <button
            onClick={handleSearch}
            className={styles['list-page-searchButton']}
          >
            검색
          </button>
        </div>
        <div className={styles['list-page-selectbar']}>
          <Dropdown className={styles['dropdown-condition']}>
            <Dropdown.Trigger>
              {LIST_ALBATALK_ORDER_BY[orderBy]}
            </Dropdown.Trigger>
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
        <div className={styles['carditem-container']}>
          {data?.pages && data?.pages[0].data.length === 0 ? (
            <EmptyContent type={'post'} />
          ) : (
            data?.pages.map((page, i) =>
              page.data.map((item: AlbatalkProps) => (
                <AlbatalkCard key={`${item.id}-${i}`} {...item} />
              )),
            )
          )}
        </div>
      </div>
    </>
  )
}
