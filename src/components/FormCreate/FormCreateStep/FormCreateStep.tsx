import { ChildrenProps, STEP_INDEX } from '@/lib/types/types'

import styles from './FormCreateStep.module.scss'

interface FormCreateStepProps extends ChildrenProps {
  step: STEP_INDEX
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
