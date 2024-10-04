import { useFormDetailsQuery } from '@/lib/queries/formDetailsQuery'
import { Params } from '@/lib/types/types'
import { useEffect, useState } from 'react'

import ApplicationStatus from '../ApplicationStatus/ApplicationStatus'
import FormDetailsInfo from '../FormDetailsInfo/FormDetailsInfo'
import ImageSlider from '../ImageSlider/ImageSlider'
import styles from './ApplicationDetails.module.scss'

interface Props {
  params: Params['params']
  isApplicationDetailsPage: boolean
  isOwner: boolean
}

export default function ApplicationDetails({
  isApplicationDetailsPage,
  params,
  isOwner,
}: Props) {
  const { formId, applicationId } = params
  const { data: formDetails } = useFormDetailsQuery(Number(formId))
  const [scrapCount, setScrapCount] = useState(0)

  useEffect(() => {
    if (formDetails) {
      setScrapCount(formDetails.scrapCount)
    }
  }, [formDetails])

  return (
    <>
      <div>
        <section className={styles['application-details-image']}>
          <ImageSlider formDetails={formDetails} noImageHeight={0} />
        </section>
      </div>

      <div className={styles['application-details-info']}>
        <h1 className={styles['application-details-title']}>
          {formDetails?.title}
        </h1>

        <FormDetailsInfo
          formDetails={formDetails}
          count={scrapCount}
          showAdditionalInfo={false}
        />

        <section className={styles['application-details-info-status']}>
          <ApplicationStatus
            formId={Number(formId)}
            formDetails={formDetails}
            applicationId={
              isApplicationDetailsPage ? Number(applicationId) : undefined
            }
            isOwner={isOwner}
          />
        </section>
      </div>
    </>
  )
}
