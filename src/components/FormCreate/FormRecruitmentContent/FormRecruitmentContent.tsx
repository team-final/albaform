import Form from '@/components/Form/Form'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { postImage } from '@/lib/api/postImage'
import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { FormCreateStepProp, FormStep1 } from '@/lib/types/formTypes'
import Image from 'next/image'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import FormCreateStep from '../FormCreateStep/FormCreateStep'
import styles from './FormRecruitmentContent.module.scss'

const FROM_NAME_LIST: (keyof FormStep1)[] = [
  'title',
  'description',
  'recruitmentStartDate',
  'recruitmentEndDate',
  'imageUrls',
]

export default function FormRecruitmentContent({ step }: FormCreateStepProp) {
  const { formData, setFormData, setInProgress } = useEditingFormStore()
  const [imageList, setImageList] = useState<{ url: string; name: string }[]>(
    [],
  )
  const [isImagePending, setIsImagePending] = useState<boolean>(false)

  const deleteImage = (url: string) => {
    setFormData(
      'imageUrls',
      imageList.filter((item) => item.url !== url),
    )
  }

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

    setFormData('imageUrls', [
      ...imageList,
      { url: response.data.url, name: fileName },
    ])

    setIsImagePending(false)
    event.target.value = ''
  }

  const handleChangeImageList = useCallback(() => {
    setImageList(formData.imageUrls)
  }, [formData.imageUrls])

  useEffect(() => {
    handleChangeImageList()
  }, [handleChangeImageList])

  const handleProgress = useCallback(() => {
    const isProgress = FROM_NAME_LIST.some((key) =>
      key === 'imageUrls' ? formData[key].length > 0 : Boolean(formData[key]),
    )
    setInProgress({ step, isProgress })
    if (isProgress) return
    if (imageList.length > 0) setImageList([])
  }, [formData, imageList, step, setInProgress])

  useEffect(() => {
    handleProgress()
  }, [handleProgress])

  return (
    <FormCreateStep step={step}>
      <Form.Fieldset>
        <Form.Legend requiredIndicator>알바폼 제목</Form.Legend>
        <Form.Field>
          <Form.Wrapper>
            <Form.Input
              formRequired
              name={'title'}
              placeholder={'제목을 입력해주세요.'}
              value={formData.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData('title', event.target.value)
              }
            ></Form.Input>
          </Form.Wrapper>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>소개글</Form.Legend>
        <Form.Field>
          <Form.Wrapper>
            <Form.Textarea
              name={'description'}
              placeholder={'최대 200자까지 입력 가능합니다.'}
              value={formData.description}
              maxLength={200}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                event.target.value.length <= 200 &&
                setFormData('description', event.target.value)
              }
            ></Form.Textarea>
          </Form.Wrapper>
        </Form.Field>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend requiredIndicator>모집 기간</Form.Legend>
        <Form.Field>
          <Form.DateRange
            required
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
    </FormCreateStep>
  )
}
