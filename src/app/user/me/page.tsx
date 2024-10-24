'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import ApplicantInfoUpdate from '@/components/Modal/UpdateInfo/Applicant/ApplicantInfoUpdate'
import CompleteInfoUpdate from '@/components/Modal/UpdateInfo/Complete/CompleteInfoUpdate'
import OwnerInfoUpdate from '@/components/Modal/UpdateInfo/Owner/OwnerInfoUpdate'
import UpdateUserPassword from '@/components/Modal/UpdateInfo/UpdateUserPassword/UpdateUserPassword'
import MyAlbatalk from '@/components/MyAlbatalk/MyAlbatalk'
import MyScrap from '@/components/MyScrap/MyScrap'
import { patchMyInfo } from '@/lib/api/patchMyInfo'
import { updateUserPassword } from '@/lib/api/updateUserPassword'
import { uploadImage } from '@/lib/api/uploadImageApi'
import { MY_CONTENT_MENUS } from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import { MyContentMenuType } from '@/lib/types/types'
import { UpdateUserValues } from '@/lib/types/userTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

/**
 * @TODO user 정보를 서버사이드렌더링으로 불러오기 (속도 & 빌드)
 */
export default function MyPage() {
  const user = useUserStore.getState().user
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.replace('/user/sign-in')
    }
  }, [user, router])

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

  const [tabMenu, setTabMenu] = useState<MyContentMenuType>('posts')

  const [userInfoModal, setUserInfoModal] = useState<boolean>(false)
  const [userPwChangeModal, setUserPwChangeModal] = useState<boolean>(false)

  const [completeModal, setCompleteModal] = useState<boolean>(false)
  const [completeState, setCompleteState] = useState<{
    name: '내 정보 수정' | '비밀번호 변경' | ''
    status: boolean
  }>({ name: '', status: false })

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

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }

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

          <MyAlbatalk>
            <MyScrap>
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

                  {tabMenu === 'posts' ? (
                    <MyAlbatalk.Conditions />
                  ) : tabMenu === 'comments' ? (
                    ''
                  ) : tabMenu === 'scrap' ? (
                    <MyScrap.Conditions />
                  ) : null}
                </div>

                <div className={styles['carditem-container']}>
                  {tabMenu === 'posts' ? (
                    <MyAlbatalk.Content />
                  ) : tabMenu === 'comments' ? (
                    ''
                  ) : tabMenu === 'scrap' ? (
                    <MyScrap.Content />
                  ) : null}
                </div>
              </div>
            </MyScrap>
          </MyAlbatalk>
        </div>
      </div>
    </>
  )
}
