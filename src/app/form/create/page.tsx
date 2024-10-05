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
import { FORM_DATA } from '@/lib/types/types'
import classNames from 'classnames'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

export default function CreateFormPage() {
  const { formData } = useFormCreateStore()
  const handleSubmit = async (
    data: FieldValues | FORM_DATA,
    e?: Event | any,
  ) => {
    data.imageUrls = JSON.stringify(formData.imageUrls)
    data.workDays = formData.workDays

    /**
     * @todo 임시저장 기능 개발
     */
    if (e?.nativeEvent.submitter.innerText === '임시 저장') {
      const now = new Date()
      const YY = now.getFullYear()
      const MM = (now.getMonth() + 1).toString().padStart(2, '0')
      const DD = now.getDate().toString().padStart(2, '0')
      const hh = now.getHours().toString().padStart(2, '0')
      const mm = now.getMinutes().toString().padStart(2, '0')
      const ss = now.getSeconds().toString().padStart(2, '0')

      const tempData = { createAt: `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`, data }

      console.log(tempData)
      // localStorage.setItem(TEMP_CREATE_FORM, JSON.stringify(data))
    } else {
      await createAlbaForm(JSON.stringify(data))
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
