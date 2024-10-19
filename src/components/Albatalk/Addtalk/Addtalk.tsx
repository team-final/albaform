'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { getAlbatalk, patchAlbatalk, postAlbatalk } from '@/lib/api/albatalk'
import { uploadImage } from '@/lib/api/uploadImageApi'
import {
  ALBATALK_LIST_PATH_NAME,
  ALBATALK_POST_PATH_NAME,
} from '@/lib/data/constants'
import { useAlbatalkStore } from '@/lib/stores/albatalkStore'
import { useUserStore } from '@/lib/stores/userStore'
import { AlbatalkProps, ImageUrl } from '@/lib/types/formTypes'
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

export default function Addtalk({ postId }: { postId?: number }) {
  const user = useUserStore.getState().user
  const router = useRouter()
  if (!user) router.replace(`/${ALBATALK_LIST_PATH_NAME}`)

  const { albatalkData, initialAlbatalkData } = useAlbatalkStore()

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

    const response = await uploadImage(formData)
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
    if (postId) {
      response = await patchAlbatalk(postId, JSON.stringify(data))
    } else {
      response = await postAlbatalk(JSON.stringify(data))
    }
    if (response)
      router.replace(`/${ALBATALK_POST_PATH_NAME}/${response.data.id}`)
  }

  const request = useCallback(async () => {
    if (postId) {
      const response = await getAlbatalk(postId)
      if (!response) return router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
      // console.log('response: ', response)
      initialAlbatalkData(response.data)
    } else {
      initialAlbatalkData(null)
    }
  }, [router, postId, initialAlbatalkData])

  useEffect(() => {
    request()
  }, [request])

  useEffect(() => {
    if (
      albatalkData &&
      user?.id === albatalkData?.writer.id &&
      postId === albatalkData?.id
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
  }, [albatalkData, user, postId])

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
                postId
                  ? `/${ALBATALK_POST_PATH_NAME}/${postId}`
                  : `/${ALBATALK_LIST_PATH_NAME}`,
              )
            }
          >
            취소
          </MainButton>
          <Form.SubmitButton>
            {postId ? '수정하기' : '등록하기'}
          </Form.SubmitButton>
        </div>
      </div>

      <div className={styles.body}>
        <Form.Fieldset>
          <Form.Legend required>제목</Form.Legend>
          <Form.Field>
            <Form.Input
              name={'title'}
              required
              placeholder={'제목을 입력해주세요.'}
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
            />
          </Form.Field>
        </Form.Fieldset>

        <Form.Fieldset>
          <Form.Legend required>내용</Form.Legend>
          <Form.Field>
            <Form.Textarea
              name={'content'}
              required
              placeholder={'내용을 입력해주세요.'}
              value={content}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
