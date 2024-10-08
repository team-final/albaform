import { StepIndex } from '@/lib/types/formTypes'
import { ChildrenProps } from '@/lib/types/types'

import styles from './FormCreateStep.module.scss'

interface FormCreateStepProps extends ChildrenProps {
  step: StepIndex
}

export default function FormCreateStep({
  children,
  step,
}: FormCreateStepProps) {
  return (
    <div className={styles.step} data-step-item={step}>
      {children}
    </div>
  )
}
