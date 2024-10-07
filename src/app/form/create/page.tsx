'use client'

import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateTitle from '@/components/FormCreate/FormCreateTitle/FormCreateTitle'
import FormCreateWrapper from '@/components/FormCreate/FormCreateWrapper/FormCreateWrapper'
import FormRecruitmentConditions from '@/components/FormCreate/FormRecruitmentConditions/FormRecruitmentConditions'
import FormRecruitmentContent from '@/components/FormCreate/FormRecruitmentContent/FormRecruitmentContent'
import FormWorkingConditions from '@/components/FormCreate/FormWorkingConditions/FormWorkingConditions'
import { createAlbaForm } from '@/lib/api/formCreate'
import { useFormCreateStore } from '@/lib/stores/formCreateStore'
import { FORM_DATA } from '@/lib/types/formTypes'
import classNames from 'classnames'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

export default function CreateFormPage() {
  const { formData } = useFormCreateStore()

  const handleSubmit = async (data: FORM_DATA | FieldValues) => {
    if (!data) return

    const params = {
      ...formData,
      imageUrls: JSON.stringify(formData.imageUrls),
      numberOfPositions: isNaN(Number(formData.numberOfPositions))
        ? 0
        : formData.numberOfPositions,
    }

    const response = await createAlbaForm(JSON.stringify(params))
    console.log('response: ', response)
  }

  return (
    <Form
      formId={'createForm'}
      onSubmit={handleSubmit}
      className={classNames(styles.container, 'create-form')}
    >
      <FormCreateAside />

      <div className={styles.content}>
        <FormCreateTitle />

        <FormCreateWrapper>
          <FormRecruitmentContent step={1} />
          <FormRecruitmentConditions step={2} />
          <FormWorkingConditions step={3} />
        </FormCreateWrapper>
      </div>
    </Form>
  )
}
