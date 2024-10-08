'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import ListCardItem from '@/components/ListCardItem/ListCardItem'
import { getScrapList } from '@/lib/api/getScrapList'
import { useUserStore } from '@/lib/stores/userStore'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ScrapLayout from './layout'
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

export default function MyPage() {
  const router = useRouter()
  const userRole = useUserStore.getState().userRole
  useEffect(() => {
    if (userRole === null || userRole === undefined) {
      router.push('/user/sign-in')
    }
  }, [userRole, router])

  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const [isPublic, setIsPublic] = useState<boolean>(true)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['forms', isRecruiting, isPublic],
      queryFn: ({ pageParam = undefined }) =>
        getScrapList({
          limit: 18,
          cursor: pageParam as number | undefined,
          isRecruiting,
          isPublic,
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

  if (userRole === null || userRole === undefined) {
    return null
  }

  return (
    <ScrapLayout>
      <Image
        src={GotoTopButton}
        onClick={handleGoToTop}
        alt={'goto-top'}
        width={40}
        height={50}
        className={Styles['goto-top-button']}
      />
      <div className={Styles['list-page-container']}>
        <h1>마이페이지</h1>
        <div>
          <MainButton>내 정보 수정</MainButton>
          <MainButton buttonStyle={'outline'}>비밀번호 변경</MainButton>
        </div>
        {userRole === 'APPLICANT' ? (
          <div>
            {' '}
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
                value={isPublic.toString()}
                onChange={(e) => setIsPublic(e.target.value === 'true')}
              >
                <option value="true">공개</option>
                <option value="false">비공개</option>
              </select>
            </div>
            <div className={Styles['carditem-container']}>
              {data?.pages.map((page, i) =>
                page.data.map((item: ListItem) => (
                  <ListCardItem
                    key={`${item.id}-${i}`}
                    {...item}
                    isRecruiting={isRecruiting}
                    isPublic={isPublic}
                  />
                )),
              )}
            </div>
          </div>
        ) : null}
      </div>
    </ScrapLayout>
  )
}
