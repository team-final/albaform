import Avatar from '@/components/Avatar/Avatar'
import Dropdown from '@/components/Dropdown/Dropdown'
import Form from '@/components/Form/Form'
import {
  deleteAlbatalkComment,
  listAlbatalkComment,
  patchAlbatalkComment,
  postAlbatalkComment,
} from '@/lib/api/comment'
import { useUserStore } from '@/lib/stores/userStore'
import { AlbatalkCommentProps } from '@/lib/types/formTypes'
import { formatKoreanDate } from '@/lib/utils/formatDate'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import styles from './Comment.module.scss'

export default function Comment({ talkId }: { talkId: number }) {
  const user = useUserStore.getState().user
  const queryClient = useQueryClient()
  const [content, setContent] = useState<string>('')
  const [items, setItems] = useState<AlbatalkCommentProps['data'] | null>(null)
  const [totalItemCount, setTotalItemCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const [isPatching, setIsPatching] = useState<boolean>(false)
  const [isEditList, setIsEditList] = useState<number[]>([])

  const requestCommentList = useCallback(async () => {
    if (!talkId) return

    const responseCommentList: AlbatalkCommentProps = await listAlbatalkComment(
      {
        talkId,
        page,
        pageSize: 10,
      },
    )
    setItems(responseCommentList.data)
    setTotalItemCount(responseCommentList.totalItemCount)
    setTotalPages(responseCommentList.totalPages)
    setContent('')
  }, [talkId, page])

  const initialCommentList = async () => {
    await requestCommentList()
    await queryClient.invalidateQueries()
  }

  const handleSubmit = async (data: FieldValues) => {
    if (!data) return

    setIsPosting(true)

    const response = await postAlbatalkComment(talkId, JSON.stringify(data))
    if (response) {
      setPage(1)
      await initialCommentList()
    }

    setIsPosting(false)
  }

  const handleSubmitEdit = async (id: number, data: FieldValues) => {
    if (!data) return
    setIsPatching(true)

    const response = await patchAlbatalkComment(id, JSON.stringify(data))
    if (response) {
      await initialCommentList()
      setIsEditList((prev) => prev.filter((item) => item !== id))
    }

    setIsPatching(false)
  }

  const handleEdit = (action: boolean, id: number) => {
    if (action) {
      setIsEditList((prev) => [...prev, id])
    } else {
      setIsEditList((prev) => prev.filter((item) => item !== id))
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteAlbatalkComment(id)
      await initialCommentList()
    } catch {}
  }

  useEffect(() => {
    requestCommentList()
  }, [requestCommentList])

  return (
    <div className={styles.container}>
      <p className={styles.count}>댓글({totalItemCount})</p>

      <Form
        formId="handleSubmit"
        onSubmit={handleSubmit}
        className={`${styles.form} create-form`}
      >
        <Form.Fieldset>
          <Form.Field>
            <Form.Textarea
              name={'content'}
              required
              placeholder={'댓글을 입력해주세요.'}
              value={content}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setContent(event.target.value)
              }
            />
          </Form.Field>
        </Form.Fieldset>
        <Form.Wrap>
          <Form.SubmitButton>
            {isPosting ? <LoadingSpinner /> : '등록'}
          </Form.SubmitButton>
        </Form.Wrap>
      </Form>

      <div className={styles.comment}>
        {items !== null &&
          items.map((data) => {
            return (
              <article
                key={`albatalk_comment_${data.id}`}
                className={styles['comment-item']}
              >
                <div className={styles['comment-head']}>
                  <div className={styles['comment-about']}>
                    <Avatar
                      imageUrl={data.writer.imageUrl}
                      name={data.writer.nickname}
                    />
                    <p>{formatKoreanDate(data.createdAt)}</p>
                  </div>

                  {user?.id === data.writer.id && (
                    <Dropdown className={styles.menu}>
                      <Dropdown.Trigger />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleEdit(
                              !isEditList.some((item) => item === data.id),
                              data.id,
                            )
                          }
                        >
                          {isEditList.some((item) => item === data.id)
                            ? '취소'
                            : '수정하기'}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(data.id)}>
                          삭제하기
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>

                <div className={styles['comment-body']}>
                  {isEditList.some((item) => item === data.id) ? (
                    <Form
                      formId="handleSubmitEdit"
                      onSubmit={(fieldValues: FieldValues) =>
                        handleSubmitEdit(data.id, fieldValues)
                      }
                      className={`${styles.form} create-form`}
                      defaultValues={{ content: data.content }}
                    >
                      <Form.Fieldset>
                        <Form.Field>
                          <Form.Textarea
                            name={'content'}
                            required
                            placeholder={'댓글을 입력해주세요.'}
                          />
                        </Form.Field>
                      </Form.Fieldset>
                      <Form.Wrap>
                        <Form.SubmitButton>
                          {isPatching ? <LoadingSpinner /> : '수정'}
                        </Form.SubmitButton>
                      </Form.Wrap>
                    </Form>
                  ) : (
                    <p className={styles['comment-content']}>{data.content}</p>
                  )}
                </div>
              </article>
            )
          })}
      </div>

      <div className={styles.pages}>
        <p>totalItemCount: {totalItemCount}</p>
        <p>totalPages: {totalPages}</p>
      </div>
    </div>
  )
}
