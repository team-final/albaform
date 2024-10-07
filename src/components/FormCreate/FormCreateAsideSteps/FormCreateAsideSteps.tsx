import { useFormCreateStore } from '@/lib/stores/formCreateStore'
import { STEP_BUTTONS, STEP_INDEX } from '@/lib/types/formTypes'
import classNames from 'classnames'

import styles from './FormCreateAsideSteps.module.scss'

export default function FormCreateAsideSteps() {
  const { step, setStep, inProgress } = useFormCreateStore()
  const handleSteps = (index: STEP_INDEX) => setStep(index)

  return (
    <section className={styles.steps}>
      {STEP_BUTTONS.map(({ index, title }) => {
        const { isProgress } = inProgress
          .filter(({ step }) => step === index)
          .pop() ?? { isProgress: false }

        return (
          <button
            key={`form_button_${index}`}
            className={classNames(styles.button, {
              [styles.active]: step === index,
            })}
            type={'button'}
            onClick={() => handleSteps(index)}
          >
            <p className={styles.title}>
              <i className={styles.index}>{index}</i>
              <span>{title}</span>
            </p>
            {isProgress && <b className={styles.status}>작성중</b>}
          </button>
        )
      })}
    </section>
  )
}
