'use client'

import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateTitle from '@/components/FormCreate/FormCreateTitle/FormCreateTitle'
import FormCreateWrapper from '@/components/FormCreate/FormCreateWrapper/FormCreateWrapper'
import FormRecruitmentConditions from '@/components/FormCreate/FormRecruitmentConditions/FormRecruitmentConditions'
import FormRecruitmentContent from '@/components/FormCreate/FormRecruitmentContent/FormRecruitmentContent'
import FormWorkingConditions from '@/components/FormCreate/FormWorkingConditions/FormWorkingConditions'
import { postAlbaForm } from '@/lib/api/formCreate'
import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { useUserStore } from '@/lib/stores/userStore'
import { EditingFormData } from '@/lib/types/formTypes'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

export default function CreateFormPage() {
  const user = useUserStore.getState().user
  const queryClient = useQueryClient()
  const router = useRouter()
  const { formData } = useEditingFormStore()

  if (typeof window !== 'undefined') {
    switch (user?.role) {
      case undefined:
        router.replace('/user/sign-in')
        break
      case 'APPLICANT':
        router.replace('/forms')
        break
    }
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

    const response = await postAlbaForm(JSON.stringify(params))
    if (response) {
      await queryClient.invalidateQueries()
      router.push(`/form/${response.data.id}`)
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
