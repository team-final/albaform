import Form from '@/components/Form/Form'
import { useFormCreateStore } from '@/lib/stores/useFormCreate'

import styles from './FormRecruitmentContent.module.scss'

export default function FormRecruitmentContent() {
  const { formData, setFormData } = useFormCreateStore()

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
        <Form.Field>
          <Form.Input type={'file'} name={'imageUrls'}></Form.Input>
        </Form.Field>
        {/*
         * @todo
         * 첨부 이미지 리스트 컴포넌트 개발
         */}
      </Form.Fieldset>
    </>
  )
}
