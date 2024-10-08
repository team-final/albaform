import { useEditingFormStore } from '@/lib/stores/editingFormStore'
import { ChildrenProps } from '@/lib/types/types'

import styles from './FormCreateWrapper.module.scss'

export default function FormCreateWrapper({ children }: ChildrenProps) {
  const { step } = useEditingFormStore()

  return (
    <section className={styles.content} data-step={step}>
      {children}
    </section>
  )
}
