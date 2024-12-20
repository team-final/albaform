'use client'

import CreateFormStyles from '@/app/form/create/page.module.scss'
import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateTitle from '@/components/FormCreate/FormCreateTitle/FormCreateTitle'
import FormCreateWrapper from '@/components/FormCreate/FormCreateWrapper/FormCreateWrapper'
import FormRecruitmentConditions from '@/components/FormCreate/FormRecruitmentConditions/FormRecruitmentConditions'
import FormRecruitmentContent from '@/components/FormCreate/FormRecruitmentContent/FormRecruitmentContent'
import FormWorkingConditions from '@/components/FormCreate/FormWorkingConditions/FormWorkingConditions'
import { patchAlbaForm } from '@/lib/api/formCreate'
import { useFormDetailsQuery } from '@/lib/queries/formDetailsQuery'
import {
  INITIAL_EDITING_FORM_DATA,
  useEditingFormStore,
} from '@/lib/stores/editingFormStore'
import { useUserStore } from '@/lib/stores/userStore'
import { EditingFormData } from '@/lib/types/formTypes'
import { Params } from '@/lib/types/types'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { FieldValues } from 'react-hook-form'

const INITIAL_EDITING_FORM_DATA_KEYS = Object.keys(INITIAL_EDITING_FORM_DATA)

export default function EditFormPage({ params }: Params) {
  const user = useUserStore.getState().user
  const queryClient = useQueryClient()
  const router = useRouter()

  useEffect(() => {
    switch (user?.role) {
      case undefined:
        router.replace('/user/sign-in')
        break
      case 'APPLICANT':
        router.back()
        break
    }
  }, [router, user])

  const { formId } = params
  const { data: formDetails } = useFormDetailsQuery(Number(formId))
  const { formData, setFormData } = useEditingFormStore()

  const handleSubmit = async (data: EditingFormData | FieldValues) => {
    if (!data) return

    const params = {
      ...formData,
      imageUrls: JSON.stringify(formData.imageUrls),
      numberOfPositions: isNaN(Number(formData.numberOfPositions))
        ? 0
        : formData.numberOfPositions,
    }

    const response = await patchAlbaForm(Number(formId), JSON.stringify(params))
    if (response) {
      await queryClient.invalidateQueries()
      router.push(`/form/${response.data.id}`)
    }
  }

  const injectFormData = useCallback(() => {
    for (const key in formDetails) {
      if (key === 'imageUrls') {
        try {
          setFormData(key, JSON.parse(formDetails[key][0]))
        } catch {
          setFormData(
            key,
            formDetails[key][0] === 'string' ? [] : formDetails[key],
          )
        }
      } else if (INITIAL_EDITING_FORM_DATA_KEYS.includes(key)) {
        setFormData(key, formDetails[key])
      }
    }
  }, [setFormData, formDetails])

  useEffect(() => {
    injectFormData()
  }, [injectFormData])

  if (!formDetails) return null

  return (
    <Form
      formId={'createForm'}
      onSubmit={handleSubmit}
      className={classNames(CreateFormStyles.container, 'create-form')}
    >
      <FormCreateAside />

      <div className={CreateFormStyles.content}>
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
