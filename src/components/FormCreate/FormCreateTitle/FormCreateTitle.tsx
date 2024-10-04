import Form from '@/components/Form/Form'
import { useFormCreateStore } from '@/lib/stores/formCreateStore'

import styles from './FormCreateTitle.module.scss'

export default function FormCreateTitle() {
  const { initialFormData } = useFormCreateStore()

  return (
    <section className={styles.title}>
      <p>알바폼 만들기</p>
      <Form.ResetButton color={'gray'} onClick={initialFormData}>
        작성 취소
      </Form.ResetButton>
    </section>
  )
}
