import FormCreateAsideActions from '../FormCreateAsideActions/FormCreateAsideActions'
import FormCreateAsideSteps from '../FormCreateAsideSteps/FormCreateAsideSteps'
import styles from './FormCreateAside.module.scss'

export default function FormCreateAside() {
  return (
    <article className={styles.aside}>
      <FormCreateAsideSteps />
      <FormCreateAsideActions />
    </article>
  )
}
