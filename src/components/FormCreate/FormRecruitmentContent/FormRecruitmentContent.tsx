import Form from '@/components/Form/Form'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { uploadImage } from '@/lib/api/uploadImageApi'
import { useFormCreateStore } from '@/lib/stores/formCreateStore'
import Image from 'next/image'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import styles from './FormRecruitmentContent.module.scss'

export default function FormRecruitmentContent() {
  const { formData, setFormData } = useFormCreateStore()
  const [imageList, setImageList] = useState<{ url: string; name: string }[]>(
    [],
  )
  const [isImagePending, setIsImagePending] = useState<boolean>(false)

  const deleteImage = (url: string) => {
    setImageList((prev) => prev.filter((item) => item.url !== url))
  }

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    setIsImagePending(true)

    const file = files[0]
    const formData = new FormData()
    formData.append('image', file, file.name)

    const response = await uploadImage(formData)
    if (!response) return

    setImageList((prev) => [
      ...prev,
      { url: response.data.url, name: file.name },
    ])
    setIsImagePending(false)
    event.target.value = ''
  }

  const handleChangeImageList = useCallback(
    (imageList: { url: string; name: string }[]) => {
      setFormData('imageUrls', imageList)
    },
    [setFormData],
  )

  useEffect(() => {
    handleChangeImageList(imageList)
  }, [handleChangeImageList, imageList])

  return (
    <>
      <Form.Fieldset>
        <Form.Legend>
          알바폼 제목<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.Wrap>
            <Form.Input
              type={'text'}
              name={'title'}
              placeholder={'제목을 입력해주세요.'}
              value={formData.title}
              onChange={(event) => setFormData('title', event.target.value)}
              required
            ></Form.Input>
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          소개글<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.Wrap>
            <Form.Textarea
              type={'textarea'}
              name={'description'}
              placeholder={'최대 200자까지 입력 가능합니다.'}
              value={formData.description}
              onChange={(event) =>
                setFormData('description', event.target.value)
              }
              required
            ></Form.Textarea>
          </Form.Wrap>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>
          모집 기간<span className={'required'}>*</span>
        </Form.Legend>
        <Form.Field>
          <Form.DateRangePickerInput
            startDate={'recruitmentStartDate'}
            endDate={'recruitmentEndDate'}
          />
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset className={styles['form-file-images']}>
        <Form.Legend>이미지 첨부</Form.Legend>
        <div className={styles['form-file-images-wrap']}>
          <Form.Field>
            <Form.Input
              type={'file'}
              name={'imageUrls'}
              onChange={handleUploadImage}
            />
          </Form.Field>
          {imageList &&
            imageList.map(({ url, name }, index) => {
              return (
                <div
                  key={`upload_images_${index}`}
                  className={styles['form-file-images-item']}
                >
                  <>
                    <Image src={url} alt={name} fill sizes={'99vw'} />
                    <button
                      type={'button'}
                      className={styles['form-file-images-delete-button']}
                      onClick={() => {
                        deleteImage(url)
                      }}
                    ></button>
                  </>
                </div>
              )
            })}
          {isImagePending && (
            <div className={styles['form-file-images-item']}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </Form.Fieldset>
    </>
  )
}
