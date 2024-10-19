import Addtalk from '@/components/Addtalk/Addtalk'
import { Params } from '@/lib/types/types'

export default function AddtalkEditPage({ params }: Params) {
  const { postId } = params
  return <Addtalk postId={Number(postId)} />
}
