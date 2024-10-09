'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Dropdown from '@/components/Dropdown/Dropdown'
import ListCardItem from '@/components/ListCardItem/ListCardItem'
import ApplicantInfoUpdate from '@/components/Modal/UpdateInfo/Applicant/ApplicantInfoUpdate'
import OwnerInfoUpdate from '@/components/Modal/UpdateInfo/Owner/OwnerInfoUpdate'
import { getScrapList } from '@/lib/api/getScrapList'
import { patchMyInfo } from '@/lib/api/patchMyInfo'
import {
  MY_CONTENT_MENUS,
  PUBLIC_SORT_CONDITION,
  RECRUTING_SORT_CONDITION,
  SCRAP_LIST_SORT_CONDITION,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import {
  MyContentMenuType,
  PublicSortCondition,
  RecrutingSortCondition,
  ScrapListSortCondition,
} from '@/lib/types/types'
import { UpdateUserValues, UserRole } from '@/lib/types/userTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useMutation } from 'react-query'

import styles from './page.module.scss'

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
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined)
  const { user } = useUserStore()
  const userInfoData = {
    OWNER: {
      imageUrl: user?.imageUrl ?? '',
      nickname: user?.nickname ?? '',
      storeName: user?.storeName ?? '',
      storePhoneNumber: user?.storePhoneNumber ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      location: user?.location ?? '',
    },
    APPLICANT: {
      imageUrl: user?.imageUrl ?? '',
      name: user?.name ?? '',
      nickname: user?.nickname ?? '',
      phoneNumber: user?.phoneNumber ?? '',
    },
  }

  useEffect(() => {
    const role = useUserStore.getState().userRole
    if (role === undefined) {
      router.push('/user/sign-in')
    } else {
      setUserRole(role)
    }
  }, [router])

  const [tabMenu, setTabMenu] = useState<MyContentMenuType>('scrap')
  const [isRecruiting, setIsRecruiting] = useState<RecrutingSortCondition>(
    RECRUTING_SORT_CONDITION[0],
  )
  const [isPublic, setIsPublic] = useState<PublicSortCondition>(
    PUBLIC_SORT_CONDITION[0],
  )
  const [orderBy, setOrderBy] = useState<ScrapListSortCondition>(
    SCRAP_LIST_SORT_CONDITION[0],
  )

  const [userInfoModal, setUserInfoModal] = useState<boolean>(false)
  const [userPwChangeModal, setUserPwChangeModal] = useState<boolean>(false)

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

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }

  const mutation = useMutation({
    mutationFn: patchMyInfo,
    onSuccess: (data) => {
      console.log('업데이트 성공:', data)
      // 성공 후 추가 작업 (예: 모달 닫기, 사용자 데이터 리패칭 등)
    },
    onError: (error) => {
      console.error('업데이트 실패:', error)
      // 에러 처리 (예: 에러 메시지 표시)
    },
  })

  const handleInfoChange = (data: FieldValues) => {
    const updatedData: UpdateUserValues = {
      location: data.location || user?.location,
      phoneNumber: data.phoneNumber || user?.phoneNumber,
      storePhoneNumber: data.storePhoneNumber || user?.storePhoneNumber,
      storeName: data.storeName || user?.storeName,
      imageUrl: data.imageUrl || user?.imageUrl,
      nickname: data.nickname || user?.nickname,
      name: data.name || user?.name,
    }

    mutation.mutate({ data: updatedData })
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

  if (!userRole) {
    return null
  }

  return (
    <>
      {userRole === 'APPLICANT' && (
        <ApplicantInfoUpdate
          isOpen={userInfoModal}
          onRequestClose={() => setUserInfoModal(false)}
          onConfirm={handleInfoChange}
          initialValues={userInfoData.APPLICANT}
        />
      )}
      {userRole === 'OWNER' && (
        <OwnerInfoUpdate
          isOpen={userInfoModal}
          onRequestClose={() => setUserInfoModal(false)}
          onConfirm={handleInfoChange}
          initialValues={userInfoData.OWNER}
        />
      )}
      <Image
        src="/icons/ic-goto-top.png"
        onClick={handleGoToTop}
        alt={'goto-top'}
        width={40}
        height={50}
        priority
        className={styles['goto-top-button']}
      />
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={styles.title}>마이페이지</h1>
            <div className={styles.actions}>
              <MainButton onClick={() => setUserInfoModal(true)}>
                내 정보 수정
              </MainButton>
              <MainButton
                buttonStyle={'outline'}
                onClick={() => setUserPwChangeModal(true)}
              >
                비밀번호 변경
              </MainButton>
            </div>
          </div>
          {userRole === 'APPLICANT' && (
            <div className={styles.content}>
              <div className={styles.conditions}>
                <div className={styles['tab-menu']}>
                  {MY_CONTENT_MENUS.map(({ value, label }) => (
                    <button
                      type={'button'}
                      key={`sort_condition_${value}`}
                      className={value === tabMenu ? 'active' : ''}
                      onClick={() => {
                        setTabMenu(value)
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className={styles['list-page-selectbar']}>
                  <Dropdown className={styles['dropdown-condition']}>
                    <Dropdown.Trigger>{isRecruiting.label}</Dropdown.Trigger>
                    <Dropdown.Menu>
                      {RECRUTING_SORT_CONDITION.map((item) => (
                        <Dropdown.Item
                          key={`sort_condition_${item.value}`}
                          className={
                            item.value === isRecruiting.value
                              ? styles.active
                              : ''
                          }
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
                          className={
                            item.value === isPublic.value ? styles.active : ''
                          }
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
                          className={
                            item.value === orderBy.value ? styles.active : ''
                          }
                          onClick={() => setOrderBy(item)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div className={styles['carditem-container']}>
                {data?.pages.map((page, i) =>
                  page.data.map((item: ListItem) => (
                    <ListCardItem
                      key={`${item.id}-${i}`}
                      {...item}
                      isRecruiting={isRecruiting.value}
                      isPublic={isPublic.value}
                    />
                  )),
                )}
              </div>
            </div>
          )}
        </div>
        {userRole === 'APPLICANT' ? (
          <>
            <OwnerInfoUpdate
              isOpen={userInfoModal}
              onRequestClose={() => setUserInfoModal(false)}
              onConfirm={handleInfoChange}
              initialValues={{
                nickname: 'string',
                storeName: 'string',
                storePhoneNumber: 'string',
                phoneNumber: 'string',
                location: 'string',
                imageUrl: 'string',
              }}
            />
            <OwnerInfoUpdate
              isOpen={userPwChangeModal}
              onRequestClose={() => setUserPwChangeModal(false)}
              onConfirm={() => console.log(userRole, 'userPwChangeModal')}
            />
          </>
        ) : (
          <>
            <OwnerInfoUpdate
              isOpen={userInfoModal}
              onRequestClose={() => setUserInfoModal(false)}
              onConfirm={handleInfoChange}
              initialValues={{
                nickname: 'string',
                storeName: 'string',
                storePhoneNumber: 'string',
                phoneNumber: 'string',
                location: 'string',
                imageUrl: '',
              }}
            />
            <OwnerInfoUpdate
              isOpen={userPwChangeModal}
              onRequestClose={() => setUserPwChangeModal(false)}
              onConfirm={() => console.log(userRole, 'userPwChangeModal')}
            />
          </>
        )}
      </div>
    </>
  )
}
