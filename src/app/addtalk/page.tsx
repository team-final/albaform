'use client'

import MainButton from '@/components/Button/MainButton/MainButton'
import Form from '@/components/Form/Form'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { addtalk } from '@/lib/api/albatalk'
import { uploadImage } from '@/lib/api/uploadImageApi'
import { useUserStore } from '@/lib/stores/userStore'
import { AddtalkProps, ImageUrl } from '@/lib/types/formTypes'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import styles from './page.module.scss'

const ROUTE_ALBATALK = '/albatalk'

const INITIAL_IMAGE: ImageUrl = {
  url: '',
  name: '',
}

export default function CreateFormPage() {
  const user = useUserStore.getState().user
  const router = useRouter()
  if (!user?.role) router.replace(ROUTE_ALBATALK)

  const [imageObj, setImageObj] = useState<ImageUrl>(INITIAL_IMAGE)
  const [isImagePending, setIsImagePending] = useState<boolean>(false)

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    setIsImagePending(true)

    const file = files[0]
    const formData = new FormData()
    formData.append('image', file, file.name)

    const response = await uploadImage(formData)
    if (!response) return

    setImageObj({ url: response.data.url, name: file.name })

    setIsImagePending(false)
    event.target.value = ''
  }

  const deleteImage = () => {
    setImageObj(INITIAL_IMAGE)
  }

  const handleSubmit = async (data: AddtalkProps | FieldValues) => {
    if (!data) return
    data.imageUrl = JSON.stringify(imageObj)
    const response = await addtalk(JSON.stringify(data))
    if (response) router.replace(`/albatalks/${response.data.id}`)
  }

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
            onClick={() => router.replace(ROUTE_ALBATALK)}
          >
            취소
          </MainButton>
          <Form.SubmitButton>등록하기</Form.SubmitButton>
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
