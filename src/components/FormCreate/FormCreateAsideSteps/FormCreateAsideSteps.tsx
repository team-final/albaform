import Dropdown from '@/components/Dropdown/Dropdown'
import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { STEP_BUTTONS, StepIndex } from '@/lib/types/formTypes'
import classNames from 'classnames'

import styles from './FormCreateAsideSteps.module.scss'

export default function FormCreateAsideSteps() {
  const { step, setStep, inProgress } = useEditingFormStore()
  const handleSteps = (index: StepIndex) => setStep(index)

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

      <Dropdown sustain>
        <Dropdown.Trigger>
          {STEP_BUTTONS.map(({ index, title }) => {
            const { isProgress } = inProgress
              .filter(({ step }) => step === index)
              .pop() ?? { isProgress: false }

            return (
              <p
                key={`form_button_${index}`}
                className={classNames(styles.button, {
                  [styles.active]: step === index,
                })}
              >
                <p className={styles.title}>
                  <i className={styles.index}>{index}</i>
                  <span>{title}</span>
                </p>
                {isProgress && <b className={styles.status}>작성중</b>}
              </p>
            )
          })}
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {STEP_BUTTONS.map(({ index, title }) => {
            const { isProgress } = inProgress
              .filter(({ step }) => step === index)
              .pop() ?? { isProgress: false }

            return (
              <Dropdown.Item
                key={`form_button_${index}`}
                className={classNames(styles.button, {
                  [styles.active]: step === index,
                })}
                onClick={() => handleSteps(index)}
              >
                <p className={styles.title}>
                  <i className={styles.index}>{index}</i>
                  <span>{title}</span>
                </p>
                {isProgress && <b className={styles.status}>작성중</b>}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </section>
  )
}
