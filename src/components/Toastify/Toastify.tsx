import styles from './Toastify.module.scss'

interface Props {
  icon: string
  alt: string
  count: number
}

const CustomToast = ({ icon, alt = '아이콘', count }: Props) => (
  <div className={styles.toast}>
    <img src={icon} alt={alt} className={styles['toast-icon']} />
    <span>
      현재 <span className={styles['highlight-text']}>{count}명</span>이
      지원했습니다
    </span>
  </div>
)

export default CustomToast
