'use client'

import styles from '@/app/me/page.module.scss'
import MainButton from '@/components/Button/MainButton/MainButton'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import UpdateUserModal from '@/components/Modal/UpdateModal/UpdateUserInfo/UpdateUserModal'
import UpdateUserPasswordModal from '@/components/Modal/UpdateModal/UpdateUserPassword/UpdateUserPasswordModal'
import MyAlbatalk from '@/components/MyAlbatalk/MyAlbatalk'
import MyScrap from '@/components/MyScrap/MyScrap'
import { useModal } from '@/hooks/useModal'
import {
  MY_CONTENT_MENUS,
  TEST_ID_APPLICANT,
  TEST_ID_OWNER,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import { MyContentMenuType } from '@/lib/types/types'
import { useState } from 'react'

export default function ProtectedContent() {
  const { user, authService } = useUserStore()
  const isTestLoggedIn = Boolean(
    user?.email === TEST_ID_APPLICANT.email ||
      user?.email === TEST_ID_OWNER.email,
  )
  const { modalName, openModal, closeModal } = useModal()
  const [tabMenu, setTabMenu] = useState<MyContentMenuType>('posts')

  // setCompleteState({
  //   name: type === "info" ? "내 정보 수정" : "비밀번호 변경",
  //   status: Boolean(response),
  // });
  // setModal("complete");
  // closeModal()

  if (!user) return <LoadingSpinner full />

  return (
    <>
      {/* <Image */}
      {/*  src="/icons/ic-goto-top.png" */}
      {/*  onClick={handleGoToTop} */}
      {/*  alt={'goto-top'} */}
      {/*  width={40} */}
      {/*  height={50} */}
      {/*  priority */}
      {/*  className={styles['goto-top-button']} */}
      {/* /> */}

      <UpdateUserModal
        isOpen={modalName === 'updateUser'}
        initialValues={user}
        onRequestClose={closeModal}
      />
      <UpdateUserPasswordModal
        isOpen={modalName === 'updatePassword'}
        onRequestClose={closeModal}
      />
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={styles.title}>마이페이지</h1>
            <div className={styles.actions}>
              <MainButton onClick={() => openModal('updateUser')}>
                내 정보 수정
              </MainButton>
              {authService || isTestLoggedIn ? null : (
                <MainButton onClick={() => openModal('updatePassword')}>
                  비밀번호 수정
                </MainButton>
              )}
            </div>
          </div>

          <MyAlbatalk>
            <MyScrap>
              <div className={styles.content}>
                <div className={styles.conditions}>
                  <div className={styles['tab-menu']}>
                    {MY_CONTENT_MENUS.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        className={value === tabMenu ? 'active' : ''}
                        onClick={() => setTabMenu(value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {tabMenu === 'posts' && <MyAlbatalk.Conditions />}
                  {tabMenu === 'scrap' && <MyScrap.Conditions />}
                </div>
                <div className={styles['carditem-container']}>
                  {tabMenu === 'posts' && <MyAlbatalk.Content />}
                  {tabMenu === 'scrap' && <MyScrap.Content />}
                </div>
              </div>
            </MyScrap>
          </MyAlbatalk>
        </div>
      </div>
    </>
  )
}
