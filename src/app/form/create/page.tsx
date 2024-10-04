'use client'

import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateStep from '@/components/FormCreate/FormCreateStep/FormCreateStep'
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
  /**
   * @todo 단계 별 작성중 인디케이터 개발
   */
  // const [formDataStep1, setFormDataStep1] = useState(INITIAL_FORM_DATA.STEP_1)
  // const [formDataStep2, setFormDataStep2] = useState(INITIAL_FORM_DATA.STEP_2)
  // const [formDataStep3, setFormDataStep3] = useState(INITIAL_FORM_DATA.STEP_3)
  // const [inProgress, setInProgress] = useState<[STEP_INDEX, boolean][]>([
  //   [1, false],
  //   [2, false],
  //   [3, false],
  // ])

  const handleSubmit = async (
    data: FieldValues | FORM_DATA,
    e?: Event | any,
  ) => {
    data.imageUrls = JSON.stringify(formData.imageUrls)
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
          <FormCreateStep step={1}>
            <FormRecruitmentContent />
          </FormCreateStep>

          <FormCreateStep step={2}>
            <FormRecruitmentConditions />
          </FormCreateStep>

          <FormCreateStep step={3}>
            <FormWorkingConditions />
          </FormCreateStep>
        </FormCreateWrapper>
      </div>
    </Form>
  )
}
