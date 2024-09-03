//컴포넌트 immport
import Image from 'next/image';

import PlusForm from '../../../../public/icons/ic-plus.svg';
import styles from './CreateFormButton.module.scss';

//이거 절대경로 바꾸기

/** 함수 타입 지정 */
interface Props {
  size?: 'small' | 'medium';
  onClick?: () => void;
}

/** FloatingButton 컴포넌트 생성
 * 폼 만들기 버튼
 */
const CreateFormButton = ({ size = 'medium', onClick }: Props) => {
  let buttonClass = styles.CreateFormButton;

  if (size === 'small') buttonClass += ` ${styles.small}`;

  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        <Image
          src={PlusForm}
          className={styles.plusformImg}
          alt="폼 만들기"
          width="36"
          height="36"
        />
        <span className={styles.createForm}>폼 만들기</span>
      </button>
    </>
  );
};

export default CreateFormButton;
