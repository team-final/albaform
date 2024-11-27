'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { getAlbatalk, patchAlbatalk, postAlbatalk } from '@/lib/api/albatalk'
import { postImage } from '@/lib/api/postImage'
import {
  ALBATALK_LIST_PATH_NAME,
  ALBATALK_POST_PATH_NAME,
} from '@/lib/data/constants'
import { useAlbatalkStore } from '@/lib/stores/albatalkStore'
import { useUserStore } from '@/lib/stores/userStore'
import { AlbatalkProps, ImageUrl } from '@/lib/types/formTypes'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './Addtalk.module.scss'

const INITIAL_IMAGE: ImageUrl = {
  url: '',
  name: '',
}

export default function Addtalk({ talkId }: { talkId?: number }) {
  const user = useUserStore.getState().user
  const queryClient = useQueryClient()
  const router = useRouter()

  if (typeof window !== 'undefined') {
    if (!user) router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
  }

  const { albatalkData, initialAlbatalkData } = useAlbatalkStore()

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [imageObj, setImageObj] = useState<ImageUrl>(INITIAL_IMAGE)
  const [isImagePending, setIsImagePending] = useState<boolean>(false)

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    setIsImagePending(true)

    const file = files[0]
    const formData = new FormData()
    const fileName = file.name.replaceAll(' ', '')
    formData.append('image', file, fileName)

    const response = await postImage(formData)
    if (!response) return

    setImageObj({ url: response.data.url, name: fileName })

    setIsImagePending(false)
    event.target.value = ''
  }

  const deleteImage = () => {
    setImageObj(INITIAL_IMAGE)
  }

  const handleSubmit = async (data: AlbatalkProps | FieldValues) => {
    if (!data) return
    data.imageUrl = JSON.stringify(imageObj)

    let response
    if (talkId) {
      response = await patchAlbatalk(talkId, JSON.stringify(data))
    } else {
      response = await postAlbatalk(JSON.stringify(data))
    }
    if (response) {
      await queryClient.invalidateQueries()
      router.push(`/${ALBATALK_POST_PATH_NAME}/${response.data.id}`)
    }
  }

  const request = useCallback(async () => {
    setIsFetching(true)
    if (talkId) {
      const response = await getAlbatalk(talkId)
      if (!response) return router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
      if (user && user.id !== response.data.writer.id) {
        return router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
      }
      initialAlbatalkData(response.data)
    } else {
      initialAlbatalkData(null)
    }
    setIsFetching(false)
  }, [user, router, talkId, initialAlbatalkData])

  useEffect(() => {
    request()
  }, [request])

  useEffect(() => {
    if (
      albatalkData &&
      albatalkData.writer.id === user?.id &&
      albatalkData.id === talkId
    ) {
      setTitle(albatalkData.title)
      setContent(albatalkData.content)
      setImageObj(() => {
        try {
          return JSON.parse(albatalkData.imageUrl)
        } catch {
          return INITIAL_IMAGE
        }
      })
    }
  }, [albatalkData, user, talkId])

  if (isFetching) return <LoadingSpinner full />

  return (
    <Form
      formId={'addtalk'}
      onSubmit={handleSubmit}
      className={classNames(styles.container, 'create-form')}
    >
      <div className={styles.head}>
        <p className={styles.title}>글쓰기</p>

        <div className={styles.actions}>
          <MainButton
            color={'gray'}
            onClick={() =>
              router.push(
                talkId
                  ? `/${ALBATALK_POST_PATH_NAME}/${talkId}`
                  : `/${ALBATALK_LIST_PATH_NAME}`,
              )
            }
          >
            취소
          </MainButton>
          <Form.SubmitButton>
            {talkId ? '수정하기' : '등록하기'}
          </Form.SubmitButton>
        </div>
      </div>

      <div className={styles.body}>
        <Form.Fieldset>
          <Form.Legend requiredIndicator>제목</Form.Legend>
          <Form.Field>
            <Form.Input
              name={'title'}
              formRequired
              placeholder={'제목을 입력해주세요.'}
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend requiredIndicator>내용</Form.Legend>
          <Form.Field>
            <Form.Textarea
              name={'content'}
              formRequired
              placeholder={'내용을 입력해주세요.'}
              value={content}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setContent(event.target.value)
              }
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset className={styles['form-file-images']}>
          <Form.Legend>이미지 첨부</Form.Legend>
          <div className={styles['form-file-images-wrap']}>
            <Form.Field>
              <Form.Input
                type={'file'}
                name={'imageUrl'}
                onChange={handleUploadImage}
              />
            </Form.Field>
            <div className={styles['form-file-images-item']}>
              {isImagePending ? (
                <LoadingSpinner />
              ) : (
                imageObj.url !== '' && (
                  <>
                    <Image
                      src={imageObj.url}
                      alt={imageObj.name}
                      fill
                      sizes={'99vw'}
                    />
                    <button
                      type={'button'}
                      className={styles['form-file-images-delete-button']}
                      onClick={deleteImage}
                    ></button>
                  </>
                )
              )}
            </div>
          </div>
        </Form.Fieldset>
      </div>
    </Form>
  )
}
