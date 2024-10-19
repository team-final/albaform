import { useAlbatalkStore } from '@/lib/stores/albatalkStore'

import styles from './CommentList.module.scss'

export default function CommentList() {
  const { albatalkData } = useAlbatalkStore()
  if (!albatalkData) return null

  return (
    <div className={styles.container}>
      <div>댓글({albatalkData.commentCount})</div>
      <div>comment form</div>
      <div>comment list</div>
    </div>
  )
}
