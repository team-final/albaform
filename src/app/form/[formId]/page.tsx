import FormDetailsClient from '@/components/FormDetails/FormDetailsClient/FormDetailsClient'
import { getlistForms } from '@/lib/api/formDetails'
import { Params } from '@/lib/types/types'

import styles from './page.module.scss'

// 정적 생성 함수
export const generateStaticParams = async () => {
  const LIMIT = 50
  const formLists = await getlistForms(LIMIT)
  const formIds = formLists.data.map((form: { id: number }) => ({
    id: form.id,
  }))
  return formIds.map((form: { id: number }) => ({
    params: {
      id: form.id,
    },
  }))
}

const FormDetailsPage = ({ params }: Params) => {
  const { formId } = params

  return (
    <main className={styles['job-details']}>
      <FormDetailsClient formId={Number(formId)} />
    </main>
  )
}

export default FormDetailsPage
