'use client'

import SearchInput from '@/components/Input/SearchInput/SearchInput'
import ListCardItem from '@/components/ListCardItem/ListCardItem'
import { GetFormListProps, getFormList } from '@/lib/api/getFormList'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import FormLayout from './layout'
import Styles from './page.module.scss'
import GotoTopButton from '/public/icons/ic-goto-top.png'

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

export default function Page() {
  const [orderBy, setOrderBy] =
    useState<GetFormListProps['orderBy']>('mostRecent')
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const [keyword, setKeyword] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = () => {
    setSearchKeyword(keyword)
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['forms', orderBy, isRecruiting, searchKeyword],
      queryFn: ({ pageParam = undefined }) =>
        getFormList({
          limit: 18,
          cursor: pageParam as number | undefined,
          orderBy,
          isRecruiting,
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
    <FormLayout>
      <Image
        src={GotoTopButton}
        onClick={handleGoToTop}
        alt={'goto-top'}
        width={40}
        height={50}
        className={Styles['goto-top-button']}
      />
      <div className={Styles['list-page-container']}>
        <div className={Styles['list-page-searchBar']}>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onEnter={handleSearch}
            placeholder="어떤 알바를 찾고 계세요?"
          />
          <button
            onClick={handleSearch}
            className={Styles['list-page-searchButton']}
          >
            검색
          </button>
        </div>
        <div className={Styles['list-page-selectbar']}>
          <select
            value={isRecruiting === null ? '' : isRecruiting.toString()}
            onChange={(e) =>
              setIsRecruiting(
                e.target.value === '' ? null : e.target.value === 'true',
              )
            }
          >
            <option value="">모두</option>
            <option value="true">모집 중</option>
            <option value="false">모집 완료</option>
          </select>
          <select
            value={orderBy}
            onChange={(e) =>
              setOrderBy(e.target.value as GetFormListProps['orderBy'])
            }
          >
            <option value="mostRecent">최신순</option>
            <option value="highestWage">시급높은순</option>
            <option value="mostApplied">지원자 많은순</option>
            <option value="mostScrapped">스크랩 많은순</option>
          </select>
        </div>
        <div className={Styles['carditem-container']}>
          {data?.pages.map((page, i) =>
            page.data.map((item: ListItem) => (
              <ListCardItem
                key={`${item.id}-${i}`}
                {...item}
                isRecruiting={isRecruiting}
              />
            )),
          )}
        </div>
      </div>
    </FormLayout>
  )
}
