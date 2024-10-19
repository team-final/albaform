'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Dropdown from '@/components/Dropdown/Dropdown'
import EmptyContent from '@/components/EmptyContent/EmptyContent'
import ListCardItem from '@/components/ListCardItem/ListCardItem'
import ApplicantInfoUpdate from '@/components/Modal/UpdateInfo/Applicant/ApplicantInfoUpdate'
import CompleteInfoUpdate from '@/components/Modal/UpdateInfo/Complete/CompleteInfoUpdate'
import OwnerInfoUpdate from '@/components/Modal/UpdateInfo/Owner/OwnerInfoUpdate'
import UpdateUserPassword from '@/components/Modal/UpdateInfo/UpdateUserPassword/UpdateUserPassword'
import { getScrapList } from '@/lib/api/getScrapList'
import { patchMyInfo } from '@/lib/api/patchMyInfo'
import { updateUserPassword } from '@/lib/api/updateUserPassword'
import { uploadImage } from '@/lib/api/uploadImageApi'
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
import { UpdateUserValues } from '@/lib/types/userTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

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
  const user = useUserStore.getState().user
  const router = useRouter()

  if (user?.role === undefined) router.replace('/user/sign-in')

  const { setUser } = useUserStore()

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

  const [completeModal, setCompleteModal] = useState<boolean>(false)
  const [completeState, setCompleteState] = useState<{
    name: '내 정보 수정' | '비밀번호 변경' | ''
    status: boolean
  }>({ name: '', status: false })

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

  const handleInfoChange = async (data: FieldValues) => {
    let responseUploadImage: string = ''
    if (String(data.imageUrl).startsWith('http')) {
      responseUploadImage = data.imageUrl
    } else {
      const file = data.imageUrl[0]
      const formData = new FormData()
      const fileName = file.name.replaceAll(' ', '')
      formData.append('image', file, fileName)

      const response = await uploadImage(formData)
      if (response) responseUploadImage = response.data.url
    }

    const updatedData: UpdateUserValues = {
      location: data.location || user?.location,
      phoneNumber: data.phoneNumber || user?.phoneNumber,
      storePhoneNumber: data.storePhoneNumber || user?.storePhoneNumber,
      storeName: data.storeName || user?.storeName,
      imageUrl: responseUploadImage || user?.imageUrl || '',
      nickname: data.nickname || user?.nickname,
      name: data.name || user?.name,
    }

    const res = await patchMyInfo(updatedData)
    if (res) setUser(res)

    setCompleteModal(true)
    setCompleteState({
      name: '내 정보 수정',
      status: Boolean(res),
    })
  }

  const handleChangePassword = async (data: FieldValues) => {
    const response = await updateUserPassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
    })

    setCompleteModal(true)
    setCompleteState({
      name: '비밀번호 변경',
      status: Boolean(response),
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
      {user?.role === 'APPLICANT' && (
        <ApplicantInfoUpdate
          isOpen={userInfoModal}
          onRequestClose={() => setUserInfoModal(false)}
          onConfirm={handleInfoChange}
          initialValues={userInfoData.APPLICANT}
        />
      )}
      {user?.role === 'OWNER' && (
        <OwnerInfoUpdate
          isOpen={userInfoModal}
          onRequestClose={() => setUserInfoModal(false)}
          onConfirm={handleInfoChange}
          initialValues={userInfoData.OWNER}
        />
      )}
      <UpdateUserPassword
        isOpen={userPwChangeModal}
        onRequestClose={() => setUserPwChangeModal(false)}
        onConfirm={handleChangePassword}
      />
      <CompleteInfoUpdate
        isOpen={completeModal}
        onRequestClose={() => {
          setCompleteModal(false)
          if (completeState.status) {
            setUserInfoModal(false)
            setUserPwChangeModal(false)
          }
        }}
        state={completeState}
      />
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
          {user?.role === 'APPLICANT' ? (
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
              </div>
            </div>
          ) : (
            <EmptyContent type={'prepare'} />
          )}
        </div>
      </div>
    </>
  )
}
