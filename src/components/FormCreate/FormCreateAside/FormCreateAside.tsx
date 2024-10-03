import Form from '@/components/Form/Form'
import { useFormCreateStore } from '@/lib/stores/formCreateStore'
import { STEP_BUTTONS, STEP_INDEX } from '@/lib/types/types'
import classNames from 'classnames'

import styles from './FormCreateAside.module.scss'

export default function FormCreateAside() {
  const { step, setStep } = useFormCreateStore()
  const handleSteps = (index: STEP_INDEX) => setStep(index)

  return (
    <div className={styles.aside}>
      <section className={styles['aside-steps']}>
        {STEP_BUTTONS.map(({ index, title }) => {
          const cn = 'step-button'
          return (
            <button
              key={`form-${cn}-${index}`}
              className={classNames(styles[cn], {
                [styles.active]: step === index,
              })}
              type={'button'}
              onClick={() => handleSteps(index)}
            >
              <p className={styles[`${cn}-title`]}>
                <i className={styles['number-circle']}>{index}</i>
                <span>{title}</span>
              </p>
              <b className={styles[`${cn}-status`]}>작성중</b>
            </button>
          )
        })}
      </section>

      <section className={styles['aside-actions']}>
        <Form.SubmitButton buttonStyle={'outline'} color={'gray'}>
          임시 저장
        </Form.SubmitButton>

        <Form.SubmitButton>등록하기</Form.SubmitButton>
      </section>
    </div>
  )
}
