'use client'

import Avatar from '@/components/Avatar/Avatar'
import Dropdown from '@/components/Dropdown/Dropdown'
import IconText from '@/components/IconText/IconText'
import { deleteAlbatalk } from '@/lib/api/albatalk'
import {
  ALBATALK_EDIT_PATH_NAME,
  ALBATALK_POST_PATH_NAME,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import { AlbatalkProps } from '@/lib/types/formTypes'
import { formatKoreanDate } from '@/lib/utils/formatDate'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import styles from './AlbatalkCard.module.scss'

export default function AlbatalkCard({ ...item }: AlbatalkProps) {
  const user = useUserStore.getState().user
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id, title, content, writer, createdAt, commentCount, likeCount } =
    item

  const handleEdit = () => {
    router.push(`/${ALBATALK_EDIT_PATH_NAME}/${id}`)
  }

  const handleDelete = async () => {
    try {
      await deleteAlbatalk(id)
      queryClient.invalidateQueries()
    } catch {}
  }

  const handleMovePage = () => {
    router.push(user ? `/${ALBATALK_POST_PATH_NAME}/${id}` : '/user/sign-in')
  }

  return (
    <article className={styles.card} onClick={handleMovePage}>
      <div className={styles.inner}>
        <section className={styles.head}>
          <p className={styles.title}>{title}</p>
          {user?.id === writer.id && (
            <Dropdown className={styles.menu}>
              <Dropdown.Trigger />
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEdit}>수정하기</Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>삭제하기</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </section>
        <section className={styles.body}>
          <p className={styles.description}>{content}</p>
        </section>

        <section className={styles.foot}>
          <div className={styles.about}>
            <div className={styles['about-post']}>
              <Avatar imageUrl={writer.imageUrl} name={writer.nickname} />
              <p>{formatKoreanDate(createdAt)}</p>
            </div>

            <div className={styles['about-counts']}>
              <IconText>
                <IconText.Icon
                  src={'/icons/ic-comment.svg'}
                  alt={'댓글 아이콘'}
                />
                <IconText.Text text={commentCount} />
              </IconText>

              <IconText>
                <IconText.Icon
                  src={'/icons/ic-like.svg'}
                  alt={'좋아요 아이콘'}
                />
                <IconText.Text text={likeCount} />
              </IconText>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
