import NotFoundPage from '@/app/not-found'
import { Params } from '@/lib/types/types'

export async function generateStaticParams() {
  return [
    { params: { applicationId: 'a' } },
    { params: { applicationId: 'b' } },
  ]
}

export default function ApplicationDetailsPage({ params }: Params) {
  const { applicationId } = params

  if (applicationId === 'a') {
    return <h1>Application A</h1>
  } else if (applicationId === 'b') {
    return <h1>Application B</h1>
  }

  // 유효하지 않은 경우 404 페이지
  return <NotFoundPage />
}
