//컴포넌트 immport
import Image from 'next/image';

import PlusForm from '../../../../public/icons/ic-plus.svg';
import styles from './CreateFormButton.module.scss';

/** 함수 타입 지정 */
interface Props {
  size?: 'small' | 'medium';
  interaction?: 'default' | 'hovered' | 'clicked';
  onClick?: () => void;
}

/** FloatingButton 컴포넌트 생성
 * 폼 만들기 버튼
 */
const CreateFormButton = ({
  size = 'medium',
  interaction = 'default',
  onClick,
}: Props) => {
  let buttonClass = styles.button;

  if (size === 'small') buttonClass += ` ${styles.small}`;
  if (interaction === 'hovered') buttonClass += ` ${styles.hovered}`;
  if (interaction === 'clicked') buttonClass += `${styles.clicked}`;

  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        <Image src={PlusForm} alt="폼 만들기" width="36" height="36" />
        <span className={styles.createForm}>폼 만들기</span>
      </button>
    </>
  );
};

export default CreateFormButton;
