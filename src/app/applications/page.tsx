'use client'

import EmptyContent from '@/components/EmptyContent/EmptyContent'
import SearchInput from '@/components/Input/SearchInput/SearchInput'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import PostsCard from '@/components/PostsCard/PostsCard'
import { getMyForms } from '@/lib/api/getMyApplyForms'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Styles from './page.module.scss'
import GotoTopButton from '/public/icons/ic-goto-top.png'

const statusValue = {
  all: '',
  rejected: 'REJECTED',
  pending: 'INTERVIEW_PENDING',
  completed: 'INTERVIEW_COMPLETED',
  hired: 'HIRED',
}

interface ListItem {
  updatedAt: string
  createdAt: string
  status: string
  resumeName: string
  resumeId: number
  form: {
    owner: {
      imageUrl: string
      storeName: string
      id: number
    }
    recruitmentEndDate: string
    recruitmentStartDate: string
    description: string
    title: string
    id: number
  }
}

interface ServerResponse {
  data: ListItem[]
  nextCursor: number | null
}

export default function MyApplicationsPage() {
  const [keyword, setKeyword] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState(statusValue.all)

  const handleSearch = () => {
    setSearchKeyword(keyword)
  }

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['forms', searchKeyword, statusFilter],
      queryFn: ({ pageParam = undefined }) =>
        getMyForms({
          limit: 18,
          cursor: pageParam as number | undefined,
          keyword: searchKeyword,
          status: statusFilter !== statusValue.all ? statusFilter : undefined, // status가 'all'이면 undefined를 넘김
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
      <Image
        src={GotoTopButton}
        onClick={handleGoToTop}
        alt={'goto-top'}
        width={40}
        height={50}
        className={Styles['goto-top-button']}
      />

      <div className={Styles['out-container']}>
        <div className={Styles['out-container-search']}>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onEnter={handleSearch}
          />
          <div className={Styles['out-container-select']}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value={statusValue.all}>전체</option>
              <option value={statusValue.rejected}>거절</option>
              <option value={statusValue.pending}>면접 대기</option>
              <option value={statusValue.completed}>면접 완료</option>
              <option value={statusValue.hired}>채용 완료</option>
            </select>
          </div>
        </div>
      </div>

      <div className={Styles['item-container']}>
        {data?.pages && data?.pages[0].data.length === 0 ? (
          <EmptyContent type={'apply'} />
        ) : (
          data?.pages.map((page, pageIndex) =>
            page.data.map((item, index) => (
              <PostsCard
                key={`${pageIndex}-${index}`}
                status={item.status}
                createdAt={item.createdAt}
                recruitmentEndDate={item.form.recruitmentEndDate}
                form={item.form}
                resumeId={item.resumeId}
              />
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
      </div>
    </>
  )
}
