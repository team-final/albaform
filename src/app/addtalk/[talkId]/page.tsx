import Addtalk from '@/components/Albatalk/Addtalk/Addtalk'
import { Params } from '@/lib/types/types'

export default function AddtalkEditPage({ params }: Params) {
  const { talkId } = params
  return <Addtalk talkId={Number(talkId)} />
}
