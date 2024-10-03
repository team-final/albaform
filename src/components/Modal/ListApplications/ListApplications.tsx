// 사장 -> 지원자 현황 조회
import { useListApplicationsQuery } from '@/lib/queries/applicationDetailsQuery'
import {
  ApplicationProps,
  FORM_STATUS,
  FormStatusType,
} from '@/lib/types/formTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'

import styles from './ListApplications.module.scss'

interface Props {
  formId: number
  isOpen: boolean
  onRequestClose: () => void
}

const ListApplicationsModal = ({ formId, isOpen, onRequestClose }: Props) => {
  const router = useRouter()
  const { data: applicationList } = useListApplicationsQuery(Number(formId))
  const [statusMessage, setStatusMessage] = useState<string>('')

  const handleApplicationDetailsClick = (applicationId: number) => {
    router.push(`/form/${formId}/application/${applicationId}`)
  }

  useEffect(() => {
    applicationList?.data?.forEach((application: ApplicationProps) => {
      const currentStatus = application.status
      if (currentStatus && FORM_STATUS[currentStatus as FormStatusType]) {
        setStatusMessage(FORM_STATUS[currentStatus as FormStatusType])
      } else {
        setStatusMessage('알 수 없음')
      }
    })
  }, [applicationList])

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles['modal-list-application-content']}
      overlayClassName={styles['modal-list-application-overlay']}
      ariaHideApp={false}
    >
      <div className={styles['list-title-container']}>
        <h1 className={styles['application-status-list']}>지원현황</h1>
        <button
          className={styles['application-details-close']}
          onClick={onRequestClose}
        >
          <Image src="/icons/ic-X.svg" alt="모달 닫기" width={36} height={36} />
        </button>
      </div>
      <div className={styles['list-description-container']}>
        <div className={styles['application-status-list-title-container']}>
          <div className={styles['name-number']}>
            <span>이름</span>
            <span>전화번호</span>
          </div>
          <div className={styles['month-status']}>
            <span className={styles['status-list-wrapper']}>
              경력
              <button className={styles['list-image-button']}>
                <Image
                  src="/icons/ic-sort-ascending-outlined.svg"
                  alt="오름차순"
                  width={36}
                  height={36}
                />
              </button>
            </span>
            <span className={styles['status-list-wrapper']}>
              상태
              <button className={styles['list-image-button']}>
                <Image
                  src="/icons/ic-sort-ascending-outlined.svg"
                  alt="오름차순"
                  width={36}
                  height={36}
                />
              </button>
            </span>
          </div>
        </div>
        <div
          className={styles['application-status-list-description-container']}
        >
          {applicationList?.data?.length > 0 ? (
            applicationList.data.map((application: ApplicationProps) => (
              <div key={application.id} className={styles['list-map']}>
                <div className={styles['list-name-number']}>
                  <span
                    className={styles['description-underline']}
                    onClick={() =>
                      handleApplicationDetailsClick(application.id)
                    }
                  >
                    {application.name}
                  </span>
                  <span>{application.phoneNumber}</span>
                </div>

                <div className={styles['list-month-status']}>
                  <span>{application.experienceMonths}</span>
                  <span>{statusMessage}</span>
                </div>
              </div>
            ))
          ) : (
            <p>지원자가 없습니다</p>
          )}
        </div>
      </div>
    </ReactModal>
  )
}

export default ListApplicationsModal
