import PlusForm from '@/public/icons/ic-plus.svg';
import Image from 'next/image';

import styles from './OvalFloatingButton.module.scss';

interface Props {
  size?: 'small' | 'medium';
  onClick?: () => void;
}

/** 폼 만들기 버튼 */
const OvalFloatingButton = ({ size = 'medium', onClick }: Props) => {
  let buttonClass = styles['oval-floating-button'];

  if (size === 'small') buttonClass += ` ${styles.small}`;

  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        <Image
          src={PlusForm}
          className={styles['plusform-img']}
          alt="폼 만들기"
          width="36"
          height="36"
        />
        <span className={styles['create-form']}>폼 만들기</span>
      </button>
    </>
  );
};

export default OvalFloatingButton;
