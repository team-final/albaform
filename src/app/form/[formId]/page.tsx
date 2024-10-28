import NotFoundPage from '@/app/not-found'
import FormDetailsClient from '@/components/FormDetails/FormDetailsClient/FormDetailsClient'
import { getlistForms } from '@/lib/api/formDetails'
import { Params } from '@/lib/types/types'

import styles from './page.module.scss'

// 정적 생성 함수
export const generateStaticParams = async () => {
  const LIMIT = 50
  try {
    const formLists = await getlistForms(LIMIT)

    if (!formLists || !formLists.data || !Array.isArray(formLists.data)) {
      console.error('Invalid formLists data:', formLists)
      return []
    }

    const formIds = formLists.data.map((form: { id: number }) => ({
      id: form.id,
    }))

    // params 형태로 변환
    return formIds.map((form: { id: number }) => ({
      params: {
        id: form.id.toString(),
      },
    }))
  } catch (error) {
    console.error('Error fetching form lists:', error)
    return []
  }
}

const FormDetailsPage = ({ params }: Params) => {
  const { formId } = params

  if (!formId) {
    return NotFoundPage
  }

  return (
    <main className={styles['job-details']}>
      <FormDetailsClient formId={formId} />
    </main>
  )
}

export default FormDetailsPage
