import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import { TEMP_CREATE_FORM } from '@/lib/data/constants'
import { useFormCreateStore } from '@/lib/stores/formCreateStore'
import { useUserStore } from '@/lib/stores/userStore'
import { TEMP_CREATE_FORM_TYPE } from '@/lib/types/formTypes'

import TemporatyFormData from '../TemporatyFormData/TemporatyFormData'
import styles from './FormCreateAsideActions.module.scss'

export default function FormCreateAsideActions() {
  const { user } = useUserStore()
  const { formData, setTemporaryFormData } = useFormCreateStore()

  const handleSubmit = () => {
    if (user === null) return
    const { id } = user

    const data = {
      ...formData,
      imageUrls: JSON.stringify(formData.imageUrls),
    }

    const now = new Date()
    const YY = now.getFullYear()
    const MM = (now.getMonth() + 1).toString().padStart(2, '0')
    const DD = now.getDate().toString().padStart(2, '0')
    const hh = now.getHours().toString().padStart(2, '0')
    const mm = now.getMinutes().toString().padStart(2, '0')
    const ss = now.getSeconds().toString().padStart(2, '0')

    const tempData: TEMP_CREATE_FORM_TYPE = {
      id,
      createAt: `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`,
      formData: data,
    }

    const getTempCreateForm: TEMP_CREATE_FORM_TYPE[] = JSON.parse(
      localStorage[TEMP_CREATE_FORM] ?? '[]',
    )

    getTempCreateForm.push(tempData)

    localStorage.setItem(TEMP_CREATE_FORM, JSON.stringify(getTempCreateForm))

    setTemporaryFormData(getTempCreateForm)
  }

  return (
    <section className={styles.actions}>
      <TemporatyFormData />

      <MainButton buttonStyle={'outline'} color={'gray'} onClick={handleSubmit}>
        임시 저장
      </MainButton>

      <Form.SubmitButton>등록하기</Form.SubmitButton>
    </section>
  )
}
