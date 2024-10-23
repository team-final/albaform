'use client'

import FloatingButton from '@/components/Button/FloatingButton/FloatingButton'
import EmptyContent from '@/components/EmptyContent/EmptyContent'
import SearchInput from '@/components/Input/SearchInput/SearchInput'
import ListCardItem from '@/components/ListCardItem/ListCardItem'
import { GetFormListProps } from '@/lib/api/getFormList'
import { getMyForms } from '@/lib/api/getMyForms'
import { useUserStore } from '@/lib/stores/userStore'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  isRecruiting: boolean
  createdAt: string
  updatedAt: string
}

interface ServerResponse {
  data: ListItem[]
  nextCursor: number | null
}

export default function CreatedFormsPage() {
  const [orderBy, setOrderBy] =
    useState<GetFormListProps['orderBy']>('mostRecent')
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const [isPublic, setIsPublic] = useState<boolean | null>(null)
  const [keyword, setKeyword] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const handleSearch = () => {
    setSearchKeyword(keyword)
  }
  const user = useUserStore.getState().user
  const router = useRouter()

  if (typeof window !== 'undefined') {
    switch (user?.role) {
      case undefined:
        router.replace('/user/sign-in')
        break
      case 'APPLICANT':
        router.replace('/')
        break
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['forms', orderBy, isRecruiting, searchKeyword, isPublic],
      queryFn: ({ pageParam = undefined }) =>
        getMyForms({
          limit: 6,
          cursor: pageParam as number | undefined,
          orderBy,
          isPublic,
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
    <>
      <div className={Styles['make-your-form']}>
        <Link href={'/form/create'} style={{ textDecoration: 'none' }}>
          <FloatingButton>
            <FloatingButton.Icon
              src="/icons/ic-plus.svg"
              width={25}
              height={25}
            ></FloatingButton.Icon>
            <FloatingButton.Text>폼 만들기</FloatingButton.Text>
          </FloatingButton>
        </Link>
      </div>

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
            placeholder="검색어로 조회해보세요."
          />
          <button
            onClick={handleSearch}
            className={Styles['list-page-searchButton']}
          >
            검색
          </button>
        </div>
        <div className={Styles['list-page-selectbar']}>
          <div className={Styles['list-page-selectbar-group']}>
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
              value={isPublic === null ? '' : isPublic.toString()}
              onChange={(e) =>
                setIsPublic(
                  e.target.value === '' ? null : e.target.value === 'true',
                )
              }
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </div>
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
          {data?.pages && data?.pages[0].data.length === 0 ? (
            <EmptyContent type={'form'} />
          ) : (
            data?.pages.map((page, i) =>
              page.data.map((item: ListItem) => (
                <ListCardItem key={`${item.id}-${i}`} {...item} />
              )),
            )
          )}
        </div>
      </div>
    </>
  )
}
