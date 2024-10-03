'use client'

import Form from '@/components/Form/Form'
import FormCreateAside from '@/components/FormCreate/FormCreateAside/FormCreateAside'
import FormCreateStep from '@/components/FormCreate/FormCreateStep/FormCreateStep'
import FormCreateTitle from '@/components/FormCreate/FormCreateTitle/FormCreateTitle'
import FormCreateWrapper from '@/components/FormCreate/FormCreateWrapper/FormCreateWrapper'
import FormRecruitmentConditions from '@/components/FormCreate/FormRecruitmentConditions/FormRecruitmentConditions'
import FormRecruitmentContent from '@/components/FormCreate/FormRecruitmentContent/FormRecruitmentContent'
import FormWorkingConditions from '@/components/FormCreate/FormWorkingConditions/FormWorkingConditions'
import classNames from 'classnames'

import styles from './page.module.scss'

/**
 * @todo
 * api 요청
 */
// eslint-disable-next-line no-unused-vars
const EXAMPLE_REQ_BODY = {
  /* step 1 */
  title: 'string', // 알바폼 제목
  description: 'string', // 소개글
  recruitmentStartDate: '2024-09-30T20:54:01.317Z', // 모집기간 시작일
  recruitmentEndDate: '2024-09-30T20:54:01.317Z', // 모집기간 종료일
  imageUrls: ['string'], // 이미지 파일
  /* step 2 */
  numberOfPositions: 0, // 모집인원
  gender: 'string', // 성별
  education: 'string', // 학력
  age: 'string', // 연령
  preferred: 'string', // 우대사항
  /* step 3 */
  location: 'string', // 근무 위치
  workStartDate: '2024-09-30T20:54:01.317Z', // 근무기간 시작일
  workEndDate: '2024-09-30T20:54:01.317Z', // 근무기간 종료일
  workStartTime: 'string', // 근무 시간 시작
  workEndTime: 'string', // 근무 시간 종료
  workDays: ['string'], // 근무 요일
  hourlyWage: 0, // 시급
  isPublic: true, // 공개 설정
}

const TEMP_CREATE_FORM = 'temp_create_form'

export default function CreateFormPage() {
  /**
   * @todo 단계 별 작성중 인디케이터 개발
   */
  // const [formDataStep1, setFormDataStep1] = useState(INITIAL_FORM_DATA.STEP_1)
  // const [formDataStep2, setFormDataStep2] = useState(INITIAL_FORM_DATA.STEP_2)
  // const [formDataStep3, setFormDataStep3] = useState(INITIAL_FORM_DATA.STEP_3)
  // const [inProgress, setInProgress] = useState<[STEP_INDEX, boolean][]>([
  //   [1, false],
  //   [2, false],
  //   [3, false],
  // ])

  const handleSubmit = async (data: object, e?: Event | any) => {
    if (e?.nativeEvent.submitter.innerText === '임시 저장') {
      console.log('data: ', data)
      localStorage.setItem(TEMP_CREATE_FORM, JSON.stringify(data))
    }
  }

  // const checkProgress = (name) => {}

  console.log('EXAMPLE_REQ_BODY: ', EXAMPLE_REQ_BODY)

  return (
    <Form
      formId={'createForm'}
      onSubmit={handleSubmit}
      className={classNames(styles.container, 'create-form')}
    >
      <FormCreateAside />

      <div className={styles.content}>
        <FormCreateTitle />

        <FormCreateWrapper>
          <FormCreateStep step={1}>
            <FormRecruitmentContent />
          </FormCreateStep>

          <FormCreateStep step={2}>
            <FormRecruitmentConditions />
          </FormCreateStep>

          <FormCreateStep step={3}>
            <FormWorkingConditions />
          </FormCreateStep>
        </FormCreateWrapper>
      </div>
    </Form>
  )
}
