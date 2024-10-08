'use client'

import CreateFormStyles from '@/app/form/create/page.module.scss'
import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateTitle from '@/components/FormCreate/FormCreateTitle/FormCreateTitle'
import FormCreateWrapper from '@/components/FormCreate/FormCreateWrapper/FormCreateWrapper'
import FormRecruitmentConditions from '@/components/FormCreate/FormRecruitmentConditions/FormRecruitmentConditions'
import FormRecruitmentContent from '@/components/FormCreate/FormRecruitmentContent/FormRecruitmentContent'
import FormWorkingConditions from '@/components/FormCreate/FormWorkingConditions/FormWorkingConditions'
import { createAlbaForm } from '@/lib/api/formCreate'
import { useFormDetailsQuery } from '@/lib/queries/formDetailsQuery'
import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { EditingFormData } from '@/lib/types/formTypes'
import { Params } from '@/lib/types/types'
import classNames from 'classnames'
import { useCallback, useEffect } from 'react'
import { FieldValues } from 'react-hook-form'

export default function EditFormPage({ params }: Params) {
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

    const response = await createAlbaForm(JSON.stringify(params))
    console.log('response: ', response)
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
      } else {
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
