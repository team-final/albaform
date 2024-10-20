'use client'

import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateTitle from '@/components/FormCreate/FormCreateTitle/FormCreateTitle'
import FormCreateWrapper from '@/components/FormCreate/FormCreateWrapper/FormCreateWrapper'
import FormRecruitmentConditions from '@/components/FormCreate/FormRecruitmentConditions/FormRecruitmentConditions'
import FormRecruitmentContent from '@/components/FormCreate/FormRecruitmentContent/FormRecruitmentContent'
import FormWorkingConditions from '@/components/FormCreate/FormWorkingConditions/FormWorkingConditions'
import { createAlbaForm } from '@/lib/api/formCreate'
import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { useUserStore } from '@/lib/stores/userStore'
import { EditingFormData } from '@/lib/types/formTypes'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

export default function CreateFormPage() {
  const user = useUserStore.getState().user
  const router = useRouter()
  const { formData } = useEditingFormStore()

  switch (user?.role) {
    case undefined:
      router.replace('/user/sign-in')
      break
    case 'APPLICANT':
      router.back()
      break
  }

  const handleSubmit = async (data: EditingFormData | FieldValues) => {
    if (!data) return

    const params = {
      ...formData,
      imageUrls: JSON.stringify(formData.imageUrls),
      numberOfPositions: isNaN(Number(formData.numberOfPositions))
        ? 0
        : formData.numberOfPositions,
    }

    const response = await createAlbaForm(JSON.stringify(params))
    if (response) {
      router.replace(`/form/${response.data.id}`)
    }
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
