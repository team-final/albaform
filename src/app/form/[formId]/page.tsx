'use client'

import ContactInfo from '@/components/FormDetails/ContactInfo/ContactInfo'
import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import Location from '@/components/FormDetails/Location/Location'
import Requirements from '@/components/FormDetails/Requirements/Requirements'
import WorkScheduleInfo from '@/components/FormDetails/WorkScheduleInfo/WorkScheduleInfo'
import MainButton from '@/components/MainButton/MainButton'
import { useFormDetailsQuery, useUsersMeQuery } from '@/lib/api/formDetails'
import Image from 'next/image'

import styles from './page.module.scss'

// 정적 생성 함수
export async function generateStaticParams() {
  const response = await fetch(
    'https://fe-project-albaform.vercel.app/7-4/forms',
  )
  const forms = await response.json()

  return forms.map((form: { id: number }) => ({
    formId: form.id.toString(),
  }))
}

export default function FormDetailsPage({
  params,
}: {
  params: { formId: string }
}) {
  const { data: userRole } = useUsersMeQuery() // 지원자 || 사장님인지 -> 버튼 다르게 보이기
  console.log(userRole)

  const { formId } = params
  const { data: formDetails } = useFormDetailsQuery(Number(formId)) // 상세폼 데이터 확인용
  console.log(formDetails)

  const handleApplyClick = () => {
    console.log('클릭')
  }

  return (
    <main className={styles['job-details']}>
      <Image
        src="/icons/ic-circle-clock.svg"
        alt="기본 이미지"
        className={styles['job-details-img']}
        width={100}
        height={30}
      />
      <div className={styles['job-details-container']}>
        <div className={styles['job-details-content']}>
          <section className={styles['job-details-info']}>
            <FormDetailsInfo formDetails={formDetails} />
          </section>
          <section className={styles['schedule-contact-container']}>
            <WorkScheduleInfo formDetails={formDetails} />
            <ContactInfo formDetails={formDetails} />
          </section>
        </div>

        <div className={styles['location-requirements-container']}>
          <section className={styles['location-info']}>
            <Location formDetails={formDetails} />
          </section>
          <section className={styles['requirements-info']}>
            <Requirements formDetails={formDetails} />
          </section>
        </div>

        <div className={styles['button-container']}>
          {userRole === 'APPLICANT' ? (
            <>
              <MainButton
                type="solid"
                disabled={false}
                onClick={handleApplyClick}
              >
                <MainButton.Icon
                  src="/icons/ic-writing.svg"
                  altText="지원하기"
                />
                <MainButton.Text>지원하기</MainButton.Text>
              </MainButton>
              <MainButton
                type="outline"
                disabled={false}
                onClick={handleApplyClick}
              >
                <MainButton.Icon
                  src="/icons/ic-apply-list.svg"
                  altText="지원하기"
                />
                <MainButton.Text>내 지원내역 보기</MainButton.Text>
              </MainButton>
            </>
          ) : (
            <>
              <MainButton
                type="solid"
                disabled={false}
                onClick={handleApplyClick}
              >
                <MainButton.Icon src="/icons/ic-edit2.svg" altText="수정하기" />
                <MainButton.Text>수정하기</MainButton.Text>
              </MainButton>
              <MainButton
                type="outline"
                disabled={false}
                onClick={handleApplyClick}
              >
                <MainButton.Icon
                  src="/icons/ic-trash-can.svg"
                  altText="삭제하기"
                />
                <MainButton.Text>삭제하기</MainButton.Text>
              </MainButton>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
