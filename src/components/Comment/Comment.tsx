'use client'

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
import { Pagination, PaginationProps } from 'antd'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import MainButton from '../Button/MainButton/MainButton'
import styles from './Comment.module.scss'

export default function Comment({ talkId }: { talkId: number }) {
  const user = useUserStore.getState().user
  const queryClient = useQueryClient()
  const [content, setContent] = useState<string>('')
  const [items, setItems] = useState<AlbatalkCommentProps['data'] | null>(null)
  const [totalItemCount, setTotalItemCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const [isEditList, setIsEditList] = useState<number[]>([])

  const requestCommentList = useCallback(async () => {
    if (!talkId) return
    setIsPending(true)
    const responseCommentList: AlbatalkCommentProps = await listAlbatalkComment(
      {
        talkId,
        page,
        pageSize: 10,
      },
    )
    setItems(responseCommentList.data)
    setTotalItemCount(responseCommentList.totalItemCount)
    setIsPending(false)
  }, [talkId, page])

  const initialCommentList = async () => {
    await requestCommentList()
    await queryClient.invalidateQueries()
  }

  const handleSubmitComment = async (data: FieldValues) => {
    if (!data) return
    setIsPosting(true)
    const response = await postAlbatalkComment(talkId, JSON.stringify(data))
    if (response) {
      setPage(1)
      await initialCommentList()
    }
    setContent('')
    setIsPosting(false)
  }

  const handleEditComment = async (id: number, data: FieldValues) => {
    if (!data) return
    const response = await patchAlbatalkComment(id, JSON.stringify(data))
    if (response) {
      await initialCommentList()
      setIsEditList((prev) => prev.filter((item) => item !== id))
    }
  }

  const handleEditList = (action: boolean, id: number) => {
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
  const onChange: PaginationProps['onChange'] = (page) => {
    if (isPending) return
    setPage(page)
  }

  useEffect(() => {
    requestCommentList()
  }, [requestCommentList])

  return (
    <div className={styles.container}>
      <p className={styles.count}>댓글({totalItemCount})</p>

      <Form
        formId="submitComment"
        onSubmit={handleSubmitComment}
        className={`${styles.form} create-form`}
      >
        <Form.Fieldset>
          <Form.Field>
            <Form.Textarea
              name={'content'}
              required
              placeholder={'댓글을 입력해주세요.'}
              value={content}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setContent(event.target.value)
              }
            />
          </Form.Field>
        </Form.Fieldset>
        <Form.Wrapper>
          <MainButton type={'submit'} disabled={Boolean(!content) || isPosting}>
            {isPosting ? '등록...' : '등록'}
          </MainButton>
        </Form.Wrapper>
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
                            handleEditList(
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
                      formId={`editComment_${data.id}`}
                      onSubmit={(fieldValues: FieldValues) =>
                        handleEditComment(data.id, fieldValues)
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
                      <Form.Wrapper>
                        <Form.SubmitButton>수정</Form.SubmitButton>
                      </Form.Wrapper>
                    </Form>
                  ) : (
                    <p className={styles['comment-content']}>{data.content}</p>
                  )}
                </div>
              </article>
            )
          })}
      </div>

      <div className={styles.pagination}>
        <Pagination
          align="center"
          defaultCurrent={1}
          current={page}
          total={totalItemCount}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
