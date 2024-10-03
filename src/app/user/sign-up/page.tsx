import { PAGE_TITLES } from '@/lib/data/metadata'
import { usePageStore } from '@/lib/stores/pageStore'

export default function SignUpPage() {
  const { setPageTitle } = usePageStore()
  setPageTitle(PAGE_TITLES.SignUpPage)

  return <></>
}
