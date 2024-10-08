// 지원자 & 사장 -> 제출 내용 조회
import Toastify from '@/components/Toastify/Toastify'
import {
  useListApplicationDetailsQuery,
  useMyApplicationQuery,
  useResumeFileQuery,
} from '@/lib/queries/applicationDetailsQuery'
import { formatPhoneNumber } from '@/lib/utils/formatDate'
import classNames from 'classnames'
import Image from 'next/image'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'

import styles from './MyApplication.module.scss'

interface MyApplicationModalProps {
  isOpen: boolean
  formId?: number
  isOwner: boolean
  applicationId?: number
  onRequestClose: () => void
}

export default function MyApplicationModal({
  isOpen,
  formId,
  isOwner,
  applicationId,
  onRequestClose,
}: MyApplicationModalProps) {
  const { data: myApplication } = useMyApplicationQuery(Number(formId), {
    enabled: !isOwner,
  })
  const { data: ownerApplication } = useListApplicationDetailsQuery(
    Number(applicationId),
    { enabled: isOwner },
  )

  const application = isOwner ? ownerApplication : myApplication

  const { refetch } = useResumeFileQuery(
    Number(application?.resumeId),
    application?.resumeName,
  )

  const handleDownloadResumeClick = () => {
    refetch()
    toast.info('다운로드를 하고 있습니다!')
  }

  return (
    <>
      <Toastify />
      <ReactModal
        isOpen={isOpen}
        className={styles['modal-application-content']}
        overlayClassName={classNames(styles['modal-application-overlay'])}
        ariaHideApp={false}
      >
        <div className={styles['application-details-title-container']}>
          <h1 className={styles['application-details']}>제출 내용</h1>
          <button
            className={styles['application-details-close']}
            onClick={onRequestClose}
          >
            <Image
              src="/icons/ic-X.svg"
              alt="모달 닫기"
              width={36}
              height={36}
              className={styles['close-img']}
            />
          </button>
        </div>
        <div className={styles['application-details-container']}>
          <div className={styles['application-details-content-row-container']}>
            <div className={styles['application-details-content']}>
              <h2 className={styles['content-title']}>이름</h2>
              <span className={styles['content-description']}>
                {application?.name}
              </span>
            </div>
            <div className={styles['application-details-content']}>
              <h2 className={styles['content-title']}>연락처</h2>
              <span className={styles['content-description']}>
                {formatPhoneNumber(application?.phoneNumber)}
              </span>
            </div>
            <div className={styles['application-details-content']}>
              <h2 className={styles['content-title']}>경력</h2>
              <span className={styles['content-description']}>
                {application?.experienceMonths}
              </span>
            </div>
          </div>
          <div
            className={styles['application-details-content-column-container']}
          >
            <div className={styles['application-details-content-column']}>
              <h2 className={styles['content-title']}>이력서</h2>
              <div className={styles['content-description-resume']}>
                <span className={styles['content-description-resume-title']}>
                  <span>
                    {application?.resumeName &&
                    application?.resumeName.length > 10
                      ? `${application?.resumeName.slice(0, 10)}...`
                      : application?.resumeName}
                  </span>
                </span>
                <button
                  className={styles['resume-edit-button']}
                  onClick={handleDownloadResumeClick}
                >
                  <Image
                    src="/icons/ic-download.svg"
                    alt="이력서 다운"
                    width={36}
                    height={36}
                    className={styles['resume-edit-image']}
                  />
                </button>
              </div>
            </div>
            <div className={styles['application-details-content-column']}>
              <h2 className={styles['content-title']}>자기소개</h2>
              <span className={styles['content-description-introduction']}>
                {application?.introduction}
              </span>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  )
}
