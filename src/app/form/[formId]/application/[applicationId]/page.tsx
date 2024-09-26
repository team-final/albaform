// import FormDetailsInfo from '@/components/FormDetails/FormDetailsInfo/FormDetailsInfo'
import ApplicationStatus from '@/components/FormDetails/ApplicationStatus/ApplicationStatus'
import { Params } from '@/lib/types/types'

import styles from './page.module.scss'

// import ImageSlider from '@/components/FormDetails/ImageSlider/ImageSlider'

export async function generateStaticParams() {
  return [
    { params: { applicationId: 'a' } },
    { params: { applicationId: 'b' } },
  ]
}

// 여긴 사장이 지원 상세 조회 / 상세 수정

export default function ApplicationDetailsPage({ params }: Params) {
  const { applicationId } = params

  if (applicationId === 'a') {
    return <h1>Application A</h1>
  } else if (applicationId === 'b') {
    return <h1>Application B</h1>
  }

  return (
    <div className={styles['application-details']}>
      {/* <ImageSlider />
      <FormDetailsInfo /> */}
      <ApplicationStatus />
    </div>
  )
}
