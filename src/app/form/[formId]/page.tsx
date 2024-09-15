import FormDetailsClient from '@/components/FormDetails/FormDetailsClient/FormDetailsClient'

import styles from './page.module.scss'

// 정적 생성 함수
// export const generateStaticParams = async () => {
//   const formLists = await getFormLists()
//   const formIds = formLists.data.map((form: { id: number }) => ({
//     id: form.id.toString(),
//   }))
//   return formIds.map((form: { id: number }) => ({
//     params: {
//       id: form.id,
//     },
//   }))
// }

const FormDetailsPage = async () => {
  return (
    <main className={styles['job-details']}>
      <FormDetailsClient formId={1} />
    </main>
  )
}

export default FormDetailsPage
