import { useFormCreateStore } from '@/lib/stores/useFormCreate'
import { ChildrenProps } from '@/lib/types/types'

import styles from './FormCreateWrapper.module.scss'

export default function FormCreateWrapper({ children }: ChildrenProps) {
  const { step } = useFormCreateStore()

  return (
    <section className={styles.content} data-step={step}>
      {children}
    </section>
  )
}
